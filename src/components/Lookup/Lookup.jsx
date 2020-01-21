import React, { Component, Fragment } from 'react';
import './Lookup.css';
import Merchant from '../Merchant/Mearchant';
import axios from 'axios';
import Loader from '../Loader/Loader';
import Notification from '../Notification/Notification';


class Lookup extends Component {
    state = {
        userQuery: '',
        merchants: null,
        transactionCategories: null,
        currentCategory: '',
        loading: false,
        error: true,
        showNotification: false,
        notificationMessage: 'this month',
        months: ["this month", "last month", "3months", "12months", "all"],
        month: "this month"
    }
    componentDidMount() {
        const headers = {
            Authorization: 'JWT ' + localStorage.getItem('token')
        }
        axios.get("http://localhost:8000/core/transaction-category/", { headers: headers })
            .then(res => {
                this.setState({ transactionCategories: res.data })
            })
        this.searchMerchant();
    }
    searchMerchant = (category = null) => {
        this.setState({ loading: true })
        const headers = {
            Authorization: 'JWT ' + localStorage.getItem('token')
        }
        let url = "http://localhost:8000/core/stores-visited/?all=true";
        if (this.state.userQuery !== '') {
            url = "http://localhost:8000/core/stores-visited/?username=" + this.state.userQuery;
        } 
        if (this.state.currentCategory !== '') {
            url = "http://localhost:8000/core/stores-visited/?category=" + category;
        }
        if ((this.state.currentCategory !== '') && (this.state.userQuery !== '')) {
            url = "http://localhost:8000/core/stores-visited/?username=" + this.state.userQuery + "&category=" + category;
        }
        axios.get(url, { headers: headers })
            .then(res => {
                this.setState({ merchants: res.data, loading: false, error: false })
            })
            .catch(err => {
                this.setState({ loading: false, error: true })
                setTimeout(() => {
                    this.setState({ showNotification: false, notificationMessage: '' })
                }, 5000);
            })
    }
    searchUserMerchant = e => {
        e.preventDefault();
        this.searchMerchant();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.currentCategory !== this.state.currentCategory) {
            if (this.state.currentCategory !== '') {
                this.searchMerchant(this.state.currentCategory);
            } else {
                this.searchMerchant();
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
            <div className="Lookup">
                <Loader show={this.state.loading} />
                <Notification show={this.state.showNotification}
                    message={this.state.notificationMessage} error={this.state.error} />
                <form onSubmit={this.searchUserMerchant} className="LookupHeader">
                    <span>Lookup</span>
                    <input type="text" value={this.state.userQuery}
                        placeholder="Search Users"
                        onChange={e => this.setState({ userQuery: e.target.value })} />
                </form>
                <div className="CategoryMonth">
                    <div>
                        <span>{this.state.userQuery !== '' ? this.state.userQuery : 'All'} Favorite</span>
                        <select style={{ marginLeft: 5 }} onChange={e => this.setState({ currentCategory: e.target.value })}
                            value={this.state.currentCategory}>
                            <option value="">All Category</option>
                            {categories}
                        </select>
                    </div>

                </div>
                <Merchant result={this.state.merchants} />
            </div>
        )
    }
}


export default Lookup;