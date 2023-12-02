import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Address } from 'src/address/entities/address.entity';

@Schema({ timestamps: true })
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  address: [Address];
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
