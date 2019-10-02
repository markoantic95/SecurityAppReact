import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
const options = {
  position: 'bottom center',
  timeout: 3000,
  offset: '30px'
}
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      isAuthenticated: false
    }
  }
  render() {
    return (
      <AlertProvider template={AlertTemplate} {...options}>
        <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/register" component={Register} />
          </div>
        </Router>
      </AlertProvider>
    );

  }
}
export default App;
