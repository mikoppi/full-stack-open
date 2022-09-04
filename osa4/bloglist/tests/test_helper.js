const testBlogs = require("../utils/exampleBloglist");
const Blog = require("../models/blog");
const blog = require("../models/blog");

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  testBlogs,
  blogsInDb,
};
