let products = [];


const createProducts = (req, res) => {
    const product = req.body;
    console.log("Product", product);
    product.id = products.length;

    // adding current product in array
    products.push(product);

    return res.status(201).json({
        msg: "Product created successfully"
    })
}

const updateProduct = (req, res)=> {
    const productId = req.params.productId;
    const updatedProduct = req.body;

    if(productId < 0) {
        return res.status(400).json({
            msg: "Invalid product id"
        });
    }

    // if someone is trying to set a empty product value

    if(!updatedProduct) {
        return res.status(400).json({
            msg: "Invalid product data"
        });
    }

    // product id is the index 
    products[productId] = updatedProduct;

    return res.status(200).json({
        msg: "Product updated successfully"
    })
}

const getAllProduct = (req, res) => {
    return res.status(200).json({
        msg: "Product fetched successfully",
        data: { products}
    })
}

const deleteProduct = (req, res) =>{
    const productId = req.params.productId;

    if(productId < 0) {
        return res.status(400).json({
            msg: "Invalid product id"
        });
    }
    products.splice(productId, 1);

    return res.status(200).json({
        msg: "Product removed successfully"
    })
}

module.exports= {
    createProducts,
    getAllProduct,
    updateProduct,
    deleteProduct
}