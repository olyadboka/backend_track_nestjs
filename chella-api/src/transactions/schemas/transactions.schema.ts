import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "src/users/schemas/users.schema";

@Schema({timestamps: true})

export class Transaction extends Document{
          @Prop({ required: true , type: Types.ObjectId, ref: User.name})
          //  transferId: Types.ObjectId()
          senderId: Types.ObjectId;
          @Prop({ required: true,type: Types.ObjectId, ref: User.name })
          receiverId: string

          @Prop({ required: true })
          amount: number
          @Prop({ required: true })
          status: string
          @Prop({enum: ["ETB","USD","EUR"],default: "ETB"})
          currency: string


}



export const TransactionSchema = SchemaFactory.createForClass(Transaction)