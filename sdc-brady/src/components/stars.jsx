import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

export default class Star extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      reviews: 0
    }
  }
  componentWillMount() {
    this.setState({
      rating: this.props.stars,
      reviews: this.props.reviews
    })
  }

  render() {
    return (                
      <div className='starWrapper'>
        <StarRatingComponent 
          name="rate2" 
          starCount={5}
          value={this.state.rating}
        />
        <a 
          className='titleReview'
          style={{ textDecoration: 'none' }} 
          href="wwww.amazon.com"
        >
          {this.state.reviews} customer reviews
        </a>
      </div>
    );
  }
}