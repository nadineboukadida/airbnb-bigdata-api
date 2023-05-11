import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type PropertyDocument = HydratedDocument<Property>;

@Schema()
export class Property {
  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  price: number;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
