import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers/index";
import { mongoConfig } from "./mongoConfig";
import { createServer } from "http";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

(async function () {
  const PORT = 5000;
  const schema = makeExecutableSchema({
    // @ts-ignore
    cors: {
      origin: "*",
      credentials: true,
    },
    typeDefs,
    resolvers,
  });
  const app = express();
  app.use(cors());

  const httpServer = createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
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
  server.applyMiddleware({ app });

  mongoose
    // @ts-ignore
    .connect(mongoConfig.MONGODB, { useNewUrlParser: true })
    .then(() => {
      console.log("MongoDB Connected");
      httpServer.listen({ port: process.env.PORT || PORT });
    })
    .then((res) => {
      console.log(`Server running at ${PORT}${server.graphqlPath}`);
    })
    .catch((err) => {
      console.error(err);
    });
})();
