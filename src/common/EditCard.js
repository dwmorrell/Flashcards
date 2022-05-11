import { React, useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api";


function EditCard () {

const initialDeckState = {
    id: "",
    name: "",
    description: "",
};
const initialCardState = {
    id: "",
    front: "",
    back: "",
    deckId: "",
};

const { deckId , cardId } = useParams();
const history = useHistory();

const [ deck, setDeck ] = useState(initialDeckState);
const [ card, setCard ] = useState(initialCardState);


/* Fetches data from "readCard" and "readDeck" from utils/api passing "cardId" and "deckId"
   Sets "deck" and "card" state from api response
*/
useEffect(() => {
    async function fetchData() {
        const abortController = new AbortController();
        try {
            const cardResponse = await readCard(cardId, abortController.signal);
            const deckResponse = await readDeck(deckId, abortController.signal);
            setCard(cardResponse);
            setDeck(deckResponse);
        } catch (error) {
            console.error("Something went wrong", error);
        }
        return () => {
            abortController.abort();
        };
    }
    fetchData();
}, [deckId, cardId]);

//  Sets "card" state using input from forms
function handleChange({ target }) {
    setCard({
        ...card,
        [target.name]: target.value,
    });
}

/* Handles submit button click
   updates "card" in deck/cards database using "updateCard" function from utils/api passing in "card" state
   Returns user to /decks/:deckId path when complete
*/
async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    const response = await updateCard({ ...card }, abortController.signal);
    history.push(`/decks/${deckId}`);
    return response;
}

    return (
        <div className="col">
            <nav aria-label='breadcrumb'>
                <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                        <Link to='/'> Home</Link>
                    </li>
                    <li className='breadcrumb-item'>
                        <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                    </li>
                    <li className='breadcrumb-item active' aria-current='page'>
                        {`Edit Card ${cardId}`}
                    </li>
                </ol>
            </nav>
            <div>
                <h3>Edit Card</h3>
            </div>
            <div className="card">
                <div className="card-body">
                    <form >
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
                        <Link to={`/decks/${deckId}`}><button type="button" className="btn btn-secondary">Cancel</button></Link>
                        <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default EditCard