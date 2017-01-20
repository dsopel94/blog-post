const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

BlogPosts.create('Call Me Ishmael', 'A Guide to Moby Dick', 'Herman Melville', '1851');

router.get('/', (req,res) => {
	res.json(BlogPosts.get());
});

router.post('/', (req,res) => {
	const requiredFields = ['title', 'content', 'author', 'publishDate']
	for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = ShoppingList.create(req.body.name, req.body.checked);
  res.status(201).json(item);
});
})


