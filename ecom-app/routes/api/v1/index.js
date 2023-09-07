const express = require('express');
const router = express.Router();
const productRoutes = require('./product');
const userRoutes = require('./user');
const orderRouter = require('./order')

router.use('/product', productRoutes);
router.use('/user', userRoutes);
router.use('/order', orderRouter);

module.exports = router;