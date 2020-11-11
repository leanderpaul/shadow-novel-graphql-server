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
export type ChapterErrors = 'CHAPTER_TITLE_INVALID' | 'CHAPTER_NOT_FOUND';

export interface Chapter {
  cid: string;
  nid: string;
  vid: string;
  index: number;
  title: string;
  content: string;
  matureContent: boolean;
  createdAt: Date;
}

export interface ChapterDocument extends Chapter, Document {}

/**
 * Defining the chapter schema.
 */
const chapterSchema = new Schema<Chapter>(
  {
    cid: {
      type: String,
      required: 'CID_REQUIRED'
    },
    nid: {
      type: String,
      required: 'NID_REQUIRED'
    },
    vid: {
      type: String,
      required: 'VID_REQUIRED'
    },
    index: {
      type: Number
    },
    title: {
      type: String,
      validate: [(str) => validator.isLength(str, { min: 3, max: 50 }), errorCodes.CHAPTER_TITLE_INVALID]
    },
    content: {
      type: String
    },
    matureContent: {
      type: Boolean
    }
  },
  { timestamps: { updatedAt: false } }
);

/**
 * Setting up the index.
 */
chapterSchema.index({ cid: 1 }, { name: '<>CID_ALREADY_EXISTS<>', unique: true });

/**
 * Exporting the chapter model.
 */
export default model<ChapterDocument>('chapters', chapterSchema);
