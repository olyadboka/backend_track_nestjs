import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserLoginDto } from '../dtos/users.dto';
import { get } from 'http';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/users.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    // user registration logic goes here

    //1. check if yser exists with provided email or username

    //2. hash the password

    //3. generate referral code

    //4.

    this.userModel.create(createUserDto);
    return { message: 'User created successfully' };
  }

  async loginUser(logingUser: UserLoginDto) {
    // user login logic goes here
    return { message: 'User is logged in successfully' };
  }

  async updateUserProfile(updateProfileDto: UpdateUserDto) {
    return { message: 'User profile updated successfully' };
  }

  async getMyReferral() {
    return { message: 'User referral data fetched successfully' };
  }

  async getMyProfile() {
    return { message: 'User profile data fetched successfully' };
  }
}
