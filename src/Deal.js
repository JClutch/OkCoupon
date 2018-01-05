import React from 'react';

const Deal = (props) => (
	<div>
		<div className="card text-center" style={{"float": "left", "width": "25rem", "height": "35rem", "margin": "10px"}}>
			<img className="card-img-top" src={props.deal.imgUrl} alt="Card image cap"></img>
			<div className="card-block d-flex flex-column">
				<h4 className="card-title">{props.deal.merchant}</h4>
				<p className="card-text">{props.deal.title}</p>
				<ul className="list-group list-group-flush">
					<li className="list-group-item">Original Price: ${props.deal.price}</li>
					<li className="list-group-item">Discount Percent: {props.deal.discount}</li>
				</ul>
				<a href={props.deal.url} style={{"boxSizing": "border-box", "display": "block", "margin": "10px 0", "padding": "10px", "width": "100%"}} className="btn btn-primary">Deal Link</a>
				<a className="btn btn-primary" style={{"boxSizing": "border-box", "display": "block", "margin": "10px 0", "padding": "10px", "width": "100%"}} href={`https://twitter.com/intent/tweet?text=Join%20me%20on%20coupon%20adventures%21%20${props.deal.pureUrl}`}>Tweet</a>
			</div>
		</div>
	</div>
)

export default Deal;
