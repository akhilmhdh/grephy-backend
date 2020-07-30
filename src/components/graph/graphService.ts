import GraphDAL from './graphDAL';

const createGraph = async (_user, _channel, value, next) => {
    try {
        const graph = await GraphDAL.createGraph({ _user, _channel, ...value });
        return graph;
    } catch (error) {
        next(error);
    }
    return null;
};

export default {
    createGraph
};
