import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

import App from './App';

//用BrowserRouter把App包裹起来，表示使用的是一个路由器
ReactDOM.render(
  <BrowserRouter>
   <App />
  </BrowserRouter>
,
  document.getElementById('root')
);

