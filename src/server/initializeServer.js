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
    credentials: true,
    origin: isProduction ? "https://codice.edgarochoa.dev" : "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  };

  if (isProduction) {
    app.set("trust proxy", 1);
  }
  app.use(morgan("tiny"));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(cors(origin));
  app.use(history());

  app.use("/api", router);
  app.use(express.static(path.join(__dirname, "../../dist/")));

  return app;
}
