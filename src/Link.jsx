import React, { Component } from "react";
import PlaidLink from "react-plaid-link";
import axios from "axios";

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
        <PlaidLink
          clientName="Bello Inc"
          env="sandbox"
          product={["auth", "transactions"]}
          publicKey="3707dc7847c12157f8b7694fc6bbfa"
          onExit={this.handleOnExit}
          onSuccess={this.handleOnSuccess}
          className="test"
        >
          Open Link and connect your bank!
        </PlaidLink>
        <div>
          <button onClick={this.handleClick}>Get Transactions</button>
        </div>
      </div>
    );
  }
}

export default Link;