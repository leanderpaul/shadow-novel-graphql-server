/**
 * Importing the npm packages.
 */
import fs from 'fs';
import { mergeTypeDefs } from 'graphql-tools';

/**
 * Importing user defined packages.
 */
import { genres, tags } from '../data/index';

/**
 * Reading the graphql schema.
 */
const defaultTypes = fs.readFileSync(__dirname + '/default.gql').toString();
const userTypes = fs.readFileSync(__dirname + '/user.gql').toString();
const novelTypes = fs.readFileSync(__dirname + '/novel.gql').toString();

/**
 * Generating dynamic schema.
 */
const dynamicTypes = `
  enum GenreEnum {
    ${Object.keys(genres).join(' ')}
  }

  enum TagEnum {
    ${Object.keys(tags).join(' ')}
  }
`;

/**
 * Merging the schemas.
 */
export const typeDefs = mergeTypeDefs([defaultTypes, dynamicTypes, userTypes, novelTypes]);
