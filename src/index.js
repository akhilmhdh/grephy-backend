import express from "express";
import cookieSession from "cookie-session";

import "./config/config";

import googleAuth from "./auth/google";
import githubAuth from "./auth/github";

const app = express();

app.use(
  cookieSession({
    maxAge: 15 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_ENCRYPT_KEY1, process.env.COOKIE_ENCRYPT_KEY2],
  })
);

googleAuth(app);
githubAuth(app);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on Localhost:${process.env.PORT}`);
});
