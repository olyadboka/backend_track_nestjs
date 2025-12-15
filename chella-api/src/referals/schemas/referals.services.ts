import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/schemas/users.schema';

@Schema({ timestamps: true })
export class Referal extends Document {
  @Prop({ type: Types.ObjectId, ref: User.name })
  referrerId: Types.ObjectId;
  @Prop()
  referredUserId: Types.ObjectId;
}

export const referralSchema = SchemaFactory.createForClass(Referal);
