import React, { Component } from "react";
import PlaidLink from "react-plaid-link";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Mearchant from "./components/Merchant/Mearchant";
import Loader from "./components/Loader/Loader";
import Notification from "./components/Notification/Notification";

class Link extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleOnExit = this.handleOnExit.bind(this);
    this.handleOnSuccess = this.handleOnSuccess.bind(this);
    this.state = {
      transactions: [],
      transactionCategories: null,
      merchants: null,
      currentCategory: '',
      loading: false,
      error: false,
      showNotification: false,
      notificationMessage: ''
    }
  };
  handleSetState = (prop) => {
    this.setState(prop)
  }
  handleOnSuccess(public_token, metadata) {
    const headers = {
      Authorization: 'JWT ' + localStorage.getItem('token')
    }
    // send token to client server
    this.setState({ loading: true, error: false })
    axios.post("http://localhost:8000/core/link-bank-account/", {
      public_token: public_token
    }, { headers: headers })
      .then(res => {
        this.setState({
          loading: false, error: false,
          showNotification: true,
          notificationMessage: 'Bank account linked successful'
        })
        setTimeout(() => {
          this.setState({ showNotification: false, notificationMessage: '' })
        }, 5000)
      })
      .catch(err => {
        this.setState({
          loading: false, error: true,
          showNotification: true,
          notificationMessage: 'An error occured'
        })
        setTimeout(() => {
          this.setState({ showNotification: false, notificationMessage: '' })
        }, 5000)
      })
  }

  handleOnExit() {
    // handle the case when your user exits Link
    // For the sake of this tutorial, we're not going to be doing anything here.
  }

  handleClick(res) {
    this.setState({ loading: true, error: false })
    axios.get("http://localhost:8000/core/transactions/").then(res => {
      this.setState({ transactions: res.data, error: false, loading: false });
    })
      .catch(err => this.setState({ loading: true, error: true }))
  }
  componentDidMount() {
    this.setState({ loading: true, error: false })
    const headers = {
      Authorization: 'JWT ' + localStorage.getItem('token')
    }
    axios.get("http://localhost:8000/core/transaction-category/", { headers: headers })
      .then(res => {
        this.setState({
          transactionCategories: res.data,
          loading: false, error: false
        })
      })
      .catch(err => {
        this.setState({
          loading: false, error: true,
          showNotification: false, notificationMessage: 'An error occured'
        },

        )
        setTimeout(() => {
          this.setState({ showNotification: false, notificationMessage: '' })
        }, 5000)
      })
    this.merchantSearch();
  }
  merchantSearch = (category = null) => {
    this.setState({ loading: true, error: false })
    const headers = {
      Authorization: 'JWT ' + localStorage.getItem('token')
    }
    let url = "http://localhost:8000/core/stores-visited/?all=true";
    if (category) {
      url = "http://localhost:8000/core/stores-visited/?category=" + category;
    }
    axios.get(url, { headers: headers })
      .then(res => {
        this.setState({ merchants: res.data, loading: false, error: true })
      })
      .catch(err => {
        this.setState({
          loading: false, error: true, showNotification: true,
          notificationMessage: 'an error occured'
        })
        setTimeout(() => {
          this.setState({ showNotification: false, notificationMessage: '' })
        }, 5000);
      }
      )
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentCategory !== this.state.currentCategory) {
      if (this.state.currentCategory !== '') {
        this.merchantSearch(this.state.currentCategory);
      } else {
        this.merchantSearch();
      }
    }
  }
  render() {
    let categories = null;
    if (this.state.transactionCategories) {
      categories = this.state.transactionCategories.map((cat, i) => (
        <option key={i} value={cat.id}>{cat.title}</option>
      ))
    }
    return (
      <div>
        <h4>Hey {this.props.username}</h4>
        {!localStorage.getItem("token") ? <Redirect to='/login' /> : null}
        <Notification error={this.state.error}
          message={this.state.notificationMessage}
          show={this.state.showNotification} />
        <Loader show={this.state.loading} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="ExploreHeading">
            <span style={{ fontWeight: 'bolder' }} >Explore </span>
            <select onChange={e => this.setState({ currentCategory: e.target.value })}
              value={this.state.currentCategory}>
              <option value="" >All Category</option>
              {categories}
            </select>
          </div>
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
        <Mearchant result={this.state.merchants} />
        <p style={{ textAlign: 'center' }} >Top 10 merchants for all users on the platform</p>
      </div>
    );
  }
}

export default Link;