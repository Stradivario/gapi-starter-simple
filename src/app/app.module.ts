import { Module } from '@gapi/core';

import { CoreModule } from '~core/core.module';

import { FrameworkImports } from '../framework-imports';
import { AppQueriesController } from './app.controller';

@Module({
  imports: [CoreModule, FrameworkImports],
  controllers: [AppQueriesController],
})
export class AppModule {}
