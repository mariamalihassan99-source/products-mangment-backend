const express = require('express');
const router = express.Router();
const Product = require('../modles/Product');
const controllers = require('../controllers/productControllers');
const validateObjectId = require('../middleware/objectvalidater');


//The /low-stock endpoint should return an array of objects of all the items that are quantity below 3
router.get('/low-stock', controllers.getLowStockProducts);
// The /statistics endpoint should return an object with the total number of products and the total quantity of all products
router.get('/statistics', controllers.getProductStatistics);


// Create a new product
router.post('/', controllers.createProduct);

// Get all products
router.get('/', controllers.getAllProducts);
// Get a single product by ID
router.get('/:id', validateObjectId, controllers.getProductById);
// Update a product by ID
router.put('/:id', validateObjectId, controllers.updateProduct);

// Delete a product by ID
router.delete('/:id', validateObjectId, controllers.deleteProduct);


module.exports = router;