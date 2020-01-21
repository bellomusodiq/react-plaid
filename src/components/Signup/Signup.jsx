import React, { Component } from 'react';
import { Redirect, withRouter } from "react-router-dom";
import axios from 'axios';
import Notification from '../Notification/Notification';


class Signup extends Component {
    state = {
        username: '',
        password1: '',
        password2: '',
        email: '',
        loading: false,
        error: false,
        passwordError: false,
        showNotification: false,
        notificationMessage: '',
        errorMessages: null
    }
    signup = e => {
        e.preventDefault();
        this.setState({passwordError: false, error: false, errorMessages: null})
        const { username, password1, password2, email } = this.state;
        if (password1 !== password2) {
            this.setState({passwordError: true})
        } else {
            const data = {
                username: username,
                password: password1,
                email: email
            }
            axios.post("http://localhost:8000/core/signup/", data)
            .then(res => {
                this.setState({showNotification: true, 
                    notificationMessage: 'Account created successful, redirecting to Login', 
                    error: false})
                setTimeout(() => {
                    this.setState({showNotification: false, notificationMessage: ''})
                    this.props.history.replace('/login');
                }, 3000);
            })
            .catch(err => {
                this.setState({errorMessages: err.response.data, error: true,
                    showNotification: true, notificationMessage: 'An error occured'})
                setTimeout(() => {
                    this.setState({notificationMessage: '', showNotification: false})
                }, 5000);
            })
        }
    }
    render() {
        let usernameErrorMsg = null;
        let emailErrorMsg = null;
        let passwordErrorMsg = null;
        if (this.state.errorMessages) {
            if (this.state.errorMessages.username) {
                usernameErrorMsg = <p style={{color: 'tomato'}} >{this.state.errorMessages.username}</p>
            }
            if (this.state.errorMessages.email) {
                emailErrorMsg = <p style={{color: 'tomato'}}>{this.state.errorMessages.email}</p>;
            }
            if (this.state.errorMessages.password) {
                passwordErrorMsg = <p style={{color: 'tomato'}} >{this.state.errorMessages.password}</p>
            }
        }
        return(
            <div className="Login">
                {localStorage.getItem('token')?<Redirect to="/" />:null}
                <Notification show={this.state.showNotification}
                    error={this.state.error} message={this.state.notificationMessage} />
                <h4>SIGNUP</h4>
                <form onSubmit={this.signup} className="LoginForm">
                    <div className="FormInput">
                        <p>Username</p>
                        {usernameErrorMsg}
                        <input required value={this.state.username}
                        onChange={e => this.setState({username: e.target.value})}
                         type="text" placeholder="username" />
                    </div>
                    <div className="FormInput">
                        <p>Email</p>
                        {emailErrorMsg}
                        <input required value={this.state.email}
                        onChange={e => this.setState({email: e.target.value})}
                         type="text" placeholder="email" />
                    </div>
                    <div className="FormInput">
                        {passwordErrorMsg}
                        <p>Password</p>
                        <input required value={this.state.password1}
                        onChange={e => this.setState({password1: e.target.value})}
                         type="password" placeholder="password" />
                    </div>
                    {this.state.passwordError?<p style={{color: 'tomato'}}>Password does not match!</p>:null}
                    <div className="FormInput">
                        <p>Confirm Password</p>
                        <input required value={this.state.password2}
                        onChange={e => this.setState({password2: e.target.value})}
                         type="password" placeholder="Confirm password" />
                    </div>
                    <div className="FormInput">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(Signup);