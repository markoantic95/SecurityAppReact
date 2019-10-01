import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser : null,
      isAuthenticated : false
    }
  }
  render() {
    return(
      <Router>
        <Route exact path = "/" component = {Login}/> 
        <Route path = "/home" component = {Home}/> 
        <Route path = "/register" component = {Register}/> 
      </Router>
    )

  }
}
export default App;
