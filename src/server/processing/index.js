import { promises as fs } from "fs";
import path from "path";
import { spawn } from "child_process";

async function spawnGoffman(inFile, outFile) {
  return new Promise((resolve, reject) => {
    let command = path.join(__dirname, "r", "goffman");
    const dir = path.join(__dirname, "r");

    if (process.platform === "win32") {
      command = "Rscript.exe " + command;
    }

    const child = spawn(command, [inFile, outFile], {
      cwd: dir,
      shell: true,
    });

    child.on("exit", (code, signal) => {
      console.log(
        "\x1b[36m%s\x1b[0m",
        `R exited with code ${code} and signal ${signal}`
      );
      resolve(code);
    });

    child.stdout.on("data", (data) => {
      //Cyan output
      console.log("\x1b[36m%s\x1b[0m", `${data}`);
    });

    child.stderr.on("data", (err) => {
      console.log("\x1b[31m%s\x1b[0m", `R: ${err}`);
      reject(err.toString());
    });
  });
}

async function readOutput(outFile) {
  return fs.readFile(outFile);
}

function getFilePaths({ userId }) {
  if (!userId) throw Error("A user id is required to process texts");

  const timestamp = new Date().valueOf();
  return {
    inFile: path.join(__dirname, "r", "io", `${userId}-in-${timestamp}.json`),
    outFile: path.join(__dirname, "r", "io", `${userId}-out-${timestamp}.json`),
  };
}

export async function processTexts(texts, user) {
  const inputData = texts.map((text) => {
    return { doc_id: "id" + text.textId, text: text.rawContent };
  });

  const { inFile, outFile } = getFilePaths(user);
  try {
    await fs.writeFile(inFile, JSON.stringify(inputData));
    await spawnGoffman(inFile, outFile);
    const output = await readOutput(outFile);
    const parsedOutput = JSON.parse(output.toString());
    const essentialWords = Object.entries(parsedOutput)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map((entry) => {
        return {
          textId: Number(entry[0].substring(2)),
          essentialWords: entry[1],
        };
      });
    return essentialWords;
  } catch (err) {
    console.log(err);
    return err;
  } finally {
    await fs.unlink(inFile);
    await fs.unlink(outFile);
  }
}
