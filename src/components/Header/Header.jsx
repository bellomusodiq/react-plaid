import React from 'react';
import './Header.css';

const Header = props => (
    <div className="Header">
        <div onClick={props.openNav} className="MenuBtn">
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div className="Logo">
            <div>FLIP</div>
        </div>
    </div>
)

export default Header;