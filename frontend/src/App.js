import GlobalStyles from './styles/GlobalStyles';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route index element={<LandingPage />}></Route>
        <Route path='/product' element={"Prouducts"}></Route>
        <Route path='/product/:id' element={"Single Product"}></Route>
        <Route path='/signin' element={"Signin"}></Route>
        <Route path='/signup' element={"Signup"}></Route>
      </Routes>
    </>
  );
}

export default App;
