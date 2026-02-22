import { Body, Controller, Get, Injectable, Post, Req } from '@nestjs/common';
import { TransactionsService } from '../services/transactions.service';
import { JwtAuthGuard } from '../../commons/guards/jwtauth.guard';
import { TransferDto } from '../dtos/transations.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @JwtAuthGuard()
  @Post('transfer')
  async makeTransfer(@Req() req: any, @Body() transferDto: TransferDto) {
    const result = await this.transactionsService.makeTransfer(
      req.user,
      transferDto,
    );
    return result;
  }

  @JwtAuthGuard()
  @Get('transaction-history')
  async getTransactionHistory(@Req() req: any) {
    const result = await this.transactionsService.getTransactionHistory(
      req.user,
    );
    return result;
  }
}
