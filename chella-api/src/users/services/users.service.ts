import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserLoginDto } from '../dtos/users.dto';
import { get } from 'http';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/users.schema';
import { CommonUtils } from 'src/commons/utils';
import { UserResponse } from '../responses/users.response';
import bcrypt from 'bcrypt';
import { Referal } from 'src/referals/schemas/referals.schema';
import { ReferalsModule } from '../../referals/referals.module';
import { ReferralService } from 'src/referals/services/referals.service';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly referralService: ReferralService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    // user registration logic goes here

    //1. check if yser exists with provided email or username
    const existName = await this.userModel.findOne({
      username: createUserDto.username.toLowerCase(),
    });
    if (existName) {
      throw new BadRequestException('User already exists with this username');
    }

    //2. hash the password
    const hashedPwd = await bcrypt.hash(createUserDto.password, 10);

    //3. generate referral code
    const referralCode = CommonUtils.generateReferralCode(8);
    //! we will impelemend a code to increase amount for refering users


    let referringUser = null as any;
    if (createUserDto.refferredBy) {
      referringUser = await this.userModel.findOne({
        referralCode: createUserDto.refferredBy,
      });

    }
    //4.Prepare an instance to save on db

    const newUser = new this.userModel({
      fullName: createUserDto.fullName,
      username: createUserDto.username.toLowerCase(),
      email: createUserDto.email.toLowerCase(),
      password: hashedPwd,
      referralCode: referralCode,
      referredBy: createUserDto.refferredBy || null,
      amount: 100,
      totalEarned: 100,
      totalReferred: 0,
    });

    //5. save the user to db

    const savedUser = await newUser.save();
    console.log('Saved User:', savedUser);
      if (referringUser) {
        await this.referralService.createReferralTracking(
          referringUser._id.toString(),
          savedUser._id.toString(),
        );
        await this.userModel.findByIdAndUpdate(referringUser._id, {
          totalEarned: referringUser.totalEarned + 20,
          amount: referringUser.amount + 20,
        });
      }
    //6. map to our user response interceptor

    const userResponse: UserResponse = {
      id: savedUser._id.toString(),
      fullName: savedUser.fullName,
      username: savedUser.username,
      referralCode: savedUser.referralCode,
      amount: savedUser.amount,
      totalEarned: savedUser.totalEarned,
      totalreferred: savedUser.totalreferred,
      // updatedAt: savedUser.updatedAt,
      // createdAt: savedUser.createdAt,
    };

    // this.userModel.create(createUserDto);
    return userResponse;
  }

  // async loginUser(logingUser: UserLoginDto) {
  //   // user login logic goes here
  //   return { message: 'User is logged in successfully' };
  // }

  async updateUserProfile(id: string, updateProfileDto: UpdateUserDto) {
    //1. get the data from dto
    // const body = updateProfileDto;

    const user = await this.userModel.findById(id);
    if (!user) {
      throw new BadRequestException('User not found with this id');
    }
    //2. Preparing things

    if (updateProfileDto.fullName) {
      user.fullName = updateProfileDto.fullName;
    }
    if (updateProfileDto.username) {
      const existingUser = await this.userModel.findOne({
        username: updateProfileDto.username.toLowerCase(),
      });

      if (existingUser && existingUser.username !== user.username) {
        throw new BadRequestException('Username is already taken');
      }

      user.username = updateProfileDto.username;
    }
    //#. saving to the db

    const updatedUser = await user.save();

    const userResponse: UserResponse = {
      id: updatedUser._id.toString(),
      fullName: updatedUser.fullName,
      username: updatedUser.username,
      referralCode: updatedUser.referralCode,
      amount: updatedUser.amount,
      totalEarned: updatedUser.totalEarned,
      totalreferred: updatedUser.totalreferred,
      // updatedAt: savedUser.updatedAt,
      // createdAt: savedUser.createdAt,
    };

    // this.userModel.create(createUserDto);
    return userResponse;
  }

  // GET A SIGNLE USER/PROFILE

  async getUserProfile(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new BadRequestException('User not found with this id');
    }
    const UserResponse: UserResponse = {
      id: user._id.toString(),
      fullName: user.fullName,
      username: user.username,
      referralCode: user.referralCode,
      amount: user.amount,
      totalEarned: user.totalEarned,
      totalreferred: user.totalreferred,
    };
    return UserResponse;
  }

  async getAllUsers() {
    const users = await this.userModel.find();
    if (!users || users.length === 0) {
      return [];
    }

    const UserResponse: UserResponse[] = users.map((user) => ({
      id: user._id.toString(),
      fullName: user.fullName,
      username: user.username,
      referralCode: user.referralCode,
      amount: user.amount,
      totalEarned: user.totalEarned,
      totalreferred: user.totalreferred,
    }));
    return UserResponse;
  }

  // LOgin service
  async userLogin(userLoginDto: UserLoginDto) {
    const user = await this.userModel.findOne({
      username: userLoginDto.username.toLowerCase(),
    });

    if (!user) {
      throw new BadRequestException('Invalid username ');
    }

    const isPwdMatch = await bcrypt.compare(
      userLoginDto.password,
      user.password,
    );

    if (!isPwdMatch) {
      throw new BadRequestException('Invalid password ');
    }

    const jwtData = {
      id: user._id.toString(),
      fullName: user.fullName,
      username: user.username,
    };

    const generatedToken = CommonUtils.generateJwtToken(jwtData);
    console.log(' GENERATED TOKEN:', generatedToken);

    return { accessToken: generatedToken };
  }

  async getMyrefferalCode(currrentUser) {
    const user = await this.userModel.findById(currrentUser.id);

    if (!user) {
      throw new BadRequestException('user is not found');
    }

    const UserResponse: UserResponse = {
      referralCode: user.referralCode,
    };
    return UserResponse;
  }

  // REWARD MANAGEMENT SERVICES
   async addTaskRewardToUser(currentUserId: string, rewardAmount: number){
    const user = await this.userModel.findById(currentUserId);

    if(!user){
      throw new BadRequestException("User not Found!");
    }

    user.totalEarned += rewardAmount;
    await user.save();
   }

   async checkUser(username: string){

    const exists = this.userModel.exists({username: username})
    return exists
   }

    getUserBalance = async () =>{
  const balanc
   }
}

//   async getMyReferral() {
//     return { message: 'User referral data fetched successfully' };
//   }

//   async getMyProfile() {
//     return { message: 'User profile data fetched successfully' };
//   }
// }
