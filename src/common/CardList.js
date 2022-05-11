import React from "react"
import { Link, useHistory, useRouteMatch } from "react-router-dom"
import { deleteCard } from "../utils/api" 

function CardList ({ card }) {
    const history = useHistory();
    const { url } = useRouteMatch();

    /* Handles the delete function when the delete button is clicked
       Calls "deleteCard" from utils/api to remove card from database / deck
       Returns user to home when confirmed
    */
    async function handleDelete(card) {
        if (window.confirm(`Delete this Card? You will not be able to recover it.`)) {
            history.go(0);
            return await deleteCard(card.id);
        }
    }

    return (
        <div className="card-deck">
            <div className="card" key={card.id}>
                <div className="card-body row d-flex justify-content-between flex-nowrap">
                    <div className="p-2 col-6">
                        <p className="card-text">{card.front}</p>
                    </div>
                    
                    <div className="p-2 col-6">
                        <p className="card-text">{card.back}</p>
                    </div>       
                </div>
                <div className="card-body d-flex flex-row-reverse">
                    <Link to={`${url}/cards/${card.id}/edit`} className="btn btn-secondary">Edit</Link>
                    <button type="button" className="btn btn-danger" onClick={()=> handleDelete(card)}>Delete</button> 
                </div>
            </div>
      </div>
    )
    
}

export default CardList;