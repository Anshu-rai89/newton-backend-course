const mongoose = require('mongoose');
const initDB = async()=> {
    try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    }catch(error) {
        console.log('Error connectiong to DB', error);
    }
}

module.exports={
    initDB
}