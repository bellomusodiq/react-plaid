import React, { Fragment } from 'react';
import './Loader.css';


const Loader = props => (
    <Fragment>
        {props.show ? <div className="LoaderBackground"><div className="loader"></div></div>:null}
    </Fragment>
)

export default Loader;