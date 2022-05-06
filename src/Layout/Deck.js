
import { Link, useParams, useHistory } from "react-router-dom";
import { React, useEffect, useState } from "react";
import { readDeck, deleteDeck, listDecks } from "../utils/api";
import CardList from "../common/CardList";
import NavBar from "../common/NavBar";

export const Deck = ({ decks }) => {
    console.log(decks) // undefined
    const cards = decks.cards; 
    
    const [ deck, setDeck ] = useState([]);
    
 
    const { deckId } = useParams;
    const history = useHistory;

    useEffect (() => {
        async function getDeck() {
            const response = await readDeck(deckId);
            setDeck(response);
        }
        getDeck();
    }, [])

    async function handleDelete(deck) {
        if (window.confirm(`Delete this deck? You will not be able to recover it.`)) {
            history.push("/");
            return await deleteDeck(deck.id);
        }
    }
    

    // let results = cards.filter(function (item) {
    //     return deck.id.indexOf(item.deckId) === 0;
    // })


    const list = cards.map((card) => {
      <CardList key={card.id} card={card} deck={deck}/>
      });
    

    return (
        <main>
        <div className="col">
            <div>
                <NavBar newDeck={deck}/>
            </div>
                <div className="card" style="width: 20rem;">
                    <div className="card-body">
                        <h4 className="card-title font-weight-lighter flex-fill">{deck.name}</h4>
                        <h6 className="card-subtitle mb-2 text-muted">{`${cards.length} cards`}</h6>
                        <p className="card-text">{deck.description}</p>
                        <Link to={`/decks/${deck.id}/study`}><button type="button" className="btn btn-light">Study</button></Link>
                        <Link to={`/decks/${deck.id}/edit`}><button type="button" className="btn btn-secondary">Edit</button></Link>
                        <Link to={`/decks/${deck.id}/cards/new`}><button type="button" className="btn btn-light">Add Cards</button></Link>
                        <button type="button" className="btn btn-danger" onClick={()=> handleDelete(deck)}>Delete</button>
                    </div>
                </div>
                <h2>Cards</h2>
                <section className="col">{list}</section>
        </div>
        </main>
    )
}

export default Deck