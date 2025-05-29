import { Logger, Module } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  providers: [LoggerMiddleware, Logger],
  exports: [LoggerMiddleware, Logger],
})
export class MiddlewaresModule {}
