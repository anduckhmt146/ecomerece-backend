import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserType } from '../types/users.type';

@Schema({
  timestamps: true,
})
export class UsersDocument extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: [UserType.ADMIN, UserType.CUSTOMER] })
  type: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: null })
  otp: boolean;

  @Prop({ default: null })
  otpExpiryTime: Date;
}

export const UserSchema = SchemaFactory.createForClass(UsersDocument);
