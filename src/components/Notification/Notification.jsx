import React from 'react';
import './Notification.css';


const Notification = props => (
    <div style={{transform: props.show?'translateY(0)':'translateY(-50vh)'}} className="Notification">
        <div style={{flex: 1, color: props.error?'red': 'green'}} >{props.message}</div>
    </div>
)


export default Notification;