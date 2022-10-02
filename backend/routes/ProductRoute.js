const express = require('express');
const { getAllProducts, createProduct, updateProducts, deleteProducts, getProductDetails } = require('../controllers/ProductController');
const { IsAuthenticated } = require('../middleware/auth');

const router = express.Router();

router.route('/product').get(IsAuthenticated, getAllProducts);
router.route('/product/new').post(createProduct);
router.route('/product/:id').patch(updateProducts).delete(deleteProducts).get(getProductDetails);


module.exports = router