// this file handles all aspects of networking
import { createServer } from 'http';

import { logger } from '../config/logger';
import app from '../index';
import mongo from '../db';

const normalizePort = (val: string) => {
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
app.set('port', port);

const server = createServer(app);

// for mongo connection pool
mongo.connect(process.env.MONGO_DB_URL, (err) => {
    if (err) {
        logger.error(err);
        process.exit(0);
    } else {
        server.listen(port, () => {
            logger.info(`Localhost:${port} running`);
        });
    }
});
