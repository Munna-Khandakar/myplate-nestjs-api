import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class Plate {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: String })
  images: string[];

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  })
  category: string;

  @Prop({ type: Number || null })
  quantity: number;

  @Prop({ required: true, type: String })
  price: number;

  @Prop({
    required: true,
    type: Object,
  })
  address: {
    id: string;
    title: string;
    description: string;
    lat: number | null;
    long: number | null;
  };

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Delivery',
  })
  delivery: string;
}

export const PlateSchema = SchemaFactory.createForClass(Plate);
