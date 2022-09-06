const testBlogs = require("../utils/exampleBloglist").blogs;
const testUsers = require("../utils/exampleBloglist").testUsers;
const loggedUser = require("../utils/exampleBloglist").loggedUser;
const Blog = require("../models/blog");
const User = require("../models/user");

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  testBlogs,
  testUsers,
  loggedUser,
  blogsInDb,
  usersInDb
};
