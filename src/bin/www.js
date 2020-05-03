/* eslint-disable no-console */
// this file handles all aspects of networking
import { createServer } from "http";

import app from "../index";
import db from "../db";

const normalizePort = (val) => {
  const port = parseInt(val, 10);
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT);
app.set("port", port);

const server = createServer(app);

// for mongo connection pool
db.connect(process.env.MONGO_DB_URL, (err) => {
  if (err) {
    console.log(err);
    process.exit(0);
  } else {
    server.listen(port, () => {
      console.log(`Localhost:${port} running`);
    });
  }
});
