import { Module } from '@gapi/core';

import { FrameworkImports } from '../framework-imports';
import { AppQueriesController } from './app.controller';

@Module({
  imports: [FrameworkImports],
  controllers: [AppQueriesController],
})
export class AppModule {}
