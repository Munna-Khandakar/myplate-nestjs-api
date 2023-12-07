import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Otp {
  @Prop()
  phone: string;

  @Prop()
  isVerified: string;
}

export type OtpDocument = Otp & Document;
export const OtpSchema = SchemaFactory.createForClass(Otp);
