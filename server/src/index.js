import {GraphQLServer} from 'graphql-yoga';
import {Prisma} from 'prisma-binding';

// Own imports
import resolvers from './resolvers';

const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers,
	context: req => ({
		...req,
		db: new Prisma({
			typeDefs: 'src/generated/prisma.graphql',
			endpoint: 'http://localhost:4466',
			secret: process.env.MY_SECRET,
			debug: process.env.NODE_ENV === 'Production'
		})
	})
});

const options = {
	port: process.env.PORT || 4000,
	playground: process.env.NODE_ENV === 'Production' ? false : '/playground',
	endpoint: '/graphql'
};

server.start(options, ({port}) => console.log(`Server is running on port: ${port}`));
