const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { BlogPosts } = require('./models');

BlogPosts.create('Call Me Ishmael', 'A Guide to Moby Dick', 'Herman Melville', '1851');

//Return all blog post items

router.get('/', (req, res) => {
  res.json(BlogPosts.get());
});

// Create a new Blog Post and validate it

router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author']
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
  res.status(201).json(item);
});

// Delete a Blog Post item

router.delete('/:id', (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted shopping list item \`${req.params.ID}\``);
  res.status(204).end();
});

// Update a Blog Post item

router.put('/:id', jsonParser, (req, res) => {
  // const requiredFields = ['title']
  // for (let i = 0; i < requiredFields.length; i++) {
  //   const field = requiredFields[i];
  //   if (!(field in req.body)) {
  //     const message = `Missing \`${field}\` in request body`
  //     console.error(message);
  //     return res.status(400).send(message);
  //   }
  // }
  if (req.params.id !== req.body.id) {
    const message = `Request path id (${req.params.id}) and request body id(${req.body.id}) must match`
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating shopping list item ${req.params.id}`);
  const updatedItem = BlogPosts.update(req.body);
  res.status(204).json(updatedItem);
})

module.exports = router;