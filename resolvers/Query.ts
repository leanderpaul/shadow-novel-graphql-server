/**
 * Importing npm packages.
 */

/**
 * Importing user defined packages.
 */
import { novelModel } from '../models/index.model';

/**
 * Importing and defining types.
 */
import { QueryResolvers } from '../typescript/graphql.types';
import { parseProjection } from '../utils/index.utils';

/**
 * Declaring the constants.
 */

export const Query: QueryResolvers = {
  user: async (_parent, _args, context) => {
    return context.user!;
  },
  novels: async (_parent, args, _context, info) => {
    const projection = parseProjection(info).novels.entries;
    let filter: any = {};
    if (args.filter.title) filter.title = new RegExp(args.filter.title, 'i');
    if (args.filter.author) filter.author = new RegExp(args.filter.author, 'i');
    if (args.filter.status) filter.status = args.filter.status;
    if (args.filter.genre) filter.genre = args.filter.genre;
    const sort = args.sort ? args.sort : 'title';
    const [novels, novelCount] = await Promise.all([novelModel.find(filter, projection).sort(sort).skip(args.offset).limit(args.limit).lean(), novelModel.find(filter).countDocuments()]);
    return { entries: novels, limit: args.limit, offset: args.offset, totalCount: novelCount };
  },
  novel: async (_parent, args, _context, info) => {
    const projection = parseProjection(info).novel;
    const novel = await novelModel.findOne(args, projection).lean();
    return novel;
  }
};
