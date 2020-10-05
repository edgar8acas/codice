import { promises as fs} from 'fs';
import path from 'path';
import { spawn } from 'child_process';

async function spawnGoffman() {
  return new Promise(
    (resolve, reject) => {
      let command = path.join(__dirname, 'r', 'goffman')
      const dir = path.join(__dirname, 'r');

      if(process.platform === 'win32') {
        command = 'Rscript.exe ' + command;
      }
      
      const child = spawn(command, { 
        cwd: dir,
        shell: true
      });

      child.on('exit', (code, signal) => {
        console.log('\x1b[36m%s\x1b[0m', `R exited with code ${code} and signal ${signal}`);
        resolve(code);
      });
      
      child.stdout.on('data', (data) => {
        //Cyan output
        console.log('\x1b[36m%s\x1b[0m', `${data}`);
      });
      
      child.stderr.on('data', (err) => {
        console.log('\x1b[31m%s\x1b[0m',`R: ${err}`);
        reject(err.toString());
      });
    }
  )
}

async function readOutput() {
  const path = __dirname + '/r/io/output.json';
  return fs
    .readFile(path)
    .then(data => {
      return data
    })
    .catch(err => {
      return err
    })
}

export async function processTexts(texts) {
  const inputData = texts.map(text => {
    return { doc_id: 'id' + text.textId, text: text.rawContent }
  });

  const inputName = __dirname + '/r/io/input.json';
  
  try {
    //TODO: make filename unique
    await fs.writeFile(inputName, JSON.stringify(inputData));
    await spawnGoffman();
    const output = await readOutput();
    const parsedOutput = JSON.parse(output.toString());
    const essentialWords = Object
                            .entries(parsedOutput)
                            .sort((a, b) => a[0].localeCompare(b[0]))
                            .map(entry => {
                              return { textId: Number(entry[0].substring(2)), essentialWords: entry[1] }
                            });
    return essentialWords;
  } catch (err) {
    console.log(err)
    return err;
  } finally {
    //TODO: Delete file, left for debug
    //await fs.unlink(inputName);
  }
}