import express from "express";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";

import "./config/config";

import user from "./components/user";

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

app.use(bodyParser.urlencoded({ extended: false }));

// express routes
app.use("/users", user);

app.get("/", (req, res) => {
  res.send("Welcome Boy");
});

export default app;
