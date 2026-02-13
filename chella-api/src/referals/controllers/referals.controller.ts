import { Controller, Get, Req } from '@nestjs/common';
import { ReferralService } from '../services/referals.service';
import { JwtAuthGuard } from 'src/commons/guards/jwtauth.guard';

@Controller('referrals')
export class ReferralsController {
  constructor(private readonly referralService: ReferralService) {}

  @JwtAuthGuard()
  @Get('my-referrer')
  async getMyreferrer(@Req() req: any) {
    return await this.referralService.getMyReferrer(req.user);
  }

  @JwtAuthGuard()
  @Get('my-referred-users')
  async getMyReferredUsers(@Req() req: any) {
    return await this.referralService.getMyReferredUsers(req.user);
  }
}
