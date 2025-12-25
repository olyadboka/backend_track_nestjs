import { Prop, Schema } from "@nestjs/mongoose";
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
@Prop({ default:false })

isCompleted: boolean
@Prop({default: "ETB"})
currency: string


}
