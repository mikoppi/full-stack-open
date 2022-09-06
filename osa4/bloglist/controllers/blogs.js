const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const middleware = require("../utils/middleware")

//get all blogs
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

//post one blog
blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const user = request.user;
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: user._id,
  });

  if (request.body.title && request.body.url) {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
  } else {
    response.status(400).json(request.body);
  }
});

//delete one blog
blogsRouter.delete("/:id", middleware.userExtractor, async (request, response) => {
  const user = request.user;
  const id = request.params.id;
  const blog = await Blog.findById(id);
  if (blog.user.toString() === user.id.toString()) {
    await blog.deleteOne();
    response.status(204).end();
  } else {
    response.status(401).json({ error: "Not authorised to delete" });
  }
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

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.status(200).json(updatedBlog);
});

module.exports = blogsRouter;
