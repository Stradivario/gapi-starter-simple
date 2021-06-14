import { GraphQLInt, GraphQLObjectType } from '@gapi/core';

export const AppType = new GraphQLObjectType({
  name: 'AppType',
  fields: () => ({
    id: {
      type: GraphQLInt,
    },
  }),
});
