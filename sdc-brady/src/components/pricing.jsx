import React from 'react'
import PrimeIcon from './primeIcon.jsx';

export default class Prices extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      price: 0,
      listPrice: 0,
      savings: 0,
      primeStatus: false,
      freeReturn: false
    }
  }

  componentWillMount() {
    // console.log(this.state.props);
    this.setState({
      price: this.props.options.price,
      listPrice: this.props.options.listPrice,
      savings: this.props.options.saving,
      primeStatus: this.props.options.primeStatus,
      freeReturn: this.props.options.freeReturn
    })
  }

  render() {
    const savingPercent = Math.round(100 * (this.state.savings / this.state.listPrice));
    const primeIcon = this.state.primeStatus ? <PrimeIcon  return={this.state.freeReturn}/> : null;
    return (
      <table>
        <tbody>
          <tr>
            <td style={{ fontSize: 'small', color: 'darkgray' }}>List Price:</td>
            <td style={{ textDecoration: 'line-through' }}>${this.state.listPrice}</td>
          </tr>
          <tr>
            <td style={{ float: 'right', fontSize: 'small', color: 'darkgray' }}>Price:</td>
            <td style={{ color: 'darkred', fontSize: 'large' }}>${this.state.price}</td>

            <td>{primeIcon}</td>
          </tr>
          <tr>
            <td style={{ fontSize: 'small', color: 'darkgray' }}>You Save:</td>
            <td style={{ color: 'darkred' }}>${this.state.savings} ({savingPercent}%)</td>
          </tr>
        </tbody>
      </table>
    )
  }
}