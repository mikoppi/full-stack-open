const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const helper = require("./test_helper");
const bcrypt = require("bcrypt");

const api = supertest(app);

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("secret", 10);
    const user = new User({ username: "firstUser", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mikoppi",
      name: "Miko Peltokorpi",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with taken username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "firstUser",
      name: "Miko Peltokorpi",
      password: "salainen123",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect({
        error: "username must be unique",
      })

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  })

  test("creation fails with username too short", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "hi",
      name: "Miko Peltokorpi",
      password: "salainen123",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect({
        error: "username or password too short, must be over 3 characters",
      })

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).not.toContain(newUser.username);
  })

  test("creation fails with password too short", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "heipähei",
      name: "Miko Peltokorpi",
      password: "11",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect({
        error: "username or password too short, must be over 3 characters",
      })

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).not.toContain(newUser.username);
  })

  afterAll(() => {
    mongoose.connection.close();
  });

});




//npm test -- tests/user_api.test.js