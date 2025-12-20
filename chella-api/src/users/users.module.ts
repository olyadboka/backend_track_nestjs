import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UserService } from './services/users.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './schemas/users.schema';
import { Referal, referralSchema } from 'src/referals/schemas/referals.schema';
import { ReferralService } from '../referals/services/referals.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: userSchema },
      { name: Referal.name, schema: referralSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UserService, ReferralService],
})
export class UsersModule {}
