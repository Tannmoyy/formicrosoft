// Create web server

// Import modules
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Setup view engine
app.set('view engine', 'ejs');

// Setup static files
app.use(express.static(path.join(__dirname, 'public')));

// Setup body parser
app.use(bodyParser.urlencoded({ extended: false }));

// Setup routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/comments', (req, res) => {
  const comments = JSON.parse(fs.readFileSync('./data/comments.json', 'utf-8'));
  res.render('comments', { comments });
});

app.post('/comments', (req, res) => {
  const comments = JSON.parse(fs.readFileSync('./data/comments.json', 'utf-8'));
  const newComment = {
    id: uuidv4(),
    ...req.body,
  };
  comments.push(newComment);
  fs.writeFileSync('./data/comments.json', JSON.stringify(comments));
  res.redirect('/comments');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});