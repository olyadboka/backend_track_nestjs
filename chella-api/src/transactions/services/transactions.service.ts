import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model, Types } from 'mongoose';
import { TransferDto } from '../dtos/transations.dto';
import { User } from 'src/users/schemas/users.schema';
import { TransactionResponse } from '../responses/transactions.response';
import { Transaction } from '../schemas/transactions.schema';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async makeTransfer(currentUser: any, transferDto: TransferDto) {
    //1. check if receiver exists
    const receiver = await this.userModel.findOne({
      username: transferDto.receiverUsername,
    });

    if (!receiver) {
      throw new BadRequestException('Receiver not found.');
    }

    //2. check if sender exists
    const sender = await this.userModel.findById(currentUser.id);
    console.log('sender', sender);

    if (!sender) {
      throw new BadRequestException('Sender not found.');
    }

    //3. prevent self transfer
    if (receiver._id.toString() === sender._id.toString()) {
      throw new BadRequestException('You cannot transfer to yourself.');
    }

    //4. check if sender has sufficient balance
    if (sender.totalEarned < transferDto.amount) {
      throw new BadRequestException('You have Insufficient balance.');
    }

    //5. deduct amount from sender
    sender.totalEarned -= transferDto.amount;
    await sender.save();

    //6. add amount to receiver
    receiver.totalEarned += transferDto.amount;
    await receiver.save();

    //7. creating transaction instance
    const newTransaction = await this.transactionModel.create({
      senderId: sender._id,
      receiverId: receiver._id,
      amount: transferDto.amount,
      status: 'COMPLETED',
      currency: 'ETB',
    });

    //8. saving
    const savedTransaction = await newTransaction.save();

    //9. returning using our interceptor response
    const response: TransactionResponse = {
      id: savedTransaction._id.toString(),
      senderFullName: sender.fullName,
      senderUsername: sender.username,
      receiverFullName: receiver.fullName,
      receiverUsername: receiver.username,
      amount: savedTransaction.amount,
      currency: savedTransaction.currency,
      status: savedTransaction.status,
      createdAt: savedTransaction.createdAt,
    };

    return response;
  }

  //fetch transaction history
  async getTransactionHistory(currentUser) {
    //1. fetch transactions where user is sender or receiver
    const transactions = await this.transactionModel
      .find({
        $or: [
          { senderId: new Types.ObjectId(currentUser.id) },
          { receiverId: new Types.ObjectId(currentUser.id) },
        ],
      })
      .populate('senderId', 'fullName username')
      .populate('receiverId', 'fullName username')
      .sort({ createdAt: -1 }); //lastest first

    console.log('transactions', transactions);

    // no transactions found
    if (transactions.length === 0) {
      return [];
    }

    //2. map transactions to our response interceptor
    const transactionResponses: TransactionResponse[] = transactions.map(
      (transaction) => {
        const sender = transaction.senderId as any;
        const receiver = transaction.receiverId as any;

        return {
          id: transaction._id.toString(),
          senderFullName: sender.fullName,
          senderUsername: sender.username,
          receiverFullName: receiver.fullName,
          receiverUsername: receiver.username,
          amount: transaction.amount,
          currency: transaction.currency,
          status: transaction.status,
          createdAt: transaction.createdAt,
        };
      },
    );
    return transactionResponses;
  }
}
