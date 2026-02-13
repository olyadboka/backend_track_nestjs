import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, UserTask } from '../schemas/tasks.schema';
import { Model } from 'mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TaskResponse } from '../responses/tasks.response';
import { UserService } from '../../users/services/users.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
    @InjectModel(UserTask.name) private readonly userTaskModel: Model<UserTask>,
    private readonly userServices: UserService,
  ) {}

  // Background job to create daily tasks
  @Cron(CronExpression.EVERY_10_SECONDS)
  async createDailyTasks() {
    console.log('HEY WE ARE RUNNING A CORN JOB EVERY 30 MINUTES');
    const today = new Date().toISOString().split('T')[0];

    //1. count today's tasks
    const taskCount = await this.taskModel.countDocuments({
      taskDate: today,
    });

    if (taskCount >= 5) {
      console.log("Today's tasks already created.");
      return;
    }

    //2. let's manage incase of server down and create only missing tasks
    const tasksToCreate = 5 - taskCount;

    //3. create tasks
    for (let i = 0; i < tasksToCreate; i++) {
      const newTask = new this.taskModel({
        title: `Daily Task ${taskCount + i + 1}`,
        rewardAmount: 10,
        taskDate: today,
      });

      await newTask.save();
    }
    console.log(`${tasksToCreate} tasks created for today.`);
  }

  //fetch daily tasks
  async getDailyTasks() {
    const today = new Date().toISOString().split('T')[0];

    const todayTasks = await this.taskModel.find({
      taskDate: today,
    });

    const response: TaskResponse[] = todayTasks.map((task) => ({
      id: task._id.toString(),
      title: task.title,
      rewardAmount: task.rewardAmount,
      taskDate: task.taskDate,
    }));

    return response;
  }

  // Complete a task

  async compeletedTask(currentUser, taskId: string) {
    // Check if the task exists

    const taskExists = await this.taskModel.findById(taskId);

    if (!taskExists) {
      throw new BadRequestException('Task not found!');
    }
    // check the existance of completed tasks for current user

    const alreadyCompletedExists = await this.userTaskModel.exists({
      userId: currentUser.id,
      taskId: taskId,
    });

    //check

    if (alreadyCompletedExists) {
      throw new BadRequestException('Task already completed!');
    }

    const userTask = await this.userTaskModel.create({
      userId: currentUser.id,
      taskId: taskId,
      isCompleted: true,
    });

    const savedUserTask = await userTask.save();

    // update user's total Earned with the task Reward

    const updatedUser = await this.userServices.addTaskRewardToUser(
      currentUser.id.toString(),
      taskExists.rewardAmount,
    );
    //use interceptor and respond back

    const response: TaskResponse = {
      id: taskExists._id.toString(),
      rewardAmount: taskExists.rewardAmount,
      taskDate: taskExists.taskDate,
      isCompleted: savedUserTask.isCompleted,
    };

    return response;
  }

  //getting all the completed tasks for the user

  // a service to fetch completed tasks by current user
  async getUserCompletedTasks(currentUser) {
    //1. get user completed tasks from userTask collection
    const userTasks = await this.userTaskModel.find({
      userId: currentUser.id,
      isCompleted: true,
    });

    const taskIds = userTasks.map((userTask) => userTask.taskId);

    const tasks = await this.taskModel.find({
      _id: { $in: taskIds },
    });

    //3. prepraring response
    const response: TaskResponse[] = tasks.map((task) => ({
      id: task._id.toString(),
      title: task.title,
      rewardAmount: task.rewardAmount,
      taskDate: task.taskDate,
      isCompleted: true,
    }));

    return response;
  }
}
