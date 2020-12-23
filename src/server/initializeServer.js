import path from "path";
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import history from "connect-history-api-fallback";

export default function initializeServer(router) {
  const app = express();
  const isProduction = process.env.NODE_ENV === "production";
  const origin = {
    origin: isProduction ? "https://codice.edgarochoa.dev" : "*",
  };

  app.use(morgan("tiny"));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(cors(origin));
  app.use(history());

  app.use("/api", router);
  app.use(express.static(path.join(__dirname, "../../dist/")));

  return app;
}
