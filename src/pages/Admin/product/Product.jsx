import React, { Component } from 'react'
import { Switch,Route, Redirect } from 'react-router-dom'

import Home from './home'
import Add from './add'
import Detail from './detail'
import './product.less'
export default class Product extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/product" component={Home} exact></Route>
          <Route path="/product/add" component={Add} exact></Route>
          <Route path="/product/detail" component={Detail} exact></Route>
          <Redirect to="/product"></Redirect>
        </Switch>
      </div>
    )
  }
}
