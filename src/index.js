import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

import storageUtils from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils'
import App from './App';

memoryUtils.user = storageUtils.getUser()

//用BrowserRouter把App包裹起来，表示使用的是一个路由器
ReactDOM.render(
  <BrowserRouter>
   <App />
  </BrowserRouter>
,
  document.getElementById('root')
);

