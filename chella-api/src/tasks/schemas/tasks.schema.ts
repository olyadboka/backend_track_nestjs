import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Task extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, default: 10 })
  rewardAmount: number;

  @Prop({ required: true })
  taskDate: Date;

  @Prop({ default: true })
  isActive: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

@Schema({ timestamps: true })
export class UserTask extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, ref: 'Task' })
  taskId: string;

  @Prop({ default: false })
  isCompleted: boolean;

  @Prop()
  completedAt: Date;
}

export const UserTaskSchema = SchemaFactory.createForClass(UserTask);