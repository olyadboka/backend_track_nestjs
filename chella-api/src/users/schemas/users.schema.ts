import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { time } from 'console';
import { Document, Schema } from 'mongoose';

export class User extends Document {
  @Prop()
  fullName: string;

  @Prop()
  username: string;
  @Prop()
  password: string;

  @Prop()
  referredBy: string;
  @Prop()
  referralCode: string;
  @Prop()
  amount: number;

  @Prop()
  totalEarned: number;

  @Prop()
  totalReferrals: number;
}

export const userSchema = SchemaFactory.createForClass(User);
