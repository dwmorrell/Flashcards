import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import NotEnoughCards from "./NotEnoughCards";


export const Study = () => {

    const initialState = {
        name: "",
        description: "",
    }

    const { deckId } = useParams();
    const [ card, setCard ] = useState(0);
    const [ cards, setCards ] = useState([])
    const [ deck, setDeck ] = useState(initialState);
    const [ flip, setFlip ] = useState(true);
    const history = useHistory();
    
    useEffect(() => { 
        async function fetchData() {
            
            const abortController = new AbortController();
            try {
                const response = await readDeck(deckId, abortController.signal);
                setDeck(response);  
                setCards(response.cards);       
            } catch (error) {
                console.error("Something went wrong", error);
            }
            return () => {
                abortController.abort();
            };
        }
        fetchData();
    }, [deckId]);

    function handleFlip () {
        setFlip(!flip);
    }

    function showNextButton(cards, card) {
        if (flip) {
            return null;
        } else {
            return (
                <button onClick={() => nextCard(card + 1, cards.length)} className="btn btn-primary mx-1">
                 Next
                </button>
            );
        }
    }

    function nextCard(card, total) {
        if (card < total) {
            setCard(card);
            setFlip(true);
        } else {
            if (window.confirm(`Restart cards? Click 'cancel' to return to the home page`)) {
                setCard(0);
                setFlip(true);
            } else {
                history.push("/");
            }
        }
    }

    return (
        <main>
            <div className="col">
                <nav aria-label='breadcrumb'>
                    <ol className='breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/'> Home</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                        </li>
                        <li className='breadcrumb-item active' aria-current='page'>
                            Study
                        </li>
                    </ol>
                </nav>
                    {deck?.cards?.length >= 3 
                        ?(
                            <>
                                <h4>{deck.name}: Study</h4>
                                <div className="card">
                                    <div className="card-body">
                                        <h6 className="card-title mb-2">Card {card +1} of {deck?.cards?.length}</h6>
                                        <p className="card-text">{flip ? deck?.cards[card]?.front : deck?.cards[card]?.back}</p>                        
                                        <button type="button" className="btn btn-secondary" onClick={()=> handleFlip()}>Flip</button>
                                        {showNextButton(cards, card)}
                                    </div>
                                </div> 
                            </>
                        )
                        :(
                        <div>   
                            <NotEnoughCards deck={deck} />
                        </div>
                        )
                    }                   
            </div>
        </main>
    )  
}

export default Study;