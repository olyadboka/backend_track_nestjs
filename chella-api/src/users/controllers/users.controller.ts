import { Body, Controller, Get, Post, Patch, Param, Req } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserLoginDto } from '../dtos/users.dto';
import { UserService } from '../services/users.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/commons/guards/jwtauth.guard';

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
    const result = await this.userService.userLogin(userLoginDto);
    return result;
  }

  @Patch('update-profile/:id')
  async updateProfile(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: any,
  ) {
    console.log('Methods:', req.method);
    console.log('Url:', req.url);
    console.log('body:', req.body);
    console.log('params:', req.parm);
    const result = await this.userService.updateUserProfile(id, updateUserDto);
    return result;
  }

  @Get('get-profile/:id')
  async getProfile(@Param('id') id: string) {
    const result = await this.userService.getUserProfile(id);
    return result;
  }

  @JwtAuthGuard()
  @Get('get-all-users')
  async getAllUsers() {
    const result = await this.userService.getAllUsers();
    return result;
  }

  @JwtAuthGuard()
  @Get('my-referral-code')
  async getMyreferralCode(@Req() req: any) {
    const referral = this.userService.getMyrefferalCode(req.user);

    return referral;
  }
}
// }
// @Get('myreferral')
// async getMyReferral() {
//   const result = await this.userService.getMyReferral();
//   return result;
// }
// @Get('myprofile')
// async getMyProfile() {
//   const result = await this.userService.getMyProfile();
//   return result;
// }
// }
