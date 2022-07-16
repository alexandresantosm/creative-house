import express from 'express';
import path, { dirname } from 'path';

const PORT_SERVER = 3000;

const server = express();

server.use(express.static("public"));

const indexUrl = path.resolve(dirname('./'), 'views', 'index.html');
const ideasUrl = path.resolve(dirname('./'), 'views', 'ideas.html');

server.get("/", (req, res) => {
  return res.sendFile(indexUrl);
});

server.get("/ideas", (req, res) => {
  return res.sendFile(ideasUrl);
});

server.listen(PORT_SERVER, () => {
  console.log(`Server is running in http://localhost:${PORT_SERVER}/`)
});