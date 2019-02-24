import { Module, ON_REQUEST_HANDLER, SCHEMA_OVERRIDE, GraphQLSchema, printSchema  } from "@gapi/core";
import { AppQueriesController } from "./app.controller";
import { Request, ResponseToolkit } from 'hapi';
import * as neo4jgql from 'neo4j-graphql-js';
import { v1 as neo4j } from 'neo4j-driver';

function strEnum<T extends string>(o: Array<T>): {[K in T]: K} {
    return o.reduce((res, key) => {
        res[key] = key;
        return res;
    }, Object.create(null));
}

export const EXCLUDE_LIST = strEnum([
    '__Schema',
    '__Type',
    '__TypeKind',
    '__Field',
    '__InputValue',
    '__EnumValue',
    '__Directive',
    '__DirectiveLocation',
    'Int',
    'String',
    'Boolean',
]);
export type EXCLUDE_LIST = keyof typeof EXCLUDE_LIST;

@Module({
    controllers: [AppQueriesController],
    providers: [
        {
            provide: SCHEMA_OVERRIDE,
            useFactory: () => (schema: GraphQLSchema) => {
                const typeMap = schema.getTypeMap();
                const hasCyper: {[key: string]: {fields: {[key: string]: {cyper: string }}}} = {};
                Object.keys(typeMap).forEach(type => {
                    if (!EXCLUDE_LIST[type]) {
                        const typeFields = schema.getType(type)['getFields']();
                        Object.keys(typeFields).forEach(field => {
                            if (typeFields[field].cyper) {
                                hasCyper[type] = {fields: {[field]: {cyper: typeFields[field].cyper}}}
                            }
                        })
                    }
                })
                console.log(hasCyper.Query.fields.Movie.cyper)
                console.log(hasCyper.Movie.fields.similar.cyper);
                // const typeFields = schema.getType('Movie')['getFields']();
                // Object.keys(typeFields).forEach(field => {
                //     if (typeFields[field].cyper) {
                //         console.log(typeFields[field].cyper);
                //     }
                // })
                let typeDefs = printSchema(schema);
                console.log('\n', typeDefs);
                typeDefs = typeDefs.replace('movies: [Movie]', `movies: [Movie] ${hasCyper.Query.fields.Movie.cyper}`)
                typeDefs = typeDefs.replace('similar(first: Int, offset: Int): [Movie]', `similar(first: Int, offset: Int): [Movie] ${hasCyper.Movie.fields.similar.cyper}`)
                console.log('\n', typeDefs);
                // console.log(typeDefs);
                return neo4jgql.makeAugmentedSchema({ typeDefs });
            }
        },
        {
            provide: ON_REQUEST_HANDLER,
            useFactory: () => async (next, context, request: Request, h: ResponseToolkit, err: Error) => {
                // Authenticate user here if it is not authenticated return Boom.unauthorized()
                // if (request.headers.authorization) {
                //     const tokenData = ValidateToken(request.headers.authorization);
                //     const user = {};
                //     if (!user) {
                //         return Boom.unauthorized();
                //     } else {
                //         context.user = {id: 1, name: 'pesho'};
                //     }
                // }
                // context.user - modifying here context will be passed to the resolver
                context.driver = neo4j.driver(
                    'bolt://localhost:7687',
                    neo4j.auth.basic('neo4j', '98412218')
                );
                return next();
            }
        }
    ]
})
export class AppModule { }