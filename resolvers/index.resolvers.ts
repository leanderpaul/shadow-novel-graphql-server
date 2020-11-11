/**
 * Importing npm packages.
 */

/**
 * Importing user defined packages.
 */
import { Query } from './Query';
import { Mutation } from './Mutations';
import { User, UserOrError } from './User';
import { Novel, ChapterOrError, NovelOrError } from './Novel';
import { Volume } from './Volume';

/**
 * Importing and defining types.
 */
import { Resolvers } from '../typescript/graphql.types';

/**
 * Declaring the constants.
 */

/**
 * Exporting the Graphl resolvers.
 */
export const resolvers: Resolvers = { Query, Mutation, User, Novel, Volume, UserOrError, ChapterOrError, NovelOrError };
