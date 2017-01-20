const express = require('express';
const app = express();

const blogPostsRouter = require('/blogPostsRouter');

app.use('/blogPostsRouter.js', blogPostsRouter);

