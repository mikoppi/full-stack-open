const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

//get all blogs
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

//post one blog
blogsRouter.post("/", async (request, response) => {
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
  });

  if (request.body.title && request.body.url) {
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } else {
    response.status(400).json(request.body);
  }
});

module.exports = blogsRouter;
