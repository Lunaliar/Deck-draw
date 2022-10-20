import axios from "axios";
import React, { Component } from "react";
import Card from "./Card";
import "./Deck.css";
const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

class Deck extends Component {
	constructor(props) {
		super(props);
		this.state = {
			deck: null,
			drawn: [],
		};
		this.getCard = this.getCard.bind(this);
	}
	async componentDidMount() {
		let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`);
		this.setState({ deck: deck.data });
	}
	async getCard() {
		let id = this.state.deck.deck_id;
		let cardUrl = `${API_BASE_URL}/${id}/draw/`;
		let cardRes = await axios.get(cardUrl);
		let card = cardRes.data.cards[0];
		if (cardRes.data.success) {
			this.setState((st) => ({
				drawn: [
					...st.drawn,
					{
						id: card.code,
						image: card.image,
						name: `${card.suit} of ${card.value}`,
					},
				],
			}));
		} else {
			alert("Out of cards! Please reload.");
		}
	}
	render() {
		const cards = this.state.drawn.map((c) => {
			return (
				<Card
					name={c.name}
					image={c.image}
					key={c.id}
				/>
			);
		});
		return (
			<div className="Deck">
				<h1>Card Dealer</h1>
				<button onClick={this.getCard}>Get Card!</button>
				<div className="Deck-CardArea">{cards}</div>
			</div>
		);
	}
}
export default Deck;
