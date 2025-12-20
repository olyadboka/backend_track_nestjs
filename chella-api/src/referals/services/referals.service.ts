import { BadRequestException, Injectable } from '@nestjs/common';
import { Referal } from '../schemas/referals.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { retry } from 'rxjs';
import { ReferredUsersResporse, ReferrerResponse } from '../responses/referals.response';

@Injectable()
export class ReferralService {
  constructor(
    @InjectModel(Referal.name)
    private readonly referralModel: Model<Referal>,
  ) {}

  async createReferralTracking(referredId: string, referredUserId: string) {
    //!. Preventing self-referral

    if (referredId === referredUserId) {
      throw new BadRequestException('Usedr can not  refer them selves');
    }

    //2. let's use exists() to prevent duplicates

    const refExits = await this.referralModel.exists({
      referredUserId: referredUserId,
    });

    if (refExits) {
      throw new BadRequestException(' User already referred');
    }

    const referral = await this.referralModel.create({
      referrerId: referredId,
      referredUserId: referredUserId,
    });

    return referral.save();
  }

  async getMyReferrer(currentUser){
    const referral = await this.referralModel.findOne({
      referredUserId: new Types.ObjectId(currentUser.id)
    }).populate('referrerId','username fullName createdAt');

    if(!referral){
      throw new BadRequestException(" You don't have a referrer.")
    }

    const referrer = referral.referrerId as any;

    console.log("Referral found: ", referral);
    console.log("Referrer found:", referrer);

    const referrerRespose: ReferrerResponse ={
      id: referral?._id.toString(),
      referrerId: referrer?._id.toString(),
      referrerFullName: referrer?.fullName,
      referrerUsername: referrer?.usernme,
    }
    return referrerRespose;
  }


  async getMyReferredUsers(currentUser){
    const referrals = await this.referralModel.find({referrerId: new Types.ObjectId(currentUser.id)}).populate("referredUserId", "username fullName createdAt")

    if(referrals.length === 0){
      return [];
    }

     const referredRespose: ReferredUsersResporse[] = referrals.map(referral => {
      const referredUser = referral.referredUserId as any;
      return {id: referral?._id.toString(),
      referrerId: referredUser?._id.toString(),
      referrerFullName: referredUser?.fullName,
      referrerUsername: referredUser?.usernme,
    }});
    

    return referredRespose
  }
}
