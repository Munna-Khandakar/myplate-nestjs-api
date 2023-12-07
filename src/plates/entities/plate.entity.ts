import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Address } from 'src/address/entities/address.entity';
import { Category } from 'src/category/entities/category.entity';

@Schema({
  timestamps: true,
})
export class Plate {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true })
  images: [string];

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  })
  category: Category;

  @Prop({ type: Number || null })
  quantity: number;

  @Prop({ required: true, type: String })
  price: number;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
  })
  address: Address;
}

export const PlateSchema = SchemaFactory.createForClass(Plate);
