import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Category {
  @Prop({ required: true, type: String, unique: true })
  title: string;

  @Prop({ required: true, type: String, unique: true })
  slug: string;

  @Prop({ type: String })
  description: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
