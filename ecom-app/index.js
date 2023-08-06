const express = require('express');
const dotEnv = require('dotenv');
dotEnv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.urlencoded());

const {
    createProducts,
    getAllProduct,
    updateProduct,
    deleteProduct
} = require('./controllers/product-controller');
// CREATE CRUD APIS for product 

// API to get app products
app.get('/api/v1/product' , getAllProduct)

// API to create a product

app.post('/api/v1/product', createProducts)
// API to update a product

app.put('/api/v1/product/:productId', updateProduct);

app.delete('/api/v1/product/:productId', deleteProduct)
// API to delete a product


// Start the server
app.listen(PORT, (err)=> {
    if(err) {
        console.log('Error while starting server', err);
    }

    console.log("Server is Up and Running on port", PORT);
})