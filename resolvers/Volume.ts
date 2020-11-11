/**
 * Importing npm packages.
 */
import { VolumeResolvers } from '../typescript/graphql.types';

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
 * Exporting the volume type.
 */
export const Volume: VolumeResolvers = {
  chapters: async (parent, args) => {
    const filter = { vid: parent.vid };
    const sort = { index: args.sortDirection ? args.sortDirection : 1 };
    const query = chapterModel.find(filter).sort(sort).skip(args.offset);
    if (args.limit) query.limit(args.limit);
    const [chapters, chapterCount] = await Promise.all([query.lean(), chapterModel.find(filter).countDocuments()]);
    return { entries: chapters, limit: args.limit, offset: args.offset, totalCount: chapterCount };
  }
};
