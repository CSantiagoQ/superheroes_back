import { Router } from 'express';
import {
  addToCart,
  decrementCartItem,
  getCart,
  incrementCartItem,
  removeCartItem,
} from '../Controllers/cart.controller';
import { verifyToken } from '../Middlewares/auth.middleware';

const router = Router();

router.get('/', verifyToken, getCart);
router.post('/', verifyToken, addToCart);
router.put('/:heroId/increment', verifyToken, incrementCartItem);
router.put('/:heroId/decrement', verifyToken, decrementCartItem);
router.delete('/:heroId', verifyToken, removeCartItem);

export default router;
