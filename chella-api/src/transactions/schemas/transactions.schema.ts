import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({timestamps: true})

export class Transaction extends Document{
          @Prop({ required: true })
          //  transferId: Types.ObjectId()
          senderId: string
          @Prop({ required: true })
          receiverId: string

          @Prop({ required: true })
          amount: number
          @Prop({ required: true })
          status: string
          @Prop({default: "ETB"})
          currency: string


}



export const TransactionSchema = SchemaFactory.createForClass(Transaction)