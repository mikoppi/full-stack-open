const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

//add one user
usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (username.length < 3 || password.length < 3) {
    return response.status(400).json({
      error: "username or password too short, must be over 3 characters",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const users = await User.find({});
  if (users.some((user) => user.username === username)) {
    return response.status(400).json({
      error: "username must be unique",
    });
  } else {
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  }
});

//get all users
usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", { url: 1, title: 1, author: 1 });
  response.json(users);
});

module.exports = usersRouter;
