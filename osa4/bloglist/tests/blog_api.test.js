const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.testBlogs);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.testBlogs.length);
});

test("returned blogs have a key called 'id'", async () => {
  const response = await api.get("/api/blogs");
  const contents = response.body.every((blog) => blog.id);
  expect(contents).toBeTruthy();
});

test("a valid blog can be added ", async () => {
  const newBlog = {
    title: "valid blog",
    author: "miko",
    url: "www.fddfdf.com",
    likes: 1000000,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.testBlogs.length + 1);

  const contents = blogsAtEnd.map((n) => n.title);
  expect(contents).toContain("valid blog");
});

test("likes are never undefined, if value not given, its 0 ", async () => {
  const newBlog = {
    title: "zero likes",
    author: "mikoppi",
    url: "www.fddffsdfdf.com",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();

  const addedBlog = blogsAtEnd.find((n) => n.title === "zero likes");
  expect(addedBlog.likes).toBe(0);
});

test("empty field not allowed on title", async () => {
  const newBlog = {
    author: "mikoppi",
    url: "www.fsfdfsf.com",
    likes: 4,
  };
  await api.post("/api/blogs").send(newBlog).expect(400);
  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.testBlogs.length);
}, 10000);

test("empty field not allowed on url", async () => {
  const newBlog = {
    author: "mikoppi",
    title: "hello",
    likes: 4,
  };
  await api.post("/api/blogs").send(newBlog).expect(400);
  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.testBlogs.length);
}, 10000);

test("empty fields not allowed on url and title at the same time", async () => {
  const newBlog = {
    author: "mikoppi",
    likes: 4,
  };
  await api.post("/api/blogs").send(newBlog).expect(400);
  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.testBlogs.length);
}, 10000);

test("succeeds with status code 204 if id is valid", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.testBlogs.length - 1);

  const contents = blogsAtEnd.map((r) => r.title);

  expect(contents).not.toContain(blogToDelete.content);
});

test("updated blog contains the updated likes", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = blogsAtStart[0];

  const newBlog = {
    likes: 500,
  }

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog).expect(200);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.testBlogs.length);
  const contents = blogsAtEnd.map((r) => r.likes);

  expect(contents).toContain(newBlog.likes);
})

afterAll(() => {
  mongoose.connection.close();
});

//npm test -- tests/blog_api.test.js
