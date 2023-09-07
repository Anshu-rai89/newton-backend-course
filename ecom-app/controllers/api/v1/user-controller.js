const _ = require('lodash');
const User = require('../../../Model/User');

const register = async (req, res) => {
    try{
       const {name, email, password} = req.body;
       if( _.isEmpty(name) || _.isEmpty(email) || _.isEmpty(password) || password.length < 6) {
            return res.status(400).json({
                msg: 'Invalid user data'
            })
       }

       // You need to check if a user with the email id already 
       // exist

       const existingUser = await User.findOne({email});

       if(existingUser) {
        return res.status(400).json({
            msg: 'User already registered'
        });
       }

       const user = await User.create({name, email, password});
       console.log("User registered", user.toObject({ virtuals: true }));

       return res.status(200).json(
        {
            msg: 'User Register successfully',
            data: user.id
        }
       )

    }catch(error) {
        console.log("Error", error);
        return res.status(500).json({
            msg: 'Internal server error'
        })
    }
}

const login = async (req, res) => {
    try{
       const {email, password} = req.body;

       if(_.isEmpty(email) || _.isEmpty(password)) {
            return res.status(400).json({
                msg: 'Invalid user data'
            })
       }

       // You need to check if a user with the email id already 
       // exist

       const existingUser = await User.findOne({email});

       if(_.isEmpty(existingUser)) {
        return res.status(400).json({
            msg: 'User is not registered'
        });
       }

       // Match the password
       if(existingUser.password !== password) {
        return res.status(400).json({
            msg: 'Password is incorrect'
        });
       }

       // Login User
       const token = {
        msg: `${existingUser.id}-secretToken`,
        id: existingUser.id
    }; // its random

       return res.status(200).json(
        {
            msg: 'User Login successfully',
            data: {
                token
            }
        }
    )

    }catch(error) {
        console.log("Error", error);
        return res.status(500).json({
            msg: 'Internal server error'
        })
    }
}

// Only logged in user can access this function
const getProfile = async (req, res) => {
    try{
        const user = await User.findById(req.body.user.id).select(['name', 'email', 'role', 'cart', 'order'])
        .populate(['cart','order']).populate({
        path: 'order',
        populate: {
          path: 'product',
          model: 'Product'
        }} ).exec();
        return res.status(200).json({
            msg: 'Profile fetched success',
            data: user
        });
    }catch(error) {
        console.log('Error', error);
        return res.status(500).json({msg: 'Internal server error'})
    }
}

const addToCart = async(req, res) => {
    try{

    const productId = req.params.id;
    const user = await User.findById(req.body.user.id);

    // add product id inside the cart of user
    user.cart.push(productId);

    // save the user
    await user.save();

    return res.status(200).json({
        msg:'Product added in cart',
        data: productId
    });

    }catch(error) {
        return res.status(500).json({
            msg:'Internal server error'
        })
    }
}

const getCart = async(req, res) => {
    try{
    const user = await User.findById(req.body.user.id).select(['cart', 'name']).populate('cart',['name', 'price', 'category', 'quantity']);

    return res.status(200).json({
        msg:'Product added in cart',
        data: user
    });

    }catch(error) {
        console.log('error', error);
        return res.status(500).json({
            msg:'Internal server error'
        })
    }
}

module.exports = {
    register,
    login,
    getProfile,
    addToCart,
    getCart
}


// db.products.aggregate([
//     {$match: {category: 'Electronics'}},
//     {$group: {_id: '$price', productCount: {$sum: 1}, totalQuantity: {$sum: '$quantity'}}},
//     {$sort: {totalQuantity : 1}}
// ]).pretty();

// db.person.aggregate([ {$match: {gender: 'female'}}])
// db.products.aggregate([
//    {$group: {
//         _id: '$price',
//         priceCount: {$sum: 1}
//     }
// }
// ]).pretty()

// db.products.aggregate([ 
//     { $group: 
//         { 
//             _id: '$price', 
//             avgQuantity: { $avg: '$quantity' }, 
//             maxQuantity: {$max: '$quantity'}, 
//             totalCount: {$sum: 1},
//             totalQuantity: {$sum: '$quantity'}
//         }
//     },
//     {
//         $sort: {totalQuantity : 1}
//     }

//     ] 
//     ).pretty()                                    


// // bulk insert

// db.products.insertMany([

//   {
//     name: 'Iphone',
//     price: 50000,
//     quantity: 2,
//     category: 'Electronics'
//   },
//   {
//     name: 'Rd sharma',
//     price: 500,
//     quantity: 2,
//     category: 'Book'
//   },
//   {
//     name: 'Rc mukherjee',
//     price: 200,
//     quantity: 20,
//     category: 'Book'
//   },
//   {
//     name: 'chair',
//     price: 500,
//     quantity: 12,
//     category: 'Funriture'
//   },
//   {
//     name: 'Washing machine',
//     price: 1200,
//     quantity: 12,
//     category: 'Electronics'
//   }
// ])

// db.products.aggregate([
//     {$project : {name: {$toUpper : {$concat : ['$name','-', 'product']}}, _id: 0, price: 1, quantity : 1, paidAmount: {$multiply : ['$price' , '$quantity'] }, }},
//     {$group: {_id: '$paidAmount', totalCount: {$sum: 1}}},
//     {$sort: {_id: 1}}
// ]).pretty();


// // $group -> It is used to group data based on a field 
// db.person.aggregate([
//     {$match: {gender: 'female'}},
//    { $group: {_id: '$dob.age', 
//     totalPersons: {$sum: 1}
// }},
// {$sort: {_id: 1}}
// ]).pretty();

// db.person.aggregate([
//     {$match: {gender: 'female'}},
//     {
//         $project: {_id: 0,name: {$concat: ['$name.title', ' ', '$name.first', '$name.last']},
//                     gender: 1, email: 1, age: '$dob.age',
//                     dob: {$toDate: '$dob.date'}}
//     },
//     {
//         $group: {_id: {$year : '$dob'}, noOfPersons: {$sum: 1}}
//     },
//     {
//         $sort: {_id: 1}
//     }
// ]).pretty();

// db.person.aggregate([
//     {$match: {'dob.age': {$gt: 30}}},
//     {
//         $project: {_id: 0,name: {$concat: ['$name.title', ' ', '$name.first', '$name.last']},
//                     gender: 1, email: 1, age: '$dob.age',
//                     dob: {$toDate: '$dob.date'}}
//     },
//     {
//         $sort: {age: 1}
//     },{
//         $skip: 6
//     },
//     {
//         $limit: 3
//     }
// ]).pretty();


// //$unwind

// db.arrayData.aggregate([
//     {$unwind: '$hobbies'},
//     {$group: {_id: '$hobbies', totalUsers: {$sum: 1}}}
// ])

// // store highest marks in examScore for user

// db.arrayData.aggregate([
//     {$unwind: '$examScores'},
//     {$project: {name: 1, _id: 0, age : 1, examScores: '$examScores.score'}},
//     {$group: {_id: '$name', examScores: {$max: '$examScores'}}}
// ]).pretty()


// bucket
// Users 
// Dashboard which can show the users in the buckets 
// How many users in each bucket 
// 0-20, 20-40- 40-60-60-80

// db.person.aggregate([
//     {
//         $bucketAuto: {
//             groupBy: '$dob.age',
//             buckets: 8,
//             output:{
//                 totalPersons: {$sum: 1}
//             }
//         }
//     }
// ]).pretty()