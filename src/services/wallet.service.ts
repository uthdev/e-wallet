import initiatePayment from "./payment.service";
import { Funding, Transaction, Wallet } from '../models'
import { TransactionType } from "../models/Transaction.model";
import NotFoundException from "../exceptions/NotFoundException";
// import { IWallet } from "models/wallet.model";
import NotAuthorizedException from "../exceptions/NotAuthorizedException";


class WalletService {
  static async fund (customerId: string, email: string, body: Record<any, string>) {
    const { reference, amount }: {reference: string, amount: string} = await initiatePayment(email, body);
    const funding = await Funding.create({
      customerId,
      amount,
      reference,
    });

    const userWallet = await Wallet.findOne({
      where: {
        customerId
      }
    });

    if (userWallet) {
      userWallet.balance += Number(amount);
      userWallet.save();
      return funding;
    } else {
      throw new NotFoundException('User does not have a wallet.');
    }
  }

  static async transfer(amount: number, accountNumber: number, customerId: string) {
    const wallet = await Wallet.findOne({
     customerId
    });
    console.log('sender', wallet)

    const receivingWallet = await Wallet.findOne({
      accountNumber
    });
    console.log('recipient', receivingWallet)

    if (!receivingWallet) {
      throw new NotFoundException(`Wallet ${accountNumber} not found`);
    } else if(!wallet) {
      throw new NotFoundException('You do not have a wallet')
    }

    if (wallet.balance >= amount) {
      wallet.balance -= amount;
      receivingWallet.balance += amount;

      await wallet.save();
      await receivingWallet.save();

      const transaction = new Transaction();
      transaction.amount = amount;
      transaction.sender = wallet.accountNumber;
      transaction.recipient = accountNumber;
      transaction.narration = `transfer_to_account: ${accountNumber}`;
      transaction.type = TransactionType.TRANSFER;
      await transaction.save();

      return {
        transaction
      };
    } else {
      throw new NotAuthorizedException('Insufficient fund in wallet');
    }
  }
}

export default WalletService;