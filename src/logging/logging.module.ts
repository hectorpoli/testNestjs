import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Logging, LoggingSchema } from '../schema/logging.schema';
import { LoggingService } from './service/logging.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Logging.name, schema: LoggingSchema }]),
  ],
  controllers: [],
  providers: [LoggingService],
  exports: [LoggingService],
})
export class LoggingModule {}
