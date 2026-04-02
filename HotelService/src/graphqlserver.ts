import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import sequelize from './db/models/sequelize';

const app = express();

async function bootstrap() {
  // 1. Create and START Apollo server first
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  // 2. JSON middleware before GraphQL
  app.use(express.json());

  // 3. Mount GraphQL
  app.use('/graphql', expressMiddleware(server));

  // 4. Sync DB then start listening
  await sequelize.sync();
  app.listen(4000, () => console.log('🚀 Server ready at http://localhost:4000/graphql'));
}

bootstrap();