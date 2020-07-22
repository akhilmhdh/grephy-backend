import express, { Request, Response, NextFunction } from "express";
import cookieSession from "cookie-session";
import dotenv from "dotenv";
import { handleError, ErrorHandler } from "./components/utils/error";

dotenv.config();

import user from "./components/user";
// import channel from "./components/channel";
// import graph from "./components/graph";

const app = express();

// middlewares
// to set the cookie-session
app.use(
  cookieSession({
    name: "session",
    maxAge: 15 * 24 * 60 * 60 * 1000,
    keys: ["key1", "key2"],
  })
);

// bodyparser middleware to parse json and url codes
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// express routes
app.use("/users", user);
// app.use("/channels", channel);
// app.use("/channels/graph", graph);

app.get("/", (req, res) => {
  res.send(req.session.user);
});

app.use(
  (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    handleError(err, res);
    next();
  }
);

export default app;
