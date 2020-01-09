import React, { Component } from "react";
import PlaidLink from "react-plaid-link";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Link extends Component {

  state = {
    transactions: []
  };

  handleOnSuccess(public_token, metadata) {
    // send token to client server
    axios.post("http://localhost:8000/core/link-bank-account/", {
      public_token: public_token
    });
  }

  handleOnExit() {
    // handle the case when your user exits Link
    // For the sake of this tutorial, we're not going to be doing anything here.
  }

  handleClick(res) {
    axios.get("http://localhost:8000/transactions").then(res => {
      this.setState({ transactions: res.data });
    });
  }

  render() {
    return (
      <div>
        <h4>Hey {this.props.username}</h4>
        {!localStorage.getItem("token") ? <Redirect to='/login' /> : null}
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

          <PlaidLink
            clientName="Bello Inc"
            env="sandbox"
            product={["auth", "transactions"]}
            publicKey="3707dc7847c12157f8b7694fc6bbfa"
            onExit={this.handleOnExit}
            onSuccess={this.handleOnSuccess}
            className="test"
          >
            Link your bank account
        </PlaidLink>
        {/* <button style={{marginTop: 10}} onClick={this.handleClick}>Get Transactions</button> */}
        </div>
        <div>
        </div>
      </div>
    );
  }
}

export default Link;