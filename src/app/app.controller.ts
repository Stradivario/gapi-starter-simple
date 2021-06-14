import { Controller, GraphQLInt, GraphQLNonNull, Query, Type } from '@gapi/core';

import { IAppType } from '~core/api-introspection';

import { GraphqlContext } from './app.context';
import { AppType } from './app.type';

@Controller()
export class AppQueriesController {
  @Type(AppType)
  @Query({
    id: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  })
  findApp(root, { id }, context: GraphqlContext): IAppType {
    context;
    return { id: id };
  }
}
