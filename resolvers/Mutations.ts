/**
 * Importing npm packages.
 */
import uuid from 'uniqid';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * Importing user defined packages.
 */
import { chapterModel, novelModel, userModel } from '../models/index.model';
import { ServerError, handleError } from '../utils/index.utils';

/**
 * Importing types.
 */
import { MutationResolvers } from '../typescript/graphql.types';

/**
 * Declaring the constants.
 */
const secret = process.env.JWT_SECRET!;

/**
 * Exporting mutation resolvers.
 */
export const Mutation: MutationResolvers = {
  register: async (_parent, args) => {
    try {
      const user = await userModel.create({ uid: uuid(), ...args });
      return user.toObject();
    } catch (err) {
      return handleError(err);
    }
  },
  login: async (_parent, args) => {
    try {
      const user = await userModel.findOne({ username: args.username }).lean();
      if (!user) throw new ServerError('USER_NOT_FOUND');
      if (!bcrypt.compareSync(args.password, user.password)) throw new ServerError('CREDENTIALS_INVALID');
      return user;
    } catch (err) {
      return handleError(err);
    }
  },
  verifyUser: async (_parent, args) => {
    try {
      const payload = jwt.verify(args.token, secret) as { username: string };
      const user = await userModel.findOne({ username: payload.username }).lean();
      return user;
    } catch (err) {
      return handleError(err);
    }
  },
  createNovel: async (_parent, args, context) => {
    try {
      const volume = { vid: uuid() };
      const novel = await novelModel.create<any>({ nid: uuid(), author: context.user!.username, ...args.novel, volumes: [volume] });
      return novel.toObject();
    } catch (err) {
      return handleError(err);
    }
  },
  createVolume: async (_parent, args) => {
    try {
      let volume: any = { vid: uuid() };
      if (args.volume.name) volume.name = args.volume.name;
      if (args.volume.desc) volume.desc = args.volume.desc;
      const result = await novelModel.updateOne({ nid: args.nid }, { $push: { volumes: volume } });
      if (result.n === 0) throw new ServerError('NOVEL_NOT_FOUND');
      const novel = await novelModel.findOne({ nid: args.nid }).lean();
      return novel;
    } catch (err) {
      return handleError(err);
    }
  },
  createChapter: async (_parent, args) => {
    try {
      const novel = await novelModel.findOne({ nid: args.nid }).lean();
      if (!novel) throw new ServerError('NOVEL_NOT_FOUND');
      const volume = novel.volumes.find((volume) => volume.vid === args.vid);
      if (!volume) throw new ServerError('NOVEL_VOLUME_NOT_FOUND');
      const lastChapter = await chapterModel.findOne({ nid: args.nid }, 'index').sort('-index').lean();
      const index = lastChapter ? lastChapter.index + 1 : 1;
      const chapter = await chapterModel.create<any>({ nid: args.nid, vid: args.vid, cid: uuid(), index, ...args.chapter });
      return chapter.toObject();
    } catch (err) {
      return handleError(err);
    }
  },
  updateNovel: async (_parent, args) => {
    try {
      const cover = args.update.cover === null ? undefined : args.update.cover;
      const result = await novelModel.updateOne({ nid: args.nid }, { $set: { ...args.update, cover } });
      if (result.n === 0) throw new ServerError('NOVEL_NOT_FOUND');
      const novel = await novelModel.findOne({ nid: args.nid }).lean();
      return novel;
    } catch (err) {
      return handleError(err);
    }
  },
  updateVolume: async (_parent, args) => {
    try {
      const novel = await novelModel.findOne({ nid: args.nid }).lean();
      if (!novel) throw new ServerError('NOVEL_NOT_FOUND');
      novel.volumes = novel.volumes.map((volume) => {
        if (volume.vid === args.vid) {
          if (args.name) volume.name = args.name;
        }
        return volume;
      });
      await novelModel.updateOne({ nid: args.nid }, novel);
      return novel;
    } catch (err) {
      return handleError(err);
    }
  },
  updateChapter: async (_parent, args) => {
    try {
      const result = await chapterModel.updateOne({ nid: args.nid, cid: args.cid }, { $set: args.update });
      if (result.n === 0) {
        const novel = await novelModel.findOne({ nid: args.nid }).lean();
        if (!novel) throw new ServerError('NOVEL_NOT_FOUND');
        throw new ServerError('CHAPTER_NOT_FOUND');
      }
      const chapter = await chapterModel.findOne({ cid: args.cid }).lean();
      return chapter;
    } catch (err) {
      return handleError(err);
    }
  },
  deleteNovel: async (_parent, args) => {
    try {
      const chapterResult = await chapterModel.deleteMany({ nid: args.nid });
      const result = await novelModel.deleteOne({ nid: args.nid });
      if (result.n === 0) throw new ServerError('NOVEL_NOT_FOUND');
      return { status: true, msg: `Novel deleted along with its ${chapterResult.deletedCount}/${chapterResult.n} chapters !` };
    } catch (err) {
      return { status: false, msg: handleError(err).message };
    }
  },
  deleteVolume: async (_parent, args) => {
    try {
      const result = await novelModel.updateOne({ nid: args.nid }, { $pull: { volumes: { vid: args.vid } } });
      if (result.n === 0) throw new ServerError('NOVEL_NOT_FOUND');
      if (result.nModified === 0) throw new ServerError('NOVEL_VOLUME_NOT_FOUND');
      const novel = await novelModel.findOne({ nid: args.nid }).lean();
      return novel;
    } catch (err) {
      return handleError(err);
    }
  },
  deleteChapter: async (_parent, args) => {
    try {
      const chapter = await chapterModel.findOne({ nid: args.nid, cid: args.cid }).lean();
      if (!chapter) throw new ServerError('CHAPTER_NOT_FOUND');
      await chapterModel.deleteOne({ cid: args.cid });
      await chapterModel.updateMany({ nid: args.nid, index: { $gt: chapter.index } }, { $inc: { index: -1 } });
      const novel = await novelModel.findOne({ nid: args.nid }).lean();
      return novel;
    } catch (err) {
      return handleError(err);
    }
  }
};
