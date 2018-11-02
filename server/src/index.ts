import "@babel/polyfill";
import {GraphQLServer} from "graphql-yoga";
import {Prisma} from "prisma-binding";

// Own imports
import resolvers from "./resolvers";

const server = new GraphQLServer({
    context: (req) => ({
        ...req,
        db: new Prisma({
            debug: process.env.NODE_ENV === "Production",
            endpoint: "http://localhost:4466",
            secret: process.env.MY_SECRET,
            typeDefs: "src/generated/prisma.graphql",
        }),
    }),
    resolvers,
    typeDefs: "./src/schema.graphql",
});

const options = {
    endpoint: "/graphql",
    playground: process.env.NODE_ENV === "Production" ? "" : "/playground",
    port: Number(process.env.PORT) || 4000,
};

// Because of the console.log();
// tslint:disable-next-line
server.start(options, ({port}) => console.log(`Server is running on port: ${port}`));
