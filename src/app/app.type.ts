import { v1 as neo4j } from 'neo4j-driver';

export interface GraphQLContext { driver: neo4j.Driver }