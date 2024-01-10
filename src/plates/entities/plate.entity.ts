import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Address } from 'src/address/entities/address.entity';
import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';

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

  @Prop({ required: true, type: String })
  lastTimeToOrder: string;

  @Prop({ type: Boolean, default: false })
  canOrderAnyTime: boolean;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  host: User;
}

export const PlateSchema = SchemaFactory.createForClass(Plate);
