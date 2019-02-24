import { BootstrapFramework } from '@gapi/core';
import { AppModule } from './app/app.module';
import { CoreModule } from './app/core/core.module';

BootstrapFramework(AppModule, [CoreModule])
    .subscribe(
        () => {
            // console.log(Container.get(GRAPHQL_PLUGIN_CONFIG).graphqlOptions.schema);
            console.log('Started')},
        (e) => console.error(e)
    );