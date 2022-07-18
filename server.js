import express from 'express';
import nunjucks from 'nunjucks';
import { database } from './database/config/index.js';

const PORT_SERVER = 3000;

const server = express();

server.use(express.static("public"));

server.use(express.urlencoded({ extended: true }));

nunjucks.configure('views', {
  express: server,
  noCache: true,
});

const ideasOrderByLast = (ideas) => [...ideas]
  .reverse();

server.get("/", (req, res) => {
  const querySelectAllIdeas = `SELECT * FROM ideas`;
  
  database.all(querySelectAllIdeas, (err, rows) => {
    let ideas = [];

    if (err) {
      console.log(err);

      return res.render('error.html');
    }

    rows.forEach((row) => {
      let idea = {
        id: row.id,
        imageUrl: row.image_url,
        imageDescription: row.image_description,
        title: row.title,
        category: row.category,
        description: row.description,
        ideaUrl: row.idea_url
      }

      ideas = [...ideas, idea];
    });
    
    const lastIdeas = ideasOrderByLast(ideas).slice(0, 3);
  
    return res.render('index.html', { ideas: lastIdeas });
  });
});

server.get("/ideas", (req, res) => {
  const querySelectAllIdeas = `SELECT * FROM ideas`;
  
  database.all(querySelectAllIdeas, (err, rows) => {
    let ideas = [];

    if (err) {
      console.log(err);

      return res.render('error.html');
    }

    rows.forEach((row) => {
      let idea = {
        id: row.id,
        imageUrl: row.image_url,
        imageDescription: row.image_description,
        title: row.title,
        category: row.category,
        description: row.description,
        ideaUrl: row.idea_url
      }

      ideas = [...ideas, idea];
    });
    
    const allIdeas = ideasOrderByLast(ideas);
  
    return res.render('ideas.html', { ideas: allIdeas });
  });
});

server.post('/', (req, res) => {
  const {
    title,
    category,
    "image-url": imageUrl,
    description,
    "idea-url": ideaUrl,
  } = req.body;

  const imageDescription = `Imagem de ${title}`;

  const queryCreateNewIdea = `
    INSERT INTO ideas (
      image_url,
      image_description,
      title,
      category,
      description,
      idea_url
    )
    VALUES (
      ?, ?, ?, ?, ?, ? 
    );
  `;

  const newIdea = [
    imageUrl,
    imageDescription,
    title,
    category,
    description,
    ideaUrl
  ];
  
  database.run(
    queryCreateNewIdea,
    newIdea,
    (err) => {
      if (err) {
        console.log(err);
  
        return res.render('error.html');
      }

      return res.redirect('/ideas');
    }
  );
});

server.listen(PORT_SERVER, () => {
  console.log(`Server is running in http://localhost:${PORT_SERVER}/`)
});