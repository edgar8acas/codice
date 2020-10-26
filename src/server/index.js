import path from "path";
import fs from "fs";
import router from "./controllers";
import initializeServer from "./initializeServer";

/**
 * Create the directory necessary to communicate with the R process through file reading and writing
 */
(function createIoProcessingDirectory() {
  const dir = path.join(__dirname, "processing", "r", "io");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
})();

const app = initializeServer(router);
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 5000;
app.listen(PORT, HOST, () => console.log(`Listening on ${HOST}:${PORT}`));
