import express from 'express';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('<h1>Hello Full Stack!</h1>');
});

app.listen(3001, () => {
  console.log('Server running');
});
