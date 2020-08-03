import DB from '../../db';
import { response, createGraph } from './graph.interface';

const createGraph = async (databaseValue: createGraph): Promise<response> => {
    const collection = DB.client.db('Grephy').collection('graphs');

    const existingGraph = await collection.findOne(databaseValue);
    if (existingGraph) return { err: 'Graph already exisitng', value: null };

    // add channel to the collection
    const Graph = await collection.insertOne(databaseValue);
    return { err: null, value: Graph };
};

export default {
    createGraph
};
