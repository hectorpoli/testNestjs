import { Module } from '@nestjs/common';
import { IdExistsRule } from './existsId.validator';
import { Unique } from './unique';

@Module({
  imports: [],
  providers: [Unique, IdExistsRule],
})
export class ValidatorModule {}
