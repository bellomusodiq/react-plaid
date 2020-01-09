import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Link from './Link';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SideNav from './components/SideNav/SideNav';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Backdrop from './components/SideNav/Backdrop';

class App extends Component {
  state = {
    showSideNav: false,
    username: '',
  }
  componentDidMount() {
    // verify auth token then add username to state
  }
  render() {
    return (
      <div className="App">
        <SideNav show={this.state.showSideNav} closeNav={() => this.setState({showSideNav: false})} />
        <Backdrop show={this.state.showSideNav} closeNav={() => this.setState({showSideNav: false})} />
        <div className="Main">
          <Header openNav={() => this.setState({showSideNav: true})} />
          <Router>
            <Switch>
              <Route path='/login' component={Login} />
              <Route path='/signup' component={Signup} />
              <Route path='/' component={Link} />
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
