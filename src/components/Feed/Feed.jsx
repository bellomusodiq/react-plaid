import React, { Component, Fragment } from 'react';
import './Feed.css';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader/Loader';
import Notification from '../Notification/Notification';


class Feed extends Component {
    state = {
        transactions: null,
        loading: false,
        error: false,
        showNotification: false,
        notificationMessage: '',
        months: ["this month", "last month", "3months", "12months", "all"],
        month: "this month",
        transactionCategories: null,
        currentCategory: ""
    }
    componentDidMount() {
        const headers = {
            Authorization: 'JWT ' + localStorage.getItem('token')
        }
        axios.get("http://localhost:8000/core/transaction-category/", { headers: headers })
            .then(res => {
                this.setState({ transactionCategories: res.data })
            })
        this.searchTransaction()
    }
    searchTransaction = (_=null, url = null) => {
        this.setState({ loading: true, error: false, showNotification: false, notificationMessage: '' })
        const headers = {
            Authorization: 'JWT ' + localStorage.getItem("token")
        }
        let reqUrl = "http://localhost:8000/core/transactions/?month=this month";
        if (this.state.currentCategory !== "") {
            reqUrl = "http://localhost:8000/core/transactions/?month="+this.state.month+"&category="+this.state.currentCategory;
        } 
        if (url) {
            reqUrl = url;
        }
        axios.get(reqUrl, { headers: headers })
            .then(res => {
                this.setState({ transactions: res.data, loading: false, error: false })
            })
            .catch(err => {
                this.setState({
                    loading: false, error: true,
                    showNotification: true, notificationMessage: 'An error occured'
                })
                setTimeout(() => {
                    this.setState({ showNotification: false, notificationMessage: '' })
                }, 5000);
            });
    }
    componentDidUpdate(prevProps, prevState) {
        if ((prevState.month !== this.state.month) || (prevState.currentCategory !== this.state.currentCategory)) {
            this.searchTransaction();
        }
    }
    render() {
        let transactions = null;
        if (this.state.transactions) {
            transactions = this.state.transactions.results.map((transaction, index) => {
                const categories = transaction.cats.map((cat, i) => (
                    <span style={{ marginRight: 5 }} >{cat.title}{i !== (transaction.cats.length - 1) ? ',' : null}</span>
                ))
                return (
                    <div key={transaction.transaction_id}
                        className="MerchantBody" style={{ background: index % 2 === 0 ? 'rgb(249, 249, 249)' : 'rgb(201, 239, 253)' }}>
                        <span style={{ width: '200px' }} className="">
                            {transaction.username}
                        </span>
                        <span style={{ width: '500px' }} className="">
                            {transaction.store_title}
                        </span>
                        <span style={{ width: '300px' }} className="">
                            {categories}
                        </span>
                    </div>
                )
            }
            )
        }
        let categorySelect = null;
        if (this.state.transactionCategories) {
            categorySelect = this.state.transactionCategories.map((cat, i) => (
                <option key={i} value={cat.id}>{cat.title}</option>
            ))
        }
        const months = this.state.months.map((m, i) => (
            <option key={i} value={m} >{m}</option>
        ))
        return (
            <div className="Feed">
                {this.props.username ? null : <Redirect to='/login' />}
                <Loader show={this.state.loading} error={this.state.error}
                    message={this.state.notificationMessage} />
                <Notification
                    show={this.state.showNotification}
                    message={this.state.notificationMessage}
                    error={this.state.error}
                />
                <h3>Hey {this.props.username}</h3>
                <div className="CategoryMonth">
                    <div>
                        <select style={{ marginLeft: 5 }} onChange={e => this.setState({ currentCategory: e.target.value })}
                            value={this.state.currentCategory}>
                            <option value="">All Category</option>
                            {categorySelect}
                        </select>
                    </div>

                    <div style={{ marginLeft: 5 }}>
                        <select onChange={e => this.setState({ month: e.target.value })}
                            value={this.state.month}>
                            {months}
                        </select>
                    </div>
                </div>
                <div style={{ paddingLeft: 10 }} className="MerchantResult">
                    <div className="MerchantHeader">
                        <span style={{ width: '200px' }} className="">
                            Username
                        </span>
                        <span style={{ width: '500px' }} className="">
                            Merchant Name
                        </span>
                        <span style={{ width: '300px' }} className="">
                            Category(ies)
                        </span>
                    </div>
                </div>
                <hr />
                {transactions}
                <div className="PreviousNext">
                    {this.state.transactions ?
                        <Fragment>
                            <button onClick={() => this.searchTransaction(null, this.state.transactions.previous)}
                                disabled={!this.state.transactions.previous}
                                className="Previous">Previous</button>
                            <button onClick={() => this.searchTransaction(null, this.state.transactions.next)}
                                disabled={!this.state.transactions.next}
                                className="Next">Next</button>
                        </Fragment> : null
                    }
                </div>
            </div>
        )
    }
}


export default Feed;