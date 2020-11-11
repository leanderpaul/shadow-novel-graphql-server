/**
 * Importing npm packages.
 */
import jwt from 'jsonwebtoken';

/**
 * Importing user defined packages.
 */
import novelModel from '../models/novel.model';

/**
 * Importing and defning types.
 */
import { UserOrErrorResolvers, UserResolvers } from '../typescript/graphql.types';

/**
 * Declaring the constants.
 */
const secret = process.env.JWT_SECRET!;

/**
 * Exporting the User resolver.
 */
export const User: UserResolvers = {
  token: (parent) => jwt.sign({ username: parent.username }, secret, { expiresIn: 60 * 60 * 24 * 2 }),
  novels: async (parent, args) => {
    const filter = { title: new RegExp(args.title, 'i'), author: parent.username };
    const sort = args.sort ? args.sort : '-createdAt';
    const [novels, novelCount] = await Promise.all([novelModel.find(filter).sort(sort).skip(args.offset).limit(args.limit).lean(), novelModel.find(filter).countDocuments()]);
    return { entries: novels, limit: args.limit, offset: args.offset, totalCount: novelCount };
  }
};

/**
 * Exporting UserOrError resolver
 */
export const UserOrError: UserOrErrorResolvers = {
  __resolveType(obj: any) {
    if (obj.code) return 'Error';
    return 'User';
  }
};
