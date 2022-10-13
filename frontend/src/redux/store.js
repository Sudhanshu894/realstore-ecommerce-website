import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productDetailsReducer, ProductReducer } from './ProductRed/ProductReducer';
import { profileReducer, userReducer, forgetPasswordReducer } from './UserRed/UserReducers';

const reducer = combineReducers({
    products: ProductReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgetPasswordReducer,
});

let initialState = {};
const middlewares = [thunk];

const store = createStore(
    reducer, initialState, composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
