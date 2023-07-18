import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {Provider}  from 'react-redux'
import store from './redux/store'
import App from './App';
import style from './index.css'

render(
  <div className={style}>
   <React.StrictMode>
    <Provider store={store}>
     <BrowserRouter>
      <App />
     </BrowserRouter>
    </Provider>
   </React.StrictMode>
  </div>,
  document.getElementById('root')
);
