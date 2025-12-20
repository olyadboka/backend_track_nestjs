import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { timeStamp } from "console";
import { Document } from "mongoose";

@Schema({ timestamps: true})
export class Task extends Document{
  @Prop() title: string;
  @Prop() rewardAmount: number;
  @Prop() taskDate: Date;
}


export const taskSchema = SchemaFactory.createForClass(Task)


@Schema({timestamps: true})

export class UserTask extends Document{
   @Prop() userId: string;
  @Prop() taskId: number;
  @Prop() isCompleted: boolean;
}


export const userTaskSchema = SchemaFactory.createForClass(UserTask)