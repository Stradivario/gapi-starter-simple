import { Bootstrap } from '@gapi/core';

import { AppModule } from './app/app.module';

Bootstrap(AppModule).subscribe({
  next: () => console.log('Started'),
  error: (e: Error) => console.error(e),
});
