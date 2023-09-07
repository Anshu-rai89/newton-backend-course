const mongoose = require('mongoose');
const opts = { toJSON: { virtuals: true } }
const userSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        length: {min: 6, max: 8}
    },
    role: {
        type: String,
        required: true,
        enum: ['customer', 'admin', 'seller', 'delhivery_Agent'],
        default: 'customer'
    },
    cart: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Product'
    }],
    order: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Order'
    }],
    paymentMethod: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'PaymentMethod'
        }
    ],
    address: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Address'
        }
    ]
}, opts);

// Email domain of user
// anshu.rai@amazon.com -> amazon.com 
// anshu.rai@yahoo.com -> yahoo.com 
// anshu.rai@gmail.com -> gmail.com
// We need to compute the domain from email of user
// We are not going to store domain 
// Domain is a computed
// Virtual property -> To define virtual property on document
// 

userSchema.virtual('domain').get(function() {
    return this.email.slice(this.email.indexOf('@') + 1);
});

const User = mongoose.model('User', userSchema);

module.exports = User;