import React from 'react';


const Backdrop = props => (
    <div onClick={props.closeNav} 
    className={props.show?'Backdrop ShowBackdrop':'Backdrop'}></div>
)

export default Backdrop;