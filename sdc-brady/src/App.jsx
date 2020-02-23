import React from 'react';
import Star from './components/stars.jsx';
import List from './components/features.jsx';
import Price from './components/pricing.jsx';
import Services from './services/services.js';
import './app.css'
//test record
// import mikasa from './mikasamva200.js';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      productName: '',
      seller: '',
      sellerProfile: '',
      stars: 3,
      customerReviews: 0,
      features: [],
      prices: {},
      styles: '',
      options: '',
    }
  }

  componentWillMount() {
    Services.getProduct()
    .then(data => {
      let product = data.rows[0];
      this.setState({
        customerReviews: product.customerreviews,
        features: product.features,
        options: product.options,
        productName: product.productname,
        seller: product.seller,
        sellerProfile: product.sellerprofile,
        stars: product.stars,
        styles: product.styles,
        prices: {
          price: product.price,
          listPrice: product.listprice,
          savings: product.savings,
          primeStatus: product.primestatus,
          freeReturns: product.freereturns
        }
      })
    })

    .catch(err => console.log(`there was an error on the client side`, err))

    // Test Record
    // this.setState({
    //   productName: mikasa.productName,
    //   seller: mikasa.seller,
    //   sellerProfile: mikasa.sellerProfile,
    //   stars: mikasa.stars,
    //   customerReviews: mikasa.customerReviews,
    //   listPrice: mikasa.listPrice,
    //   price: mikasa.price,
    //   primeStatus: mikasa.primeStatus,
    //   savings: mikasa.savings
    // })
  }


  render() {
    return (
      <div className='wrapper'>
        <span className='mainTitle'>{this.state.productName}</span>
        <br />
        by&nbsp;
          <a style={{ textDecoration: 'none' }} href={this.state.sellerProfile}>{this.state.seller}</a>
        <div>
          <Star stars={this.state.stars} reviews={this.state.customerReviews} />
        </div>
        <div className='aLine' />
          <Price options={this.state.prices}/>
        <div>
          <List features={this.state.features}/>
        </div>
      </div>
    )
  }
}

export default App;
