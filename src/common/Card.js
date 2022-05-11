import React from "react"
import { Link, useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api";

export const Card = ({ deck }) => {
    const cards = deck.cards;
    const history = useHistory();


    /* Handles the delete function when the delete button is clicked
       Calls "deleteDeck" from utils/api to remove deck from database
       Returns user to home when confirmed
    */
    async function handleDelete(deck) {
        if (window.confirm(`Delete this deck? You will not be able to recover it.`)) {
            history.go(0);
            return await deleteDeck(deck.id);
        }
    }
return (
    <div className="card-deck">
        <div className="card" key={deck.id}>
            <div className="card-body">
                <h4 className="card-title">
                    <strong>{deck.name}</strong>
                </h4>
                <h6 className="card-subtitle mb-2 text-muted">{`${cards.length} cards`}</h6>
                <p className="card-text">{deck.description}</p>
                     <div className="row">
                        <Link to={`/decks/${deck.id}`}><button type="button" className="btn btn-secondary">View</button></Link>
                        <Link to={`/decks/${deck.id}/study`}><button type="button" className="btn btn-light">Study</button></Link>
                        <button type="button" className="btn btn-danger" onClick={()=> handleDelete(deck)}>Delete</button>
                    </div>
            </div>
        </div>
    </div>
);
};

export default Card