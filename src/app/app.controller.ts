import { Controller, GraphQLInt, GraphQLNonNull, Query, Type } from '@gapi/core';

import { AppType } from './app.type';

@Controller()
export class AppQueriesController {
  @Type(AppType)
  @Query({
    id: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  })
  findApp(root, { id }, context): AppType {
    return { id: id };
  }
}
