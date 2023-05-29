import http from "http";
import createHttpError from "http-errors";
import express, { Express, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import router from "./routers/index";

const app: Express = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "origin, X-Requested-With,Content-Type,Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
    res.setHeader("Content-Type", "application/json");
    return res.status(200).json({});
  }
  next();
});

app.use("/", router);
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404));
});
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(error?.message == "Not Found" ? 404 : 500);
  return res.json({ error: error?.message });
});

const server = http.createServer(app);
const PORT: any = process.env.PORT ?? 5000;
server.listen(PORT, () =>
  console.log("The server is listening on port:", PORT)
);
