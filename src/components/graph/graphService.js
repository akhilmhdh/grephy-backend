import GraphDAL from "./graphDAL";

const createGraph = async (_user, _channel, value) => {
  const graph = await GraphDAL.createGraph({ _user, _channel, ...value });
  return graph;
};

export default {
  createGraph,
};
