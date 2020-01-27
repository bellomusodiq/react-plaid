import React, { Fragment } from 'react';
import './Loader.css';


const Loader = props => (
    <Fragment>
        {props.show ? <div className="LoaderBackground">
            {props.link?
                <h4 style={{color: '#fff', marginBottom: 150}} >Flip is now linking your accounts - this may take a while</h4>
                :null}
            <div className="loader"></div>
        </div> : null}
    </Fragment>
)

export default Loader;