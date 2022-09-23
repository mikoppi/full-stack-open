describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/test/reset");
    const user = {
      name: "Test User",
      username: "testuser",
      password: "salainen",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("testuser");
      cy.get("#password").type("salainen");
      cy.get("#login-button").click();
      cy.contains("Test User logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("testuser123");
      cy.get("#password").type("salainen123");
      cy.get("#login-button").click();
      cy.get(".error").contains("wrong username or password");
      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "testuser", password: "salainen" });
    });

    it("A blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("test blog title");
      cy.get("#author").type("test blog author");
      cy.get("#url").type("test blog url");
      cy.contains("submit").click();
      cy.contains("test blog title");
      cy.contains("test blog author");
      cy.contains("test blog url");
    });

    describe("and some blogs exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "testtitle1",
          author: "testauthor1",
          url: "testurl1",
        });
        cy.createBlog({
          title: "testtitle2",
          author: "testauthor2",
          url: "testurl2",
        });
        cy.createBlog({
          title: "testtitle3",
          author: "testauthor3",
          url: "testurl3",
        });
      });

      it("one of those can be liked", function () {
        cy.contains("view").click();
        cy.get("#like-button").click();
        cy.contains("likes 1");
      });

      it("blog can be removed", function () {
        cy.contains("view").click();
        cy.get("#remove-button").click();
        cy.contains("blog testtitle1 by testauthor1 removed");
      });

      it("blogs are sorted by the likes", () => {
        cy.contains("testtitle3")
          .parent()
          .find("#like-button")
          .click({ force: true });
        cy.contains("testtitle3")
          .parent()
          .find("#like-button")
          .click({ force: true });
        cy.contains("testtitle3")
          .parent()
          .find("#like-button")
          .click({ force: true });
        cy.get("#blog").eq(0).should("contain", "testtitle3");
      });
    });
  });
});
