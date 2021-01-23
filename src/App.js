import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Admin from './pages/Admin'
import Login from './pages/Login'

import './App.css'
export default class App extends Component {
  render() {
    return (
      <div className="app">
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/" component={Admin}/>
      </Switch>
      </div>
    )
  }
}
