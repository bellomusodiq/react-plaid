import React, { Component } from 'react';
import './Login.css';
import axios from 'axios';
import { Redirect, withRouter } from 'react-router-dom';


class Login extends Component {
    state = {
        username: '',
        password: '',
        loading: false
    }
    render() {
        return(
            <div className="Login">
                {this.props.username?<Redirect to="/" />:null}
                <h4>LOGIN</h4>
                <form className="LoginForm" onSubmit={(e) => this.props.handleLogin(e, this.state.username, this.state.password)} >
                    {this.props.error?<p style={{color: 'tomato'}}>Invalid username and or password</p>:null}
                    <div className="FormInput">
                        <p>Username</p>
                        <input required type="text" onChange={e => this.setState({username: e.target.value})}
                        value={this.state.username} placeholder="username" />
                    </div>
                    <div className="FormInput">
                        <p>Password</p>
                        <input required type="password" onChange={e => this.setState({password: e.target.value})}
                        value={this.state.password} placeholder="password" />
                    </div>
                    <div className="FormInput">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(Login);