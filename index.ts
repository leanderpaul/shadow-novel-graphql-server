/**
 * Setting and verifing the environmental variables.
 */
import dotenv from 'dotenv';
if (!process.env.NODE_ENV) dotenv.config();
if (!process.env.PORT) throw new Error('Env: PORT not set');
if (!process.env.DB) throw new Error('Env: DB not set');
if (!process.env.JWT_SECRET) throw new Error('Env: JWT_SECRET not set');

/**
 * Importing the npm packages.
 */
import debug from 'debug';

/**
 * Importing user defined packages.
 */
import app from './server';

/**
 * Declaring the constants.
 */
const port = process.env.PORT!;
const logger = debug('shadow-novel:index');

/**
 * Setting up the server listener.
 */
app.listen(port).then((serverInfo) => logger(`Graphql server running in ${serverInfo.subscriptionsUrl} !`));
