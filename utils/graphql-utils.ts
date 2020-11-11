/**
 * Importing npm packages.
 */
import { SchemaDirectiveVisitor, ApolloError } from 'apollo-server';
import { defaultFieldResolver, GraphQLResolveInfo, FieldNode, FragmentDefinitionNode, InlineFragmentNode } from 'graphql';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

/**
 * Importing user defined packages.
 */
import { novelModel, userModel } from '../models/index.model';
import { ServerError } from './ServerError';

/**
 * Importing and defining types.
 */
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { Role } from '../typescript/graphql.types';
import { Context } from '../typescript/server.types';

interface Args {
  nid: string;
}

export interface IProjection {
  [key: string]: number | IProjection;
}

/**
 * Declaring the constants.
 */
const secret = process.env.JWT_SECRET!;

export class IAMDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: any) {
    const { resolve = defaultFieldResolver } = field;
    const requiredRole: Role = this.args.requires;
    field.resolve = async function (parent: any, args: Args, context: Context, info: any) {
      let err = context.err;
      if (requiredRole && !context.user && !err) err = new ServerError('UNAUTHENTICATED');
      if (requiredRole === 'NOVEL_ADMIN' && !err) {
        const novel = await novelModel.findOne({ nid: args.nid });
        if (!novel) err = new ServerError('UNAUTHORIZED');
      }
      if (err) throw new ApolloError(err.code);
      return resolve(parent, args, context, info);
    };
  }
}

function getSelections(fieldNode: FragmentDefinitionNode | InlineFragmentNode, info: GraphQLResolveInfo): IProjection;
function getSelections(fieldNode: FieldNode, info: GraphQLResolveInfo): IProjection | number;
function getSelections(fieldNode: FieldNode | FragmentDefinitionNode | InlineFragmentNode, info: GraphQLResolveInfo): IProjection | number {
  let obj: IProjection = {};
  if (!fieldNode.selectionSet) return 1;
  const selectionsLength = fieldNode.selectionSet.selections.length || 0;
  for (let selectionIndex = 0; selectionIndex < selectionsLength; selectionIndex++) {
    const selection = fieldNode.selectionSet.selections[selectionIndex];
    const field = selection;
    if (field.kind === 'Field') {
      obj[field.name.value] = getSelections(field, info);
    } else if (field.kind === 'FragmentSpread') {
      obj = { ...obj, ...getSelections(info.fragments[field.name.value], info) };
    } else if (field.kind === 'InlineFragment') {
      obj = { ...obj, ...getSelections(field, info) };
    }
  }
  return obj;
}

export function parseProjection(info: GraphQLResolveInfo): any {
  let projection: IProjection = {};
  const fieldNodesLength = info.fieldNodes.length;
  for (let fieldIndex = 0; fieldIndex < fieldNodesLength; fieldIndex++) {
    const fieldNode = info.fieldNodes[fieldIndex];
    projection[fieldNode.name.value] = getSelections(fieldNode, info);
  }
  return projection;
}

export async function handleContext(context: ExpressContext): Promise<Context> {
  try {
    const { req } = context;
    const token = req.headers.authorization;
    if (!token) return { user: null, err: null };
    const payload = jwt.verify(token, secret) as { username: string };
    const user = await userModel.findOne({ username: payload.username }).lean();
    return { user, err: null };
  } catch (err) {
    if (err.name === TokenExpiredError.name) return { err: new ServerError('USER_SESSION_EXPIRED').toObject(), user: null };
    console.log(err, err.name, TokenExpiredError.name);
    return { user: null, err: new ServerError('UNEXPECTED_ERROR').toObject() };
  }
}
