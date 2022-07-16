import express from 'express';
import nunjucks from 'nunjucks';
import { ideas } from './mocks/ideas-mock.js';

const PORT_SERVER = 3000;

const server = express();

server.use(express.static("public"));

nunjucks.configure('views', {
  express: server,
  noCache: true,
});

const ideasOrderByLast = [...ideas]
  .reverse();

server.get("/", (req, res) => {
  const lastIdeas = ideasOrderByLast.slice(0, 3);

  return res.render('index.html', { ideas: lastIdeas });
});

server.get("/ideas", (req, res) => {
  return res.render('ideas.html', { ideas: ideasOrderByLast });
});

server.listen(PORT_SERVER, () => {
  console.log(`Server is running in http://localhost:${PORT_SERVER}/`)
});