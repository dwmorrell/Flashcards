import React, { useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { createCard, updateCard } from "../utils/api";

function CardForm ( { card } ) {

    const [ cards, setCards ] = useState([]);
    const { deckId } = useParams();
    const history = useHistory();

    //  Sets card data using input from forms
    function handleChange({ target }) {
        if(card) {
            setCards({
                ...card,
                [target.name]: target.value,
            });
        } else {
            setCards({
                ...cards,
                [target.name]: target.value,
            });

        }
    }

    /* Handles submitting the new card to the deck using "deckId" and "card" data.
       Calls the createCard function from utils/api
       Returns user to /decks/:deckId route when done
    */
    async function handleSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        if(card){
            const response = await updateCard({ ...card }, abortController.signal);
            history.push(`/decks/${deckId}`);
            return response;
        } else {
            const response = await createCard( deckId, { ...cards }, abortController.signal);
            history.push(`/decks/${deckId}`);
            return response;
        }
    }


return (
    <>
        <form >
                {card 
                    ?(  
                        <>  
                            <div className="form-group">   
                                <label>Front:</label>
                                <textarea
                                    className="form-control"
                                    id="name"
                                    type="textarea"
                                    name="front"
                                    rows="4"
                                    placeholder={card.front}
                                    onChange={handleChange}
                                    value={card.front}
                                />
                            </div>
                            <div className="form-group">
                                <label>Back:</label>
                                <textarea
                                    className="form-control"
                                    id="name"
                                    type="textarea"
                                    name="back"
                                    rows="4"
                                    placeholder={card.back}
                                    onChange={handleChange}
                                    value={card.back}
                                />
                            </div>
                        </>
                    ):(
                        <>  
                            <div className="form-group">   
                                <label>Front:</label>
                                <textarea
                                    className="form-control"
                                    id="name"
                                    type="textarea"
                                    name="front"
                                    rows="4"
                                    placeholder="Front side of card"
                                    onChange={handleChange}
                                    value={cards.front}
                                />
                            </div>
                            <div className="form-group">
                                <label>Back:</label>
                                <textarea
                                    className="form-control"
                                    id="name"
                                    type="textarea"
                                    name="back"
                                    rows="4"
                                    placeholder="Back side of card"
                                    onChange={handleChange}
                                    value={cards.back}
                                />
                            </div>
                         </>

                     )       
                }
            <Link to={`/decks/${deckId}`}><button type="button" className="btn btn-secondary">Cancel</button></Link>
            <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Save</button>
        </form>          
     </>
    )
}

export default CardForm