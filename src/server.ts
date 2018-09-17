import express from 'express';

const app = express();

app.get('/test', (req, res) => {
  res.send('Hello Express from typescript and bable 7')
})

app.listen(5000, (err: any) => {
  if (err) {
    console.log('error starting server', err);
    return;
  }
  console.log('Server is running on port: 5000');
})