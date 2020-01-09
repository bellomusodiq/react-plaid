import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Link from './Link';
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import SideNav from './components/SideNav/SideNav';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Backdrop from './components/SideNav/Backdrop';
import axios from 'axios';


class App extends Component {
  state = {
    showSideNav: false,
    username: '',
  }
  login = (e, username, password) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password
    }
    axios.post('http://localhost:8000/token-auth/', data)
      .then(res => {
        this.setState({ loading: false })
        localStorage.setItem('token', res.data.token)
        this.verifyLogin();
        this.props.history.replace('/')
      })
    // send to backend then save to local storage
  }
  componentDidMount() {
    // verify auth token then add username to state
    this.verifyLogin();
  }
  verifyLogin = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = {
        Authorization: 'JWT ' + token
      }
      axios.get("http://localhost:8000/core/current_user/", { headers: headers })
      .then(res => {
          this.setState({ username: res.data.username })
        })
    }
  }
  logout = () => {
    localStorage.removeItem("token");
    this.setState({ showSideNav: false, username: '' })
  }
  render() {
    return (
      <div className="App">
        <SideNav username={this.state.username} show={this.state.showSideNav} logout={this.logout}
          closeNav={() => this.setState({ showSideNav: false })} />
        <Backdrop show={this.state.showSideNav} closeNav={() => this.setState({ showSideNav: false })} />
        <div className="Main">
          <Header openNav={() => this.setState({ showSideNav: true })} />
          <Switch>
            <Route path='/login'
              component={() => <Login username={this.state.username}
                handleLogin={(e, username, password) => this.login(e, username, password)} />} />
            <Route path='/signup' component={Signup} />
            <Route path='/' component={() => <Link username={this.state.username} />} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default withRouter(App);