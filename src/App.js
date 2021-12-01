import React, { PureComponent } from 'react';
import faker from 'faker';
import './App.css';

class App extends PureComponent {
  state = {
    playerCount: 5,
    cardCountPerPlayer: 7,
    deck: null,
    players: []
  }

  onShuffle = () => {
    const deck = new Deck();
    deck.createDeck();
    deck.shuffleDeck();
    this.setState({ deck });
  }

  onStart = () => {
    const players = [];
    for (let i = 0; i < this.state.playerCount; i++) {
      const player = new Player(faker.name.findName());
      players.push(player);
    }
    const { deck } = this.state;
    for (let i = 0; i < this.state.cardCountPerPlayer; i++) {
      for (let j = 0; j < this.state.playerCount; j++) {
        players[j].playerCards.push(deck.cards[i * this.state.playerCount + j]);
      }
    }
    this.setState({ deck, players });
  }

  onChangePlayerCount = (e) => {
    const playerCount = parseInt(e.target.value);
    if (playerCount < 1) {
      return;
    }
    if (this.state.cardCountPerPlayer * playerCount > 52) {
      return;
    }
    this.setState({ playerCount });
  }

  onChangeCardCountPerPlayer = (e) => {
    const cardCountPerPlayer = parseInt(e.target.value);
    if (cardCountPerPlayer < 1) {
      return;
    }
    if (cardCountPerPlayer * this.state.playerCount > 52) {
      return;
    }
    this.setState({ cardCountPerPlayer });
  }

  render() {
    return (
      <div className="App">
        <div>
          <button onClick={this.onShuffle}>Shuffle</button>
        </div>
        <div>
          <label>Player Count</label>
          <input type="number" value={this.state.playerCount} onChange={this.onChangePlayerCount} />
        </div>
        <div>
          <label>Card Count Per Player</label>
          <input type="number" value={this.state.cardCountPerPlayer} onChange={this.onChangeCardCountPerPlayer} />
        </div>
        <div>
          <button onClick={this.onStart}>Start</button>
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                {this.state.deck && this.state.deck.cards.map((card, index) => (
                  <td key={index}>{card.rank} {card.suit}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <table>
          <tbody>
            {this.state.players.map((player, i) => (
              <tr key={i}>
                <td>{player.playerName}</td>
                {player.playerCards.map((card, j) => (
                  <td key={j}>{card.rank} {card.suit}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

class Card {
  constructor(suit, rank, value) {
    this.suit = suit;
    this.rank = rank;
    this.value = value;
  }
}

class Deck {
  constructor() {
    this.cards = [];
  }

  createDeck() {
    let suits = ['♣', '♦', '♥', '♠'];
    let ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < ranks.length; j++) {
        this.cards.push(new Card(suits[i], ranks[j], values[j]));
      }
    }
  }

  shuffleDeck() {
    let location1, location2, tmp;
    for (let i = 0; i < 1000; i++) {
      location1 = Math.floor((Math.random() * this.cards.length));
      location2 = Math.floor((Math.random() * this.cards.length));
      tmp = this.cards[location1];
      this.cards[location1] = this.cards[location2];
      this.cards[location2] = tmp;
    }
  }
}

class Player {
  constructor(name) {
    this.playerName = name;
    this.playerCards = [];
  }
}

export default App;
