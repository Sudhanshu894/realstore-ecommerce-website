import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { newReviewReducer, productDetailsReducer, ProductReducer, newProductReducer, DeleteProductReducer } from './ProductRed/ProductReducer';
import { profileReducer, userReducer, forgetPasswordReducer, AllUsersReducers, UserDetailsReducer } from './UserRed/UserReducers';
import { cartReducer } from './CartRed/CartReducer';
import { myOrdersReducer, orderDetailsReducer, orderReducer, allOrdersReducer, newOrderReducer } from './OrderRed/OrderReducer';

const reducer = combineReducers({
    products: ProductReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgetPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product: DeleteProductReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    allUsers: AllUsersReducers,
    userDetails: UserDetailsReducer,
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : [],
    },

};
const middlewares = [thunk];

const store = createStore(
    reducer, initialState, composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
