import { Router } from 'express'
// import verifyToken from '../middlewares/auth/token.middleware'
import WalletController from '../controllers/wallet.controller';
// import validationMiddleware from '../middleware/validation.middleware'
import authMiddleware from '../middleware/auth.middleware';
// import permissions from '../middlewares/auth/role.middleware'

const router = Router()
// router.post('/Wallets/',
//   verifyToken.verify,
//   permissions.adminOnly,
//   validate.validateBody(validate.schemas.createWalletSchema),
//   WalletController.addWallet)
router.post('/', authMiddleware, WalletController.createWallet)
router.get('/', authMiddleware, WalletController.getWallets);
router.get('/:id', authMiddleware, WalletController.getWallet);
// router.patch('/:id',
//   authMiddleware, authorizeAdmin,
//   validationMiddleware(WalletDto),
//   WalletController.editWallet)
// router.delete('/:id',
//   authMiddleware, authorizeAdmin,
//   WalletController.deleteWallet)

export default router