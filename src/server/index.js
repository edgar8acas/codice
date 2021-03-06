import path from "path";
import fs from "fs";
import router from "./controllers";
import initializeServer from "./initializeServer";
require("dotenv").config();
/**
 * Create the directory necessary to communicate with the R process through file reading and writing
 */
(function createIoProcessingDirectory() {
  const dir = path.join(__dirname, "processing", "r", "io");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
})();

const app = initializeServer(router);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening from port ${PORT}`));
