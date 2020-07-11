import { GapiObjectType, GraphQLInt, GraphQLScalarType } from '@gapi/core';

@GapiObjectType()
export class AppType {
  readonly id: number | GraphQLScalarType = GraphQLInt;
}
