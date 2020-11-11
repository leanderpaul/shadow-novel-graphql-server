/**
 * Importing npm packages.
 */
import { Schema, Document, model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

/**
 * Importing user defined packages.
 */
import { errorCodes } from '../utils/ServerError';

/**
 * Importing and defning types.
 */
export type UserErrors = 'INVALID_USERNAME' | 'INVALID_PASSWORD' | 'USER_ALREADY_EXISTS' | 'USER_NOT_FOUND' | 'CREDENTIALS_INVALID';

export interface User {
  uid: string;
  username: string;
  password: string;
}

export interface UserDocument extends User, Document {}

/**
 * Definging user schema.
 */
const userSchema = new Schema<User>({
  uid: {
    type: String,
    required: 'UID_REQUIRED'
  },
  username: {
    type: String,
    validate: [validator.isAlphanumeric, errorCodes.INVALID_USERNAME]
  },
  password: {
    type: String,
    validate: [(str) => validator.isLength(str, { min: 3, max: 32 }), errorCodes.INVALID_PASSWORD]
  }
});

/**
 * Setting up pre-save hook to hash password.
 */
userSchema.pre<UserDocument>('save', function () {
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

/**
 * Setting up the index.
 */
userSchema.index({ username: 1 }, { name: `<>${errorCodes.USER_ALREADY_EXISTS}<>`, unique: true });

/**
 * Exporting the user model.
 */
export default model<UserDocument>('users', userSchema);
