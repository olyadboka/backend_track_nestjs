import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { time } from 'console';
import { truncate } from 'fs';
import {
  DefaultSchemaOptions,
  Document,
  Model,
  ResolveSchemaOptions,
  SchemaDefinitionProperty,
} from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  fullName: string;

  @Prop({ unique: true })
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

  @Prop()
  totalreferred: number;
}

export const userSchema = SchemaFactory.createForClass(User);
