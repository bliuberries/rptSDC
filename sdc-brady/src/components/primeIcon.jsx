import icon from '../images/primeIcon.png';
import React from 'react'

const PrimeIcon =(props) => {
  return (
    <div className="primeIconWrapper">
      <img className="primeIconPrice" src={icon} alt=""/>&nbsp; & <a style={{ textDecoration: 'none', fontSize: 'medium' }}  href="www.amazon.com">{this.props.return ? 'FREE Returns' : null}</a>
    </div>
  )  
}

export default PrimeIcon;