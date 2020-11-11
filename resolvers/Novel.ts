/**
 * Importing npm packages.
 */
import { ChapterOrErrorResolvers, NovelOrErrorResolvers, NovelResolvers } from '../typescript/graphql.types';

/**
 * Importing user defined packages.
 */
import { chapterModel } from '../models/index.model';

/**
 * Importing and defining types.
 */

/**
 * Declaring the constants.
 */

/**
 * Exporting the novel type.
 */
export const Novel: NovelResolvers = {
  chapter: async (parent, args) => {
    const chapter = await chapterModel.findOne({ nid: parent.nid, cid: args.cid }).lean();
    return chapter;
  },
  chapters: async (parent, args) => {
    const filter = { nid: parent.nid };
    const sort = { index: args.sortDirection ? args.sortDirection : 1 };
    const query = chapterModel.find(filter).sort(sort).skip(args.offset);
    if (args.limit) query.limit(args.limit);
    const [chapters, chapterCount] = await Promise.all([query.lean(), chapterModel.find(filter).countDocuments()]);
    return { entries: chapters, limit: args.limit, offset: args.offset, totalCount: chapterCount };
  }
};

/**
 * Exporting the ChapterOrError type.
 */
export const ChapterOrError: ChapterOrErrorResolvers = {
  __resolveType(obj: any) {
    if (obj.code) return 'Error';
    return 'Chapter';
  }
};

/**
 * Exporting the NovelOrErrortype.
 */
export const NovelOrError: NovelOrErrorResolvers = {
  __resolveType(obj: any) {
    if (obj.code) return 'Error';
    return 'Novel';
  }
};
