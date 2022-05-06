import React from "react"
import { Link, useHistory } from "react-router-dom"
import { deleteCard } from "../utils/api" 

function CardList ({ card, deck }) {
    const history = useHistory;

    async function handleDelete(card) {
        if (window.confirm(`Delete this Card? You will not be able to recover it.`)) {
            history.go(0);
            return await deleteCard(card.id);
        }
    }

    return (
        <div className="card-deck">
            <div className="card" key={card.id} style="width: 100%;">
                <div className="card-body row">
                    <div style="width: 50%;">
                        <p className="card-text">{card.front}</p>
                    </div>
                    <div style="width: 50%;">
                        <p className="card-text">{card.back}</p>
                        <Link to={`/decks/${deck.id}/cards/${card.id}/edit`}><button type="button" className="btn btn-secondary">Edit</button></Link>
                        <button type="button" className="btn btn-danger" onClick={()=> handleDelete(card)}>Delete</button>
                    </div>
                </div>
            </div>
      </div>
    )
    
}

export default CardList;