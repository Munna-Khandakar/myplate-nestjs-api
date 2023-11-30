import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Category {
  ADV = 'adv',
  CAL = 'cal',
  CRI = 'cri',
}

@Schema({
  timestamps: true,
})
export class Book {
  @Prop()
  title: string;

  @Prop()
  category: Category;
}

export const BookSchema = SchemaFactory.createForClass(Book);
