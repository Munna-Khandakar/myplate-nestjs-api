import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Address {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true, default: false })
  selected: boolean;
  @Prop({ required: true })
  description: string;
  @Prop()
  lat: number | null;
  @Prop()
  long: number | null;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
