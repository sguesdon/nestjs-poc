import { Module } from '@nestjs/common';
import { coreProviders } from './core.providers';

@Module({
  providers: [...coreProviders],
  exports: [...coreProviders],
})
export class CoreModule {}
