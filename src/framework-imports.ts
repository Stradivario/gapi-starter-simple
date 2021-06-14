import {
  CoreModule,
  GenericGapiResolversType,
  HookService,
  Module,
  ON_REQUEST_HANDLER,
  RESOLVER_HOOK,
} from '@gapi/core';

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
        graphiQlPath: '/graphiql',
        openBrowser: true,
        watcherPort: 8967,
        writeEffects: false,
        graphiql: false,
        graphiQlPlayground: true,
        graphiqlOptions: {
          endpointURL: '/graphql',
          passHeader: `'Authorization':'${Environment.GRAPHIQL_TOKEN}'`,
          subscriptionsEndpoint: `ws://localhost:${Environment.API_PORT || process.env.PORT || 9000}/subscriptions`,
          websocketConnectionParams: {
            token: Environment.GRAPHIQL_TOKEN,
          },
        },
        graphqlOptions: {
          schema: null,
        },
      },
    }),
  ],
  providers: [
    {
      provide: RESOLVER_HOOK,
      deps: [HookService],
      useFactory: () => (resolver: GenericGapiResolversType) => {
        const resolve = resolver.resolve.bind(resolver.target);
        resolver.resolve = async function(root, args, context, info, ...a) {
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
      useFactory: () => (next: Function, request: Request) => {
        /* Every request comming from client will be processed here so we can put user context or other context here */
        request;
        // request.headers.authorization
        // const config = Container.get(GRAPHQL_PLUGIN_CONFIG);
        // config.graphqlOptions.context = {
        //   // driver,
        // };
        return next();
      },
    },
  ],
})
export class FrameworkImports {}
