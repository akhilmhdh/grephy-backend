import graphValidator from './graphValidator';
import graphService from './graphService';
import { RequestHandler } from 'express';
import JWT from '../utils/jwt';

const createGraph: RequestHandler = async (req, res, next) => {
    // parse token and validator
    const { userID } = JWT.JWTDecode(req.session.user);
    const { createGraphSchema } = graphValidator;

    try {
        const { _channel, name, description, title, xAxis, yAxis } = req.body;

        const { error, value } = createGraphSchema.validate({
            name,
            description,
            title,
            xAxis,
            yAxis
        });

        if (error) next({ stateCode: 417, message: 'validation failed' });

        const graph = await graphService.createGraph(userID, _channel, value);

        res.send(graph).status(200);
    } catch (error) {
        res.send(error).status(500);
    }
};

const readGraph: RequestHandler = (req, res, next) => {
    res.send('Yo');
    next();
};

const updateGraph: RequestHandler = (req, res, next) => {
    res.send('Yo');
    next();
};

const deleteGraph: RequestHandler = (req, res, next) => {
    res.send('Yo');
    next();
};

export default {
    createGraph,
    readGraph,
    updateGraph,
    deleteGraph
};
