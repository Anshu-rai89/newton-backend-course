const express = require('express');
const router = express.Router();
const productController = require('../../../controllers/api/v1/product-controller');

router.get('/', productController.getAllProduct);
router.post('/', productController.createProducts);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;