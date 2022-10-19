const express = require('express');
const { CreateOrder, GetOneOrder, GetUserOrder, getAllOrders, updateOrder, deleteOrder } = require('../controllers/OrderController');
const router = express.Router();
const { IsAuthenticated, RolesBasedAuthorization } = require('../middleware/auth');



router.route('/order/new').post(IsAuthenticated, CreateOrder);
router.route('/orders/profile').get(IsAuthenticated, GetUserOrder);
router.route('/order/:id').get(IsAuthenticated, RolesBasedAuthorization("admin"), GetOneOrder);
router.route("/admin/orders").get(IsAuthenticated, RolesBasedAuthorization("admin"), getAllOrders);
router.route("/admin/order/:id").patch(IsAuthenticated, RolesBasedAuthorization("admin"), updateOrder).delete(IsAuthenticated, RolesBasedAuthorization("admin"), deleteOrder);





module.exports = router;