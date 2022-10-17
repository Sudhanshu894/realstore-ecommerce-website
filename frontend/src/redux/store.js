import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { newReviewReducer, productDetailsReducer, ProductReducer } from './ProductRed/ProductReducer';
import { profileReducer, userReducer, forgetPasswordReducer } from './UserRed/UserReducers';
import { cartReducer } from './CartRed/CartReducer';
import { myOrdersReducer, orderDetailsReducer, orderReducer } from './OrderRed/OrderReducer';

const reducer = combineReducers({
    products: ProductReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgetPasswordReducer,
    cart: cartReducer,
    newOrder: orderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
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
