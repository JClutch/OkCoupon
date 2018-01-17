import React from 'react';
import axios from 'axios'
import DealList from './DealListComp.js'

class SavedDealsComp extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			savedDeals: []
		}
		this.getDeals = this.getDeals.bind(this);
	}

	componentDidMount() {
	  axios.get('/savedCoupons')
		.then((response) => {
			console.log('response ', response)
			this.getDeals(response)
		})

	}

	getDeals(response) {
		console.log('saveddd coupons response', response)

		this.setState({savedDeals: response.data})

	}

	render() {
		return (
			<div className="container">
				<div style={{"left": "50px"}}>
					<h1>Saved Deals!</h1>
				</div>
				<DealList deals={this.state.savedDeals}/>
			</div>
		)
	}
}

export default SavedDealsComp;
