import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LoggingDocument = Logging & Document;

@Schema()
export class Logging {
  @Prop()
  userId: string;

  @Prop()
  message: string;

  @Prop()
  typeMessage: string;
}

export const LoggingSchema = SchemaFactory.createForClass(Logging);
