import React, { Component } from 'react';
import './Login.css';


class Login extends Component {
    state = {
        username: '',
        password: '',
    }
    login = e => {
        e.preventDefault();
        const data = {
            user_name: this.state.username,
            password: this.state.password
        }
        // send to backend then save to local storage
    }
    render() {
        return(
            <div className="Login">
                <h4>LOGIN</h4>
                <form className="LoginForm" onSubmit={this.login} >
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

export default Login;