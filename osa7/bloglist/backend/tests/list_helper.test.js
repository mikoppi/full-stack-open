const listHelper = require("../utils/list_helper");
const blogs = require("../utils/exampleBloglist");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});


describe("total likes", () => {
  test("sum of all blogs", () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(36);
  });

  test("empty list", () => {
    const blogs = [];
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(0);
  });

  test("list with one item returns the like amount of that item", () => {
    const firstBlog = [blogs[0]];
    const result = listHelper.totalLikes(firstBlog);
    expect(result).toBe(7);
  });
});


describe("most liked blog", () => {
  test("find the blog with most likes of all blogs", () => {
    const result = listHelper.favoriteBlog(blogs);
    const mostLikedBlog = {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    };
    expect(result).toEqual(mostLikedBlog);
  });

  test("empty list", () => {
    const blogs = [];
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual(undefined);
  });

  test("list with one item returns that item", () => {
    const firstBlog = [blogs[0]];
    const result = listHelper.favoriteBlog(firstBlog);
    expect(result).toEqual(blogs[0]);
  });
});


describe("most blogs", () => {
  test("find the author with most blogs of all blogs", () => {
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });

  test("empty list", () => {
    const blogs = [];
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual(undefined);
  });

  test("list with one item returns information about that item", () => {
    const firstBlog = [blogs[0]];
    const result = listHelper.mostBlogs(firstBlog);
    expect(result).toEqual({
      author: "Michael Chan",
      blogs: 1,
    });
  });
});


describe("most liked author with all likes combined", () => {
  test("find the author with most likes of all blogs", () => {
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });

  test("empty list", () => {
    const blogs = [];
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual(undefined);
  });

  test("list with one item returns likes of that item", () => {
    const firstBlog = [blogs[0]];
    const result = listHelper.mostLikes(firstBlog);
    expect(result).toEqual({
      author: "Michael Chan",
      likes: 7,
    });
  });
});
