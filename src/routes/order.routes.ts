import { Router } from 'express';
import { checkout, getMyOrders } from '../Controllers/order.controller';
import { verifyToken } from '../Middlewares/auth.middleware';

const router = Router();

router.post('/checkout', verifyToken, checkout);
router.get('/', verifyToken, getMyOrders);

export default router;
