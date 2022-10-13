import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import { Provider } from 'react-redux'
import store from './redux/store';
import { positions, transitions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'


const configs = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...configs}>
        <App />
      </AlertProvider>
    </Provider>
  </React.StrictMode>
);

