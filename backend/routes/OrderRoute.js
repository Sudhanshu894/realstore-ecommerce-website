const express = require('express');
const { CreateOrder, GetOneOrder, GetUserOrder, getAllOrders, updateOrder, deleteOrder } = require('../controllers/OrderController');
const router = express.Router();
const { IsAuthenticated, RolesBasedAuthorization } = require('../middleware/auth');



router.route('/order/new').post(IsAuthenticated, CreateOrder);
router.route('/orders/profile').get(IsAuthenticated, GetUserOrder);
router.route('/order/:id').get(IsAuthenticated, RolesBasedAuthorization("admin"), GetOneOrder);
router.route("/order/admin").get(IsAuthenticated, RolesBasedAuthorization("admin"), getAllOrders);
router.route("order/admin/:id").patch(IsAuthenticated, RolesBasedAuthorization("admin"), updateOrder).delete(IsAuthenticated, RolesBasedAuthorization("admin"), deleteOrder);





module.exports = router;