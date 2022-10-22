import GlobalStyles from './styles/GlobalStyles';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from 'webfontloader';
import LandingPage from './pages/LandingPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ProductsPage from './pages/ProductsPage';
import UserFormPage from './pages/UserFormPage';
import UserPage from './pages/UserAccount';
import { useEffect, useState } from 'react';
import store from './redux/store'
import { Loaduser, Logoutuser } from './redux/UserRed/Actions';
import styled from 'styled-components'
import PreFooter from './components/Footer/PreFooter'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import SearchOpen from './components/Mobile/SearchOpen'
import CartOpen from './components/Mobile/CartOpen'
import MenuOpen from './components/Mobile/MenuOpen'
import { useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import UserInfo from './components/User/UserInfo';
import ProfileUpdate from './components/User/ProfileUpdate';
import PasswordUpdate from './components/User/PasswordUpdate';
import ForgotPassword from './components/User/ForgetPassword';
import ResetPassword from './components/User/ResetPassword';
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/CheckoutPage';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import Payment from './components/Cart/Payment';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ConfirmPay from './components/Cart/ConfirmPay';
import OrdersPage from './pages/OrdersPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import Dashboard from './components/Dashboard/Dashboard';
import AdminProductList from './components/Dashboard/ProductList';
import AdminProductUpdateForm from './components/Dashboard/ProductUpdateForm';
import AdminOrderList from './components/Dashboard/OrderList';
import AdminOrderUpdate from './components/Dashboard/OrderUpdate';
import AdminUserList from './components/Dashboard/UserList';
import AdminUserUpdate from './components/Dashboard/UserUpdate';
import AdminReviewList from './components/Dashboard/ReviewList';
import NotFound from './utils/NotFound';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';


const PageStyles = styled.div`
    width: 100vw;
    height: 100vh;
    .slide-open{
        position: fixed;
        top: 4rem;
        right: -700px;
        height: 100%;
        width: 450px;
        display: flex;
        justify-content: center;
        padding: 2rem;
        background-color: #FFF;
        transition: 0.5s ease-in-out;
        z-index: 100;

    }


    @media (max-width: 767px){
        .slide-open{
            width: 100vw;
        }
    }
`

function App() {
  const alert = useAlert();
  const [open, setOpen] = useState({ cart: false, search: false, menu: false });
  const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 990px)').matches);
  const { isAuthenticated, user } = useSelector(state => state.user);

  const [stripeapikey, setStripeapikey] = useState("");
  const getStriptkey = async () => {
    const { data } = await axios.get(`/api/stripeapikey`);
    setStripeapikey(data.stripekey);
  }
  useEffect(() => {

    WebFont.load({
      google: {
        families: ["Cuprum", "Oswald"]
      }
    })
    window.addEventListener('resize', () => {
      setIsMobile(window.matchMedia('(max-width: 990px)').matches);
    })
    store.dispatch(Loaduser());
    getStriptkey();

  }, []);
  window.addEventListener("contextmenu", (e) => e.preventDefault());

  const HandleLogout = () => {
    store.dispatch(Logoutuser());
    alert.success("Logout Successfully");
  }
  const HandleSideMenu = () => {
    setOpen({ search: false, cart: false, menu: false });
  }

  return (
    <Router>
      <GlobalStyles />


      <PageStyles>

        <Header open={open} setOpen={setOpen} isMobile={isMobile} isAuth={isAuthenticated} user={user} HandleLogout={HandleLogout} />

        {isMobile && <div className='slide-open' style={{ right: open.search && '0px' || open.cart && '0px' || open.menu && '0px' }} >
          {open.search && <SearchOpen HandleSideMenu={HandleSideMenu} />}
          {open.cart && <CartOpen isAuth={isAuthenticated} HandleSideMenu={HandleSideMenu} />}
          {open.menu && <MenuOpen isAuth={isAuthenticated} user={user} setOpen={setOpen} HandleLogout={HandleLogout} HandleSideMenu={HandleSideMenu} />}
        </div>}
        <Routes>
          <Route exact path='/' element={<LandingPage />}></Route>
          <Route path='/products' element={<ProductsPage />}></Route>
          <Route path='/products/:keyword' element={<ProductsPage />}></Route>
          <Route path='/product/:id' element={<ProductDetailsPage isAuth={isAuthenticated} />}></Route>
          <Route path='/login' element={<UserFormPage />}></Route>
          <Route path='/account' element={<UserPage user={user} HandleLogout={HandleLogout} isAuth={isAuthenticated} />}></Route>
          <Route path='/profile' element={isAuthenticated ? <UserInfo user={user} isAuth={isAuthenticated} /> : <UserFormPage />}></Route>
          <Route path='/profile/update' element={isAuthenticated ? <ProfileUpdate /> : <UserFormPage />}></Route>
          <Route path='/password/update' element={isAuthenticated ? <PasswordUpdate /> : <UserFormPage />}></Route>
          <Route path='/password/forgot' element={<ForgotPassword />}></Route>
          <Route path='/api/password/reset/:token' element={<ResetPassword />}></Route>
          <Route path='/cart' element={<CartPage isAuth={isAuthenticated} />}></Route>
          <Route path='/checkout' element={isAuthenticated ? <CheckoutPage /> : <UserFormPage />}></Route>
          <Route path='/order/confirm' element={isAuthenticated ? <ConfirmOrder /> : <UserFormPage />}></Route>
          {stripeapikey && <Route path='/payment' element={isAuthenticated ? <Elements stripe={loadStripe(stripeapikey)}>
            <Payment />
          </Elements> : <NotFound />}></Route>}
          <Route path='/orders/profile' element={isAuthenticated ? <OrdersPage /> : <UserFormPage />}></Route>
          <Route path='/order/:id' element={isAuthenticated ? <OrderDetailsPage /> : <UserFormPage />}></Route>
          <Route path='/dashboard' element={isAuthenticated && user?.role === "admin" ? <Dashboard user={user} /> : <NotFound />}></Route>
          <Route path='/admin/products' element={isAuthenticated && user?.role === "admin" ? <AdminProductList user={user} /> : <NotFound />}></Route>
          <Route path='/admin/orders' element={isAuthenticated && user?.role === "admin" ? <AdminOrderList user={user} /> : <NotFound />}></Route>
          <Route path='/admin/product/update/:id' element={isAuthenticated && user?.role === "admin" ? <AdminProductUpdateForm user={user} /> : <NotFound />}></Route>
          <Route path='/admin/order/update/:id' element={isAuthenticated && user?.role === "admin" ? <AdminOrderUpdate user={user} /> : <NotFound />}></Route>
          <Route path='/admin/users' element={isAuthenticated && user?.role === "admin" ? <AdminUserList user={user} /> : <NotFound />}></Route>
          <Route path='/admin/user/update/:id' element={isAuthenticated && user?.role === "admin" ? <AdminUserUpdate userdata={user} /> : <NotFound />}></Route>
          <Route path='/admin/reviews' element={isAuthenticated && user?.role === "admin" ? <AdminReviewList user={user} /> : <NotFound />}></Route>
          <Route path='/contact' element={<ContactPage />}></Route>
          <Route path='/about' element={<AboutPage />}></Route>
          <Route path='/success' element={isAuthenticated ? <ConfirmPay /> : <NotFound />}></Route>
          <Route path='/*' element={<NotFound />}></Route>
        </Routes>
        <PreFooter />
        <Footer />
      </PageStyles>
    </Router>
  );
}

export default App;