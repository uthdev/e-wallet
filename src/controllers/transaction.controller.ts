import { Request, Response, NextFunction } from 'express';
import {
  Wallet
} from '../models';
import generateAccountNumber from '../helpers/generateAccountNumber'
import RequestWithUser from '../interfaces/requestWithUser.interface';
// import transferService from '../services/transfer.service';

class TransactionController {

  static async transferFund(request: RequestWithUser, response: Response, next: NextFunction) {
    try {
      const customerId = request.user?._id;
      const accountNumber = generateAccountNumber()
      const newWallet = new Wallet({ accountNumber, customerId});
      const wallet = await newWallet.save();
      return response.status(201).json({
        status: 'success',
        data: wallet
      })
    } catch(error) {
      next(error);
    }
  }

  // static async transferToWallet(request: Request, response: Response, next: NextFunction) {
  //   try {
  //     const customerId = request.id;
  //     const transfer = await transferService(request.body.amount, request.body.accountNumber, customerId);
  //     return handleSuccessResponse(response, transfer, 201);
  //   } catch (error) {
  //     next(error)
  //   }
  // }


  static async getTransaction(request: RequestWithUser, response: Response, next: NextFunction) {
    try {
      const customerId = request.user?._id;
      const walletId = request.params?.id
      const wallet = await Wallet.findOne({
        where: {
          customerId, _id: walletId
        }
      });
      return response.status(200).json({
        status: 'success',
        data: wallet
      })
    } catch (error) {
      next(error)
    }
  }

  static async getTransactions(request: RequestWithUser, response: Response, next: NextFunction) {
    try {
      const customerId = request.user?._id;
      const wallets = await Wallet.find({
        where: {
          customerId
        }
      });
      return response.status(200).json({
        status: 'success',
        data: wallets
      })
    } catch (error) {
      next(error)
    }
  }


  // static async getWalletTransactions(request: Request, response: Response, next: NextFunction) {
  //   try {
  //     const {
  //       accountNumber
  //     } = request.params;
  //     const transactions = await Transaction.findAll({
  //       where: {
  //         accountNumber
  //       }
  //     });
  //     return handleSuccessResponse(response, transactions, 200);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}

export default TransactionController;