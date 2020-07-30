import express, { Request, Response, NextFunction } from 'express';
import cookieSession from 'cookie-session';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { handleError, ErrorHandler } from './components/utils/error';
import { stream, logger } from './config/logger';

dotenv.config();

import user from './components/user';
// import channel from "./components/channel";
// import graph from "./components/graph";

const app = express();

// middlewares
// to set the cookie-session
app.use(
    cookieSession({
        name: 'session',
        maxAge: 15 * 24 * 60 * 60 * 1000,
        keys: ['key1', 'key2']
    })
);

//morgan logging middleware
app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms', {
        stream
    })
);

// bodyparser middleware to parse json and url codes
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// express routes
app.use('/users', user);
// app.use("/channels", channel);
// app.use("/channels/graph", graph);

app.get('/', (req, res) => {
    logger.info('Checking');
    res.send('CHwecking');
});

app.use(
    (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
        handleError(err, res);
        next();
    }
);

export default app;
