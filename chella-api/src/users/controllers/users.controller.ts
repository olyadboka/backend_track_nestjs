import { Body, Controller, Get, Post, Patch } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserLoginDto } from '../dtos/users.dto';
import { UserService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const result = await this.userService.createUser(createUserDto);

    return result;
  }

  // POST /users/register
  //   POST /users/login
  //   PATCH /users/update-profile
  //   GET /users/myreferral
  //   GET /users/myprofile

  @Post('login')
  async loginUser(@Body() userLoginDto: UserLoginDto) {
    const result = await this.userService.loginUser(userLoginDto);
    return result;
  }

  @Patch('update-profile')
  async updateProfile(@Body() updateUserDto: UpdateUserDto) {
    const result = await this.userService.updateUserProfile(updateUserDto);
    return result;
  }
  @Get('myreferral')
  async getMyReferral() {
    const result = await this.userService.getMyReferral();
    return result;
  }
  @Get('myprofile')
  async getMyProfile() {
    const result = await this.userService.getMyProfile();
    return result;
  }
}
