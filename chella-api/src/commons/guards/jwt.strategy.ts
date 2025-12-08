import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const strategyOptions: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'hkjllkghgkjgkjgjghjghjghjghjghj', // TODO: move to env variable
    };
    super(strategyOptions);
  }

  async validate(payload: any) {
    const { exp, iat, nbf, sub, ...rest } = payload;
    console.log('🚀 ~ JwtStrategy ~ validate ~ rest:', rest);
    return rest;
  }
}
