import { Router } from 'express';
import authRoutes from './modules/auth/auth.routes.js';
import userRoutes from './modules/users/user.routes.js';
import notificationRoutes from './modules/notification/notification.routes.js';
import reportRoutes from './modules/reports/reports.routes.js';
import couponsRoutes from './modules/coupons/coupons.routes.js';
import productRoutes from './modules/products/product.routes.js';
import fileRoutes from './modules/files/file.routes.js';
import ordersRoutes from './modules/orders/orders.routes.js';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/user', userRoutes);
routes.use('/notifications', notificationRoutes);
routes.use('/reports', reportRoutes);
routes.use('/coupons', couponsRoutes);
routes.use('/products', productRoutes);
routes.use('/files', fileRoutes);
routes.use('/orders', ordersRoutes);

export default routes;
