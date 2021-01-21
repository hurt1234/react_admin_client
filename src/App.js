import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Admin from './pages/Admin'
import Login from './pages/Login'
export default class App extends Component {
  render() {
    return (
      <div>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/" component={Admin}/>
      </Switch>
      </div>
    )
  }
}
