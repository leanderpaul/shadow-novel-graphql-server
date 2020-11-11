/**
 * Importing npm packages.
 */
import debug from 'debug';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server';

/**
 * Importing user defined packages.
 */
import { typeDefs } from './schemas/index.schemas';
import { resolvers } from './resolvers/index.resolvers';
import { IAMDirective, handleContext, formatError } from './utils/index.utils';

/**
 * Importing and defining types.
 */

/**
 * Declaing the constants.
 */
const db = process.env.DB!;
const logger = debug('shadow-novel:server');
const server = new ApolloServer({ typeDefs, resolvers, schemaDirectives: { iam: IAMDirective }, context: handleContext, formatError });

/**
 * Setting up the database connectivity.
 */
mongoose.connect(db, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => logger(`Connected to database !`));
mongoose.connection.on('error', (err) => logger(err));

export default server;
export { server };
