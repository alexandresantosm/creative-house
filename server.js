import express from 'express';

const PORT_SERVER = 3000;

const server = express();

server.get("/", (req, res) => {
  return res.send('<h1>Hello World!</h1>')
});

server.listen(PORT_SERVER, () => {
  console.log(`Server is running in http://localhost:${PORT_SERVER}/`)
});