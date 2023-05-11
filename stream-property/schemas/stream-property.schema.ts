import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type StreamPropertyDocument = HydratedDocument<StreamProperty>;

@Schema()
export class StreamProperty {
  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  price: number;
}

export const StreamPropertySchema = SchemaFactory.createForClass(StreamProperty);
