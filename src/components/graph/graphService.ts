import GraphDAL from './graphDAL';

import { ErrorHandler } from '../utils/error';
import { createGraph } from './graph.interface';
const createGraph = async ({
    _user,
    _channel,
    data
}: createGraph): Promise<response> => {
    const { err, value } = await GraphDAL.createGraph({
        _user,
        _channel,
        ...data
    });

    if (err) throw new ErrorHandler(417, err);
    return value.ops[0];
};

export default {
    createGraph
};
