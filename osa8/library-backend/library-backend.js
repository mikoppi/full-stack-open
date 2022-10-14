const {
    ApolloServer,
    gql,
    UserInputError,
    AuthenticationError,
} = require("apollo-server");

const mongoose = require("mongoose");
require("dotenv").config();
const Book = require("./models/book-schema");
const Author = require("./models/author-schema");
const User = require("./models/user-schema");
const jwt = require("jsonwebtoken");
const uri = process.env.MONGODB_URI;
const jwtkey = process.env.JWT_SECRET;

mongoose
    .connect(uri)
    .then(() => {
        console.log("Connected to mongodb");
    })
    .catch((error) =>
        console.log("failed to connect to mongodb", error.message)
    );

const typeDefs = gql`
    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [String!]!
        id: ID!
    }

    type Author {
        name: String!
        born: Int
        bookCount: Int
        id: ID!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
    }

    type Mutation {
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String]!
        ): Book!
        editAuthor(name: String!, setBornTo: Int!): Author
        createUser(username: String!, favoriteGenre: String!): User
        login(username: String!, password: String!): Token
    }

    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }
`;

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            if (args.genre !== undefined) {
                return Book.find({ genres: `${args.genre}` }).populate(
                    "author"
                );
            }
            return Book.find({}).populate("author");
        },
        allAuthors: async () => {
            return Author.find({});
        },
        me: (root, args, context) => {
            return context.currentUser;
        },
    },
    Author: {
        bookCount: async (root) => {
            return Book.countDocuments({ author: root });
        },
    },

    Mutation: {
        addBook: async (root, args, { currentUser }) => {
            const existingAuthor = await Author.findOne({ name: args.author });

            if (!currentUser) {
                throw new AuthenticationError("not authenticated");
            }

            if (existingAuthor === null) {
                const author = new Author({ name: args.author });
                try {
                    await author.save();
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    });
                }
            }

            const book = new Book({
                ...args,
                author: await Author.findOne({ name: args.author }),
            });

            try {
                return book.save();
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                });
            }
        },
        editAuthor: async (root, args, { currentUser }) => {
            const author = await Author.findOne({ name: args.name });
            author.born = args.setBornTo;

            if (!currentUser) {
                throw new AuthenticationError("not authenticated");
            }

            try {
                return author.save();
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                });
            }
        },
        createUser: async (root, args) => {
            const user = new User({
                username: args.username,
                favoriteGenre: args.favoriteGenre,
            });

            return user.save().catch((error) => {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                });
            });
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username });

            if (!user || args.password !== "secret") {
                throw new UserInputError("wrong credentials");
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            };

            return { value: jwt.sign(userForToken, jwtkey) };
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.toLowerCase().startsWith("bearer ")) {
            const decodedToken = jwt.verify(auth.substring(7), jwtkey);
            const currentUser = await User.findOne({
                username: decodedToken.username,
            });
            return { currentUser };
        }
    },
});

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
