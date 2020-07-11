import { Bootstrap } from '@gapi/core';

import { AppModule } from './app/app.module';

Bootstrap(AppModule).subscribe(
  () => console.log('Started'),
  e => console.error(e),
);
