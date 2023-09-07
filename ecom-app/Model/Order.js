const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    product: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Product',
        validate: {
            validator: function(v) {
                return mongoose.Types.ObjectId.isValid(v);
            },
            message: props => `${props.value} is invalid product id`
        }
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'CREATED',
        enum: ['CREATED', 'PAYMENT_INITIATED', 'PAYMENT_FAILED','DELHIVERY_INITIATED', 'DELIVERED', 'RETURNED', 'FAILED']
    },
    paymentMethod: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Product'
    },
    address: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Address'
    }
}, {timestamps: true});

const Order = mongoose.model('Order', orderSchema);

module.exports= Order;