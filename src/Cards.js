import React, { Component } from 'react';
import './Cards.css';

export class Cards extends Component {
  constructor(props) {
    super(props);
    let angle = Math.random() * 90 - 45;
    let xPos = Math.random() * 40 - 20;
    let yPos = Math.random() * 40 - 20;
    this._transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;
  }
  render() {
    // transform: translate(10px, 20px) rotate(20deg);
    return (
      <img
        style={{ transform: this._transform }}
        className="imgview"
        src={this.props.img}
        alt="img"
      />
    );
  }
}

export default Cards;
