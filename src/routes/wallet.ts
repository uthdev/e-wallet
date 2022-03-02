import { Router } from 'express';
import WalletController from '../controllers/wallet.controller';
import validationMiddleware from '../middleware/validation.middleware';
import authMiddleware from '../middleware/auth.middleware';
import FundAccountDto from '../dto/fund.dto';
import TransferDto from '../dto/transaction.dto';


const router = Router()

router.post('/', authMiddleware, WalletController.createWallet);
router.post('/fund-wallet', authMiddleware, validationMiddleware(FundAccountDto), WalletController.fundWallet);
router.post('/transfer', authMiddleware, validationMiddleware(TransferDto), WalletController.transferToWallet);
router.get('/transactions', authMiddleware, WalletController.getWalletTransactions);
router.get('/fundings', authMiddleware, WalletController.getWalletFundings);
router.get('/', authMiddleware, WalletController.getWallet);

export default router