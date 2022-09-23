// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => sum + item.likes, 0);
};

const favoriteBlog = (blogs) => {
  //only sort the copy of the array
  return [...blogs].sort((a, b) => b.likes - a.likes)[0];
};

const mostBlogs = (blogs) => {
  const counts = {};
  blogs.map((blog) => {
    if (counts[blog.author]) {
      counts[blog.author] += 1;
    } else {
      counts[blog.author] = 1;
    }
  });
  let arr = Object.values(counts);
  let mostBlogsAmount = Math.max(...arr);
  let mostBlogsAuthor = Object.keys(counts).find(
    (key) => counts[key] === mostBlogsAmount
  );
  return blogs.length === 0
    ? undefined
    : {
      author: mostBlogsAuthor,
      blogs: mostBlogsAmount,
    };
};

const mostLikes = (blogs) => {
  const counts = {};
  blogs.map((blog) => {
    if (counts[blog.author]) {
      counts[blog.author] += blog.likes;
    } else {
      counts[blog.author] = blog.likes;
    }
  });
  let arr = Object.values(counts);
  let mostLikesAmount = Math.max(...arr);
  let mostLikesAuthor = Object.keys(counts).find(
    (key) => counts[key] === mostLikesAmount
  );
  return blogs.length === 0
    ? undefined
    : {
      author: mostLikesAuthor,
      likes: mostLikesAmount,
    };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
