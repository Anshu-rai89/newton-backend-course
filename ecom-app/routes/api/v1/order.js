const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../../../middleware')
const orderController = require('../../../controllers/api/v1/order-controller');

router.get('/', isLoggedIn, orderController.getOrders);
router.post('/:id', isLoggedIn, orderController.createOrder);

module.exports = router;