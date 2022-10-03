const express = require('express');
const { getAllProducts, createProduct, updateProducts, deleteProducts, getProductDetails, CreateAndUpdateReview, GetProductRevies, DeleteReview } = require('../controllers/ProductController');
const { IsAuthenticated, RolesBasedAuthorization } = require('../middleware/auth');

const router = express.Router();

router.route('/product').get(IsAuthenticated, getAllProducts);
router.route('/review').patch(IsAuthenticated, CreateAndUpdateReview);
router.route('/reviews').get(GetProductRevies).delete(IsAuthenticated, DeleteReview);
router.route('/admin/product/new').post(IsAuthenticated, RolesBasedAuthorization("admin"), createProduct);
router.route('/admin/product/:id').patch(IsAuthenticated, RolesBasedAuthorization("admin"), updateProducts).delete(IsAuthenticated, RolesBasedAuthorization("admin"), deleteProducts);
router.route('/product/:id').get(getProductDetails);

module.exports = router