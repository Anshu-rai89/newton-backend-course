const Product = require('../../../Model/Product');
const mongoose = require('mongoose');

const createProducts = async (req, res, next) => {
    try{
    const {name, quantity, category, price} = req.body;

    const product = {
        name,
        quantity,
        price,
        category,
        discount: req.body.discount
    };

    const item = await Product.create(product);

    return res.status(201).json({
        msg: "Product created successfully",
        data: item
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

const updateProduct = async (req, res)=> {
    const productId = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({
            msg: 'Invalid product id'
        })
    }
    const {name, quantity, category, discount, price} = req.body;
     
    const existingProduct = await Product.findById(productId);

    if(!existingProduct) {
        return res.status(400).json({
            msg: 'Invalid product id'
        });
    }


    existingProduct.name = name;
    existingProduct.price = price;
    existingProduct.quantity = quantity;
    existingProduct.category = category;
    existingProduct.discount = discount;

    await existingProduct.save();

    return res.status(200).json({
        msg: "Product updated successfully"
    })
}

const getAllProduct =async (req, res) => {
     
    let filterCondition = {};
    const filter_type = req.query.filter_type;
    const PAGE_SIZE =req.query.pageSize ? Number(req.query.pageSize): 3;
    const PAGE_No =req.query.pageNo? Number(req.query.pageNo): 1;
    const SKIP_COUNT = (PAGE_No - 1) * PAGE_SIZE;

    if(filter_type === 'price') {
        const minValue = req.query.min ? Number(req.query.min): 0;
        const maxValue = req.query.max ? Number(req.query.max): 1000000;
        filterCondition = {$and : [{price: {$gte: minValue}}, {price: {$lte : maxValue}}]};
    }

    if(filter_type === 'name') {
        const filterValue = req.query.filter_value;
        if(filterValue) {
            filterCondition = {name: filterValue};
        } 
    }
    

    // Write a query to find all products where category is either 
    // Electronics or cloth

    if(filter_type === 'or') {
       // filterCondition = {$or : [{category: {$eq: 'Electronics'}}, {category: {$eq : 'Electronics'}}]};
       filterCondition = {category: {$in : ['Electronics','Furniture']}};
    }

    if(filter_type === 'not') {
        // filterCondition = {$or : [{category: {$eq: 'Electronics'}}, {category: {$eq : 'Electronics'}}]};
        filterCondition = {category: {$ne : req.query.filter_value}};
     }

     // pageNo is 1 page size is 3
     // skipDocument (pageNumber-1 * pageSize) // 2
    // We need to filter products by category
    const products = await Product.aggregate([
        {$match: filterCondition},
        {$sort: {price: 1}},
        {$skip: SKIP_COUNT},
        {$limit: PAGE_SIZE}
    ]);

   // const products = await Product.find();
    return res.status(200).json({
        msg: "Product fetched successfully",
        data: { products}
    })
}

const deleteProduct = async (req, res) =>{
   
    // lets check if a product with given product id exists or not
    const product = await Product.findById(req.params.id);

    if(!product) {
        return res.status(400).json({
            msg: 'Invalid product id'
        })
    }

      await Product.findByIdAndDelete(req.params.id);
     //await Product.deleteOne({_id: ObjectId(req.params.id)});

     return res.status(200).json({
        msg: 'Product delete success'
     })
}

module.exports= {
    createProducts,
    getAllProduct,
    updateProduct,
    deleteProduct
}