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

//delete one blog
blogsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  await Blog.findByIdAndRemove(id);
  response.status(204).end();
});

//update one blog
blogsRouter.put("/:id", async (request, response) => {
  const { title, author, url, likes } = request.body;

  const blog = {
    title: title,
    author: author,
    url: url,
    likes: likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).json(updatedBlog)

});

module.exports = blogsRouter;
