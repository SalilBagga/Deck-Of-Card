import React, { Component } from 'react';
import Cards from './Cards';
import axios from 'axios';
import './CardsTable.css';

export class CardsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deckid: '',
      cardSet: []
    };
    this.getCards = this.getCards.bind(this);
  }
  async componentDidMount() {
    console.log('CardsTable.js');
    axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').then(response => {
      this.setState({ deckid: response.data.deck_id });
    });
  }
  async getCards() {
    let deckid = this.state.deckid;
    try {
      let cardURL = `https://deckofcardsapi.com/api/deck/${deckid}/draw/`;
      let cardResponse = await axios.get(cardURL);
      if (!cardResponse.data.success) {
        throw new Error('Deck is empty');
      }
      let card = cardResponse.data.cards[0];
      this.setState(st => ({
        cardSet: [
          ...st.cardSet,
          {
            id: card.code,
            image: card.image,
            name: `${card.value} of ${card.suit} `,
            remainingcards: cardResponse.remaining
          }
        ]
      }));
    } catch (err) {
      alert(err);
    }
  }
  renderimg() {
    let rend = this.state.cardSet.map(c => (
      <Cards key={c.remainingcards - 52} id={c.id} name={c.name} img={c.image} />
    ));
    return rend;
  }
  render() {
    console.log(`RenderCardsTable-  ${this.state.deckid}`);
    let rend = this.state.cardSet.map(c => (
      <div>
        <Cards key={c.remainingcards - 52} img={c.image} name={c.name} />
      </div>
    ));
    return (
      <div>
        <h1 className="Deck-Title">DECK OF Cards</h1>
        <button className="buttonlook " onClick={this.getCards}>
          Click Me
        </button>
        <div className="deckdisplay">{rend}</div>
      </div>
    );
  }
}

export default CardsTable;
