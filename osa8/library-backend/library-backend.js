require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const express = require("express");
const http = require("http");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const mongoose = require("mongoose");
const User = require("./models/user-schema");
const jwt = require("jsonwebtoken");
const uri = process.env.MONGODB_URI;
const jwtkey = process.env.JWT_SECRET;

//subscriptions
const { useServer } = require("graphql-ws/lib/use/ws");
const { WebSocketServer } = require("ws");

mongoose
    .connect(uri)
    .then(() => {
        console.log("Connected to mongodb");
    })
    .catch((error) =>
        console.log("failed to connect to mongodb", error.message)
    );

const start = async () => {
    const app = express();
    const httpServer = http.createServer(app);
    const schema = makeExecutableSchema({ typeDefs, resolvers });

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: "/",
    });
    const serverCleanup = useServer({ schema }, wsServer);

    const server = new ApolloServer({
        schema,
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
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            },
        ],
    });
    await server.start();

    server.applyMiddleware({
        app,
        path: "/",
    });

    const PORT = 4000;

    httpServer.listen(PORT, () => {
        console.log(`Server is now running on http://localhost:${PORT}`);
    });
};

start();
