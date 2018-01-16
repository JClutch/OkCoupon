import React from 'react';
import App from './app.js';
import Navigation from './route.js'
import {
  HashRouter as Router,
  Route,
  Link
 } from 'react-router-dom';

import axios from 'axios';
//testing out my comments

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coupons: [{
        image_url: "http://psdwizard.com/wp-content/uploads/2016/07/octo-loader.gif",
        title: "Finding you deals!",
        merchant_name: "",
        price: "",
        discount_percentage: "",
        id: 1,
        lat: 0,
        lon: 0
      }],
      index: 0,
      postal: 0,
      flag: false,
      categories: [],
      filter: []
    }
    this.incrementIndex = this.incrementIndex.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this)
    this.getCategories = this.getCategories.bind(this)
    this.selectCategory = this.selectCategory.bind(this)
    this.foo = this.foo.bind(this);
    this.alerter = this.alerter.bind(this);
  }

  foo(arg) {
    setTimeout( () =>{
      this.setState({
        coupons: arg
      }, () => {
        console.log('saved coupons to state: ', this.state.coupons);
      })
    }, 2000)
  }
///////////////////////////////////////////////////////////// AARON

  componentWillMount () {
    this.getCategories()
  }
///////////////////////////////////////////////////////////// 
  incrementIndex() {
    this.setState({index:this.state.index+1})
  }


    handleChange (e) {
    this.setState({
      postal: e.target.value
    })
  }

  handleClick () {
    console.log('going postal!!!!!', this.state.postal)
    let postal = this.state.postal
    if(postal > 1001 && postal < 99950){
      axios.post('/helper', {postal: this.state.postal, filter: this.state.filter}).then((res)=>{
        this.setState({flag: true})
      })
      .then(() => {
      axios.get('/arrayCoupons').then((response) => {
        console.log('is the problem here??', response.data)
        this.foo(response.data);
        console.log("Coupons:",this.state.coupons);
      })
    })
    }
  }
///////////////////////////////////////////////////////////// AARON
  getCategories () {
    axios.get('/categories')
    .then((response) => {
      console.log(response.data)
      if (!response.data.length) {
        console.alert('There was an error getting categories')
      } else {
        this.setState({
          categories: response.data
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }

  selectCategory (category) {
    console.log(category)
    var index = this.state.filter.indexOf(category)
    if (index > -1) {
      console.log('already added')
      var newFilter = this.state.filter.slice()
      newFilter.splice(index, 1)
      this.setState({
        filter: newFilter
      }, () => {
        console.log(this.state.filter)
      })
    } else {
      this.setState({
        filter: [...this.state.filter, category]
      }, () => {
        console.log(this.state.filter)
      })
    }
  }
/////////////////////////////////////////////////////////////
  alerter() {
    alert("you're all out of coupons! go check out what you've got saved!")
  }


  render() {
        if(this.state.flag === false){
              return (
    <div className='container'>
    <p> Whats your area code? </p>
        <input id="postal" className="password" placeholder="Your Postal Code - Here" type="text" value={this.state.sqrft} onChange={this.handleChange}/>
        <button onClick={this.handleClick} className="btn btn-dark"> Postal Code
        </button>
        <br/>
        <div>Select categories to search by (optional)</div><br/>
        <div className="categories" style={{height: '75vh', overflowY: 'scroll', borderStyle: 'groove', borderRadius:'1em'}}>
        {this.state.categories.map((item,idx) => {
          return (<span key={idx}><label style={{fontSize: '2em'}}><input type="checkbox" style={{transform: 'scale(1.5)', marginLeft:'1em'}}
                    value={item.category.slug} onChange={(e) => {this.selectCategory(e.target.value)}}/><span style={{marginLeft: '1em', fontSize: '1em'}}>{item.category.name}</span></label><hr style={{padding:'0', margin:'0'}}/></span>)
        })}
        </div>
    </div>
    );
    } else{
      if (this.state.index === this.state.coupons.length-1) {
        return (
          <div>
            <div className="container" style={{'height':"55%", 'width':"55%"}}>
              <App Coupon={this.state.coupons[this.state.coupons.length-1]} Increment={this.alerter}/>
            </div>
          </div>
          )
      } else {
        return (
        <div>
          <div className="container" style={{'height':"55%", 'width':"55%"}}>
            <App Coupon={this.state.coupons[this.state.index]} Increment={this.incrementIndex} />
          </div>
        </div>
        )
      }
    }
  }
}

export default Main
