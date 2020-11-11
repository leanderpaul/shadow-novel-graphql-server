/**
 * Importing npm packages.
 */
import { Error as MongooseError } from 'mongoose';
import { MongoError } from 'mongodb';
import { GraphQLError } from 'graphql';
import debug from 'debug';

/**
 * Importing user defined packages.
 */
import { UserErrors } from '../models/user.model';
import { NovelErrors } from '../models/novel.model';
import { ChapterErrors } from '../models/chapter.model';

/**
 * Importing and defining types.
 */

type ServerErrors = 'UNAUTHENTICATED' | 'UNAUTHORIZED' | 'UNEXPECTED_ERROR' | 'USER_SESSION_EXPIRED';
type ErrorTypes = ServerErrors | UserErrors | NovelErrors | ChapterErrors;

/**
 * Declaring the constants.
 */
const logger = debug('shadow-novel:server-error');
export const errorMessages: Record<ErrorTypes, string> = {
  /**
   * Server Errors.
   */
  UNAUTHENTICATED: 'You are not autenticated, Please sign in to access the page',
  UNAUTHORIZED: 'Access denied',
  UNEXPECTED_ERROR: 'Unexpected server error has occured !',
  USER_SESSION_EXPIRED: 'User session has expired !',
  /**
   * User Errors.
   */
  INVALID_PASSWORD: 'Password invalid !',
  INVALID_USERNAME: 'Username invalid !',
  USER_ALREADY_EXISTS: 'Username already exists !',
  USER_NOT_FOUND: 'User does not exist !',
  CREDENTIALS_INVALID: 'Password does not match !',
  /**
   * Novel Errors.
   */
  NOVEL_TITLE_INVALID: 'Novel title invalid !',
  NOVEL_COVER_INVALID: 'Novel cover invalid !',
  NOVEL_DESC_INVALID: 'Novel description invalid !',
  NOVEL_VOLUME_NAME_INVALID: 'Novel volume name invalid !',
  NOVEL_VOLUME_DESC_INVALID: 'Novel volume description invalid !',
  NOVEL_NOT_FOUND: 'Novel does not exist !',
  NOVEL_VOLUME_NOT_FOUND: 'Novel volume does not exist !',
  /**
   * Chapter Errors.
   */
  CHAPTER_TITLE_INVALID: 'Chapter title invalid !',
  CHAPTER_NOT_FOUND: 'Chaper does not exist !'
};

export class ServerError extends Error {
  code: ErrorTypes;

  constructor(code: ErrorTypes) {
    super();
    this.code = code;
    this.message = errorMessages[code];
    this.name = 'ServerError';
  }

  toObject() {
    return {
      code: this.code,
      message: this.message
    };
  }
}

export function handleError(err: any) {
  let processedError = null;
  if (err instanceof ServerError) processedError = err;
  if (err instanceof GraphQLError) processedError = new ServerError(err.message as ErrorTypes);
  if (err instanceof MongoError && err.code === 11000) processedError = new ServerError(err.errmsg?.split('<>')[1] as ErrorTypes);
  if (err instanceof MongooseError.ValidationError) processedError = new ServerError(err.errors[Object.keys(err.errors)[0]].message as ErrorTypes);
  logger(err);
  if (processedError === null) processedError = new ServerError('UNEXPECTED_ERROR');
  return processedError.toObject();
}

export function formatError(err: any) {
  return handleError(err);
}

function getErrorCodes(): Record<ErrorTypes, ErrorTypes> {
  let errorCodes: any = {};
  const keys: ErrorTypes[] = Object.keys(errorMessages) as ErrorTypes[];
  keys.forEach((key) => (errorCodes[key] = key));
  return errorCodes;
}

export const errorCodes = getErrorCodes();
