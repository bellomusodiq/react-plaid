import React from 'react';
import './Merchant.css'


const Merchant = props => {
    let merchantResult = null;
    if (props.result) {
        merchantResult = props.result.map((res, i) => (
            <div key={i} className="MerchantBody" style={{ background: i % 2 === 0 ? 'rgb(249, 249, 249)' : 'rgb(201, 239, 253)' }} >
                <span style={{ width: '100px' }} >{i + 1}</span>
                <span style={{ width: '350px' }}>{res.name}</span>
                <span style={{ width: '100px' }} >{res.visit_count}</span>
                <span style={{ width: '200px' }} >{res.categories.join(",")}</span>
            </div>
        ))
    }
    return (
        <div className="MerchantResult">
            <h3 style={{textAlign: 'center'}} >{props.title}</h3>
            <div className="MerchantHeader">
                <span style={{ width: '100px' }} >Rank</span>
                <span style={{ width: '350px' }}>Merchant</span>
                <span style={{ width: '100px' }} >Visits</span>
                <span style={{ width: '200px' }} >Category(ies)</span>
            </div>
            <hr />
            {merchantResult}
        </div>
    )
}

export default Merchant;