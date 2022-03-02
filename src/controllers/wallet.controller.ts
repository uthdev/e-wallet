import { Request, Response, NextFunction } from 'express';
import {
  Funding,
  Transaction,
  Wallet
} from '../models';
import generateAccountNumber from '../helpers/generateAccountNumber'
import RequestWithUser from '../interfaces/requestWithUser.interface';
import WalletService from '../services/wallet.service';
import ResourceExistsException from '../exceptions/ResourceExitsException';
import { ObjectId } from 'mongoose/node_modules/mongodb';


class WalletController {

  static async createWallet(request: RequestWithUser, response: Response, next: NextFunction) {
    try {
      const customerId = request.user?._id;
      const hasWallet = await Wallet.findOne({
        customerId
      });
      if(hasWallet) {
        throw new ResourceExistsException('User already has a wallet')
      }
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

  static async transferToWallet(request: RequestWithUser, response: Response, next: NextFunction) {
    try {
      const customerId = request.user?._id;
      const { amount, accountNumber } = request.body;
      const { transaction } = await WalletService.transfer(Number(amount), accountNumber, customerId);
      return response.status(201).json({
        status: 'success',
        data: transaction,
      });
    } catch (error) {
      next(error)
    }
  }


  static async getWallet(request: RequestWithUser, response: Response, next: NextFunction) {
    try {
      const customerId = request.user?._id;
      // const walletId = request.params?.id
      const wallet = await Wallet.findOne({
        customerId
      });
      return response.status(200).json({
        status: 'success',
        data: wallet
      })
    } catch (error) {
      next(error)
    }
  }

  static async fundWallet (request: RequestWithUser, response: Response, next: NextFunction) {
    try {
      const customerId = request.user?._id;
      const email = <string>request.user?.email
      const funding = await WalletService.fund(customerId, email, request.body);
      return response.status(201).json({
        status: 'success',
        data: funding,
      })
    } catch (error) {
      next(error);
    }
  }
  


  static async getWalletTransactions(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        accountNumber
      } = request.params;
      const transactions = await Transaction.find({
        where: {
          $or: [
            {sender: accountNumber},
            {recipient: accountNumber},
          ]
        }
      });
      return response.status(200).json({
        status: 'success',
        data: transactions
      })
    } catch (error) {
      next(error);
    }
  }

  static async getWalletFundings(request: RequestWithUser, response: Response, next: NextFunction) {
    try {
      const customerId = request.user?._id;
      const transactions = await Funding.find({
          customerId: new ObjectId(customerId)
      });
      return response.status(200).json({
        status: 'success',
        data: transactions
      })
    } catch (error) {
      next(error);
    }
  }
}

export default WalletController;