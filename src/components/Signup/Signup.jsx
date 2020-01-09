import React, { Component } from 'react';
import { Redirect } from "react-router-dom";


class Signup extends Component {

    render() {
        return(
            <div className="Login">
                {localStorage.getItem('token')?<Redirect to="/" />:null}
                <h4>SIGNUP</h4>
                <form className="LoginForm">
                    <div className="FormInput">
                        <p>Username</p>
                        <input required type="text" placeholder="username" />
                    </div>
                    <div className="FormInput">
                        <p>Email</p>
                        <input required type="text" placeholder="email" />
                    </div>
                    <div className="FormInput">
                        <p>Password</p>
                        <input required type="password" placeholder="password" />
                    </div>
                    <div className="FormInput">
                        <p>Confirm Password</p>
                        <input required type="password" placeholder="Confirm password" />
                    </div>
                    <div className="FormInput">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Signup;