import { Router } from 'express'
// import verifyToken from '../middlewares/auth/token.middleware'
import TransactionController from '../controllers/transaction.controller';
// import validationMiddleware from '../middleware/validation.middleware'
import authMiddleware from '../middleware/auth.middleware';
// import permissions from '../middlewares/auth/role.middleware'

const router = Router()

// router.post('/transfer', authMiddleware, TransactionController.transfer)
// router.get('/', authMiddleware, TransactionController.getTransactions);
// router.get('/:id', authMiddleware, TransactionController.getTransaction);


export default router