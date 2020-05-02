import { createServer } from "http";

import app from "../index";

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

server.listen(port, () => {
  console.log(`Localhost:${port} running`);
});
