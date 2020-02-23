import React from 'react';
import mikasa from '../mikasamva200.js'

export default class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bullets: []
    }
  }

  componentDidMount() {
    this.setState({
      bullets: this.props.features
    })
  }

  render() {
    if (this.state.bullets.length) {
      return (
        <ul>
          {this.state.bullets.map((item) => <li style={{fontSize:'14px'}}>{item}</li>)}
        </ul>
      )
    } else {
      return (
        <ul>
          {mikasa.bullets.map((item, index) => <li style={{fontSize:'14px'}} key={index}>{item}</li>)}
        </ul>
      )
    }
  }
}