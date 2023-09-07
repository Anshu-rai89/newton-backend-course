const mongoose = require('mongoose');
const fs = require('fs');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, 'Hey why are you not passing name?'],
        minLength: [4, 'Minimum name of product should be 4 '],
        maxLength: [6, 'Maximum name of product should be 50']

    },
    price: {
        type: Number,
        required:[true, 'Hey why are you not passing price?'],
        min: [100, 'Minimum price of product should be 100 '],
        max: [10000, 'Maximum price of product should be 10000']
    },
    quantity: {
        type: Number,
        required:[true, 'Hey why are you not passing quantity?'],
        validate: {
            validator: function(v) {
                return v > 0;
            },
            message: props => `Minimum value of quantity should be 1. Got ${props.value}`
        }
    },
    category: {
        type: String,
        required: true,
        enum: {
            values: ['ELECTRONICS', 'CLOTH', 'FURNITURE', 'BOOK'],
            message: '{VALUE} is not supported as category value'
        }
    },
    discount: {
        type: String
    }
})

// MongoDB allow us to run a middleware before creation of doc 
// update , save, create
productSchema.pre('aggregate', function (next) {
    console.log('Before creating doc inside Query', this.pipeline());
    this.startTime = new Date();
    next();
});

// After creation of doc
productSchema.post('aggregate', function (doc, next) {
    console.log('After creating doc inside Query', doc);
    console.log('Execution time', new Date() - this.startTime);
    next();
});


const Product = mongoose.model('Product', productSchema);
module.exports = Product;