import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { HttpModule } from '@nestjs/axios';
import {
  ExchangeRate,
  ExchangeRateSchema,
} from './schema/exchange-rates.schema';
import { ExchangeRatesService } from './service/exchange-rates.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ExchangeRate.name, schema: ExchangeRateSchema },
    ]),
    HttpModule,
  ],
  controllers: [],
  providers: [ExchangeRatesService],
})
export class ExchangeRatesModule {}
