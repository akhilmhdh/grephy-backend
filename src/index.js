import express from "express";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";

import "./config/config";

import user from "./components/user";

const app = express();

// middlewares
app.use(
  cookieSession({
    maxAge: 15 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_ENCRYPT_KEY1, process.env.COOKIE_ENCRYPT_KEY2],
  })
);

app.use(bodyParser.urlencoded({ extended: false }));

// express routes

app.use("/users", user);

app.get("/", (req, res) => {
  res.send("hello world");
});

export default app;
