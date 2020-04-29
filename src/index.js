import express from 'express';
import './config/config';

const app = express();

app.get('/', (req, res) => {
  res.send('hello world');
});
app.listen(process.env.PORT, () => {
  console.log(`Running on Localhost:${process.env.PORT}`);
});
