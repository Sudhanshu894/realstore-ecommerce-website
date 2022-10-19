const express = require('express');
const { getAllProducts, createProduct, updateProducts, deleteProducts, getProductDetails, CreateAndUpdateReview, GetProductRevies, DeleteReview, AdminAllProducts } = require('../controllers/ProductController');
const { IsAuthenticated, RolesBasedAuthorization } = require('../middleware/auth');

const router = express.Router();

router.route('/admin/products').get(IsAuthenticated, RolesBasedAuthorization("admin"), AdminAllProducts);
router.route('/product').get(getAllProducts);
router.route('/product/:id').get(getProductDetails);
router.route('/review').patch(IsAuthenticated, CreateAndUpdateReview);
router.route('/admin/reviews').get(GetProductRevies).delete(IsAuthenticated, DeleteReview);
router.route('/admin/product/new').post(IsAuthenticated, RolesBasedAuthorization("admin"), createProduct);
router.route('/admin/product/:id').patch(IsAuthenticated, RolesBasedAuthorization("admin"), updateProducts).delete(IsAuthenticated, RolesBasedAuthorization("admin"), deleteProducts);

module.exports = router