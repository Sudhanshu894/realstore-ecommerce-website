import GlobalStyles from './styles/GlobalStyles';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ProductsPage from './pages/ProductsPage';

function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route index element={<LandingPage />}></Route>
        <Route path='/products' element={<ProductsPage />}></Route>
        <Route path='/products/:keyword' element={<ProductsPage />}></Route>
        <Route path='/product/:id' element={<ProductDetailsPage />}></Route>
        <Route path='/signin' element={"Signin"}></Route>
        <Route path='/signup' element={"Signup"}></Route>
      </Routes>
    </>
  );
}

export default App;
