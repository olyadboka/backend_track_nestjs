import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksController } from './controllers/tasks.controller';
import { TasksService } from './services/tasks.service';
import {
  Task,
  TaskSchema,
  UserTask,
  UserTaskSchema,
} from './schemas/tasks.schema';
import { User, userSchema } from '../users/schemas/users.schema';
import { UserService } from 'src/users/services/users.service';
import { Referal, referralSchema } from 'src/referals/schemas/referals.schema';
import { ReferralService } from '../referals/services/referals.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      { name: UserTask.name, schema: UserTaskSchema },
      { name: User.name, schema: userSchema },
      { name: Referal.name, schema: referralSchema },
    ]),
  ],
  controllers: [TasksController],
  providers: [TasksService, UserService, ReferralService],
  exports: [TasksService],
})
export class TasksModule {}
