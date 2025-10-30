const express = require('express');
const app = express();
const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello from Banking server!');
});

app.get('/', (req, res) => {
  res.send('Hello from Banking server!');
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

