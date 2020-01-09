import React, {Component} from 'react';
import './SideNav.css';
import { NavLink } from "react-router-dom";

class SideNav extends Component {

    render () {
        return(
            <div className={this.props.show?"SideNav ShowSideNav":"SideNav"}>
                <h3>FLIP</h3>
                <NavLink exact={true} to='/' activeClassName="SideNavActive" 
                onClick={this.props.closeNav} className="SideNavItem">Feed</NavLink>
                <NavLink to='/explore' activeClassName="SideNavActive" 
                onClick={this.props.closeNav} className="SideNavItem">Explore</NavLink>
                <NavLink to='/lookup' activeClassName="SideNavActive" 
                onClick={this.props.closeNav} className="SideNavItem">Lookup</NavLink>
                {!this.props.username?<NavLink to='/login' activeClassName="SideNavActive" 
                onClick={this.props.closeNav} className="SideNavItem">Login</NavLink>:null}
                {!this.props.username?<NavLink to='/signup' activeClassName="SideNavActive" 
                onClick={this.props.closeNav} className="SideNavItem">Signup</NavLink>:null}
                {this.props.username?<div 
                onClick={this.props.logout} className="SideNavItem">Logout</div>:null}
            </div>
        )
    }
}

export default SideNav;