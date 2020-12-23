/**
 * Importing npm packages.
 */
import { Schema, Document, model } from 'mongoose';
import validator from 'validator';

/**
 * Importing user defined packages.
 */
import { errorCodes } from '../utils/ServerError';

/**
 * Importing and defning types.
 */
import { StatusEnum, GenreEnum, TagEnum } from '../typescript/graphql.types';

export type NovelErrors =
  | 'NOVEL_TITLE_INVALID'
  | 'NOVEL_COVER_INVALID'
  | 'NOVEL_DESC_INVALID'
  | 'NOVEL_VOLUME_NAME_INVALID'
  | 'NOVEL_VOLUME_DESC_INVALID'
  | 'NOVEL_NOT_FOUND'
  | 'NOVEL_VOLUME_NOT_FOUND';

export interface Volume {
  vid: string;
  name?: string;
  desc?: string;
}

export interface Novel {
  nid: string;
  title: string;
  cover?: string;
  author: string;
  desc: string;
  status: StatusEnum;
  genre: GenreEnum;
  tags: TagEnum[];
  views: number;
  volumes: Volume[];
  createdAt: Date;
}

export interface NovelDocument extends Novel, Document {}

/**
 * Defining volume schema.
 */
const volumeSchema = new Schema<Volume>(
  {
    vid: {
      type: String,
      required: 'VID_REQUIRED'
    },
    name: {
      type: String,
      validate: [validator.isAlphanumeric, '']
    },
    desc: {
      type: String,
      validate: [(str) => validator.isLength(str, { min: 3, max: 1000 }), '']
    }
  },
  { _id: false }
);

/**
 * Defining novel schema.
 */
const novelSchema = new Schema<Novel>(
  {
    nid: {
      type: String,
      required: 'NID_REQUIRED'
    },
    title: {
      type: String,
      validate: [(str) => validator.isLength(str, { min: 3, max: 32 }), errorCodes.NOVEL_TITLE_INVALID]
    },
    cover: {
      type: String
    },
    author: {
      type: String
    },
    desc: {
      type: String,
      validate: [(str) => validator.isLength(str, { min: 3, max: 1000 }), errorCodes.NOVEL_DESC_INVALID]
    },
    status: {
      type: String
    },
    genre: {
      type: String
    },
    tags: {
      type: [String]
    },
    views: {
      type: Number,
      default: 0
    },
    volumes: {
      type: [volumeSchema]
    }
  },
  { timestamps: { updatedAt: false } }
);

/**
 * Setting up the index.
 */
novelSchema.index({ nid: 1 }, { name: `<>NID_ALREADY_EXISTS<>`, unique: true });

/**
 * Exporting the novel model.
 */
export default model<NovelDocument>('gql-novels', novelSchema);
