import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './schemas/transactions.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name: Transaction.name, schema: TransactionSchema},
    
    ]
    )],
  controllers:[],
  providers:[]
  
})
export class TransactionsModule {}
