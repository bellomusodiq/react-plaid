import React, {Component} from 'react';
import './SideNav.css';
import Backdrop from './Backdrop';


class SideNav extends Component {

    render () {
        return(
            <div className={this.props.show?"SideNav ShowSideNav":"SideNav"}>
                <h3>FLIP</h3>
                <div onClick={this.props.closeNav} className="SideNavItem">Feed</div>
                <div onClick={this.props.closeNav} className="SideNavItem">Explore</div>
                <div onClick={this.props.closeNav} className="SideNavItem">Lookup</div>
                <div onClick={this.props.closeNav} className="SideNavItem">Login</div>
                <div onClick={this.props.closeNav} className="SideNavItem">Signup</div>
                <div onClick={this.props.closeNav} className="SideNavItem">Logout</div>
            </div>
        )
    }
}

export default SideNav;