import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Otp {
  @Prop({ required: true, type: String })
  phone: string;

  @Prop({ required: true, type: Boolean })
  isVerified: boolean;

  @Prop()
  code: string;
}

export type OtpDocument = Otp & Document;
export const OtpSchema = SchemaFactory.createForClass(Otp);
