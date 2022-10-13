import GlobalStyles from './styles/GlobalStyles';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
  useEffect(() => {
    window.addEventListener('resize', () => {
      setIsMobile(window.matchMedia('(max-width: 990px)').matches);
    })
  }, []);
  useEffect(() => {
    store.dispatch(Loaduser());
  }, []);

  const HandleLogout = () => {
    store.dispatch(Logoutuser());
    alert.success("Logout Successfully");
  }
  return (
    <Router>
      <GlobalStyles />
      <PageStyles>

        <Header open={open} setOpen={setOpen} isMobile={isMobile} isAuth={isAuthenticated} user={user} HandleLogout={HandleLogout} />

        {isMobile && <div className='slide-open' style={{ right: open.search && '0px' || open.cart && '0px' || open.menu && '0px' }} >
          {open.search && <SearchOpen />}
          {open.cart && <CartOpen isAuth={isAuthenticated} />}
          {open.menu && <MenuOpen isAuth={isAuthenticated} user={user} setOpen={setOpen} HandleLogout={HandleLogout} />}
        </div>}
        <Routes>
          <Route exact path='/' element={<LandingPage />}></Route>
          <Route path='/products' element={<ProductsPage />}></Route>
          <Route path='/products/:keyword' element={<ProductsPage />}></Route>
          <Route path='/product/:id' element={<ProductDetailsPage isAuth={isAuthenticated} />}></Route>
          <Route path='/login' element={<UserFormPage />}></Route>
          <Route path='/account' element={<UserPage user={user} HandleLogout={HandleLogout} isAuth={isAuthenticated} />}></Route>
          <Route path='/profile' element={isAuthenticated && <UserInfo user={user} />}></Route>
          <Route path='/profile/update' element={isAuthenticated && <ProfileUpdate />}></Route>
          <Route path='/password/update' element={isAuthenticated && <PasswordUpdate />}></Route>
          <Route path='/password/forgot' element={<ForgotPassword />}></Route>
          <Route path='/api/password/reset/:token' element={<ResetPassword />}></Route>

        </Routes>

        <PreFooter />
        <Footer />
      </PageStyles>
    </Router>
  );
}

export default App;