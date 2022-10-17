const jwtkey = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const Book = require("./models/book-schema");
const Author = require("./models/author-schema");
const User = require("./models/user-schema");
const { UserInputError, AuthenticationError } = require("apollo-server");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

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
                await book.save();
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                });
            }

            pubsub.publish("BOOK_ADDED", { bookAdded: book });
            return book;
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
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
        },
    },
};

module.exports = resolvers;
