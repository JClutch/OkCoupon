import React from 'react';

/**
 * A counter button: tap the button to increase the count.
 */
const CouponCard = (props) => {
  return (
      <div className="card mx-auto text-center" style={{"height": "75%", "width": "75%"}}>
        <img className="card-img-top" src={props.image} alt="Card image cap"></img>
        <div className="card-body">
          <h5 className="card-title">{props.merchant}</h5>
          <p className="card-text">{props.title}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Original Price: ${props.price}</li>
          <li className="list-group-item">Discount Percent: {props.discount}</li>
        </ul>
      </div>
  )
}
export default CouponCard;
