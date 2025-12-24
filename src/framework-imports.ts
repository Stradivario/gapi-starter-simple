import { CoreModule, GenericGapiResolversType, Module, ON_REQUEST_HANDLER, RESOLVER_HOOK } from '@gapi/core';
import { Request } from '@hapi/hapi';
import { GraphqlContext } from 'app/app.context';

import { Environment } from '~app/environment';

@Module({
  imports: [
    CoreModule.forRoot({
      server: {
        hapi: {
          port: Environment.API_PORT || process.env.PORT || 9000,
          routes: {
            cors: {
              origin: ['*'],
              additionalHeaders: [
                'Host',
                'User-Agent',
                'Accept',
                'Accept-Language',
                'Accept-Encoding',
                'Access-Control-Request-Method',
                'Access-Control-Allow-Origin',
                'Access-Control-Request-Headers',
                'Origin',
                'Connection',
                'Pragma',
                'Cache-Control',
              ],
            },
          },
        },
      },
      graphql: {
        path: '/graphql',
      },
    }),
  ],
  providers: [
    {
      provide: RESOLVER_HOOK,
      deps: [],
      useFactory: () => (resolver: GenericGapiResolversType) => {
        const resolve = resolver.resolve.bind(resolver.target);
        resolver.resolve = async function (root, args, context, info, ...a) {
          /*
           *  Here every resolver can be modified even we can check for the result and strip some field
           *  Advanced logic for authentication can be applied here using @gapi/ac or equivalent package
           */
          return resolve(root, args, context, info, ...a);
        };
        return resolver;
      },
    },
    {
      provide: ON_REQUEST_HANDLER,
      useFactory: () => (next: (context: GraphqlContext) => GraphqlContext, request: Request) => {
        /* Every request comming from client will be processed here so we can put user context or other context here */

        console.log('Request initiated', request.payload);
        /* Fetch user and make authorization then attach context to the resolvers */
        // request.headers.authorization
        const context: GraphqlContext = {
          user: {
            id: '1',
          },
        };
        return next(context);
      },
    },
  ],
})
export class FrameworkImports {}
