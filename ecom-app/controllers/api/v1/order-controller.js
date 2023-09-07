
const Order = require('../../../Model/Order');
const User = require('../../../Model/User');
const mongoose = require('mongoose');
const createOrder = async (req, res) => {
    try{
    const {amount, address} = req.body;
    const productId = req.params.id;
    const userId = req.body.user.id;
    
    if(!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({
            msg: 'Invalid product id'
        })
    }

    if(!amount || !address || !productId) {
        return res.status(400).json({
            msg: 'Invalid product data'
        });
    }

    const user = await User.findById(userId);
    const order = await Order.create({user: userId, product: productId, amount, address});
    user.order.push(order);

    await user.save();
    return res.status(201).json({
        msg: "Order created successfully",
        data: order
    })
}catch(error) {
    if(error.name === 'ValidationError') {
        const errors= Object.values(error.errors).map(val => val.message);
        return res.status(400).json({
            msg: 'Validation error',
            data: errors
        });
    }

   return res.status(500).json({
    msg: 'Internal server error',
    data: []
   });
}
}

const getOrders = async (req, res) => {
    const userId = req.body.user.id;
    
    const orders = await User.findById(userId).select('order');

    return res.status(201).json({
        msg: "order fetched successfully",
        data: orders
    })
}

module.exports = {
    createOrder,
    getOrders
}