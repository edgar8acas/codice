import { promises as fs} from 'fs';
import { spawn } from 'child_process';

async function spawnGoffman() {
  return new Promise(
    (resolve, reject) => {
      const script = __dirname + '/r/goffman';
      const dir = __dirname + '/r';
      const child = spawn(script, { 
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
        console.error('\x1b[31m%s\x1b[0m',`R: ${err}`);
        reject(err.toString());
      });
    }
  )
}

export async function processTexts(texts) {
  const inputData = texts.map(text => {
    return { doc_id: text.textId, text: text.rawContent }
  });

  const inputName = __dirname + '/r/io/input.json';
  
  try {
    //TODO: make filename unique
    await fs.writeFile(inputName, JSON.stringify(inputData));
    //TODO: implement file processing
    //const output = await spawnGoffman();
    return tempMocking;
  } catch (err) {
    return err;
  } finally {
    //delete file
    await fs.unlink(inputName);
  }
}

const tempMocking = [
  {
    textId: "575",
    words: ["colegios", "escuela", "establecimiento", "educación"],
    lecturability: null
  },
  {
    textId: "576",
    words: ["cine", "largo", "tiempo", "humano"],
    lecturability: null
  },
  {
    textId: "577",
    words: ["bancos", "institución", "financiera", "encarga"],
    lecturability: null
  },
]