import { Controller, Type, Query, Interceptor, Injectable, InterceptResolver, GraphQLList, GenericGapiResolversType, GraphQLString } from "@gapi/core";
import { GraphQLContext } from "./app.type";
import { tap } from 'rxjs/operators';
import { neo4jgraphql } from 'neo4j-graphql-js';
import { Observable } from "rxjs/internal/Observable";
import { Movie } from "./types/Movie.type";
// import { IAppType } from "./core/api-introspection";

@Injectable()
export class AppInterceptor implements InterceptResolver {
    intercept(
        $chainable: Observable<any>,
        context: GraphQLContext,
        payload,
        descriptor: GenericGapiResolversType
    ) {
        console.log('Before...');
        const now = Date.now();
        return $chainable.pipe(
          tap((res) => {
              console.log(res);
              console.log(`After... ${Date.now() - now}ms`);
          }),
        );
    }
}


export function Cyper<T>(cyper: string): Function {
    return (t: any, propKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        const self = t;
        const originalMethod = descriptor.value;
        const propertyKey = propKey;
        descriptor.value = function (...args: any[]) {
            const returnValue = originalMethod.apply(args);
            Object.assign(returnValue, { cyper });
            return returnValue;
        };
        self.constructor._descriptors = self.constructor._descriptors || new Map();
        self.constructor._descriptors.set(propertyKey, descriptor);

        return descriptor;
    };
}

@Controller()
export class AppQueriesController {

    @Type(new GraphQLList(Movie))
    @Interceptor(AppInterceptor)
    @Cyper(`@relation(name: "IN_GENRE", direction: "IN")`)
    @Query({
        title: {
            type: GraphQLString
        }
    })
    Movie(root: any, params, ctx: GraphQLContext, resolveInfo) {
        return neo4jgraphql(root, params, ctx, resolveInfo);
    }

}


