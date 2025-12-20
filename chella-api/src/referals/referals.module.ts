import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Referal, referralSchema } from './schemas/referals.schema';
import { ReferralService } from './services/referals.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Referal.name, schema: referralSchema }]),
  ],
  controllers: [],
  providers: [ReferralService],
})
export class ReferalsModule {}
