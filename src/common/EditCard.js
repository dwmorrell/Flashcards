import { React, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readCard, readDeck } from "../utils/api";
import CardForm from "./CardForm";


function EditCard () {

const initialCardState = {
    id: "",
    front: "",
    back: "",
    deckId: "",
};

const { deckId , cardId } = useParams();
const [ card, setCard ] = useState(initialCardState);
const [ deck, setDeck ] = useState({})


/* Fetches data from "readCard" and "readDeck" from utils/api passing "cardId" and "deckId"
   Sets "card" and "deck" states from api response
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
}, [cardId, deckId]);

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
            <div>
                <CardForm card={card} />
            </div>
        </div>
    )

}

export default EditCard