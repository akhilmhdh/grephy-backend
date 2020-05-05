const createChannel = (req, res, next) => {
  res.send("Yo");
  next();
};

export default {
  createChannel,
};
