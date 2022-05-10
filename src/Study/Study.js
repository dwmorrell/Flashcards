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
    const [ deck, setDeck ] = useState(initialState);
    const [ flip, setFlip ] = useState(true);
    console.log("hello")
    useEffect(() => {
        
        async function fetchData() {
            const abortController = new AbortController();
            try {
                console.log(deckId, card, deck)
                const response = await readDeck(deckId, abortController.signal);
                console.log(response)
                setDeck(response);         
            } catch (error) {
                console.error("Something went wrong", error);
            }
            return () => {
                abortController.abort();
            };
        }
        fetchData();
    }, []);

    console.log("deck=", deck)

    function handleFlip () {
        setFlip(!flip);
    }

    function handleNext() {
        setFlip(true)
        if (card === deck.cards.length -1){
            window.confirm("Click OK to restart the deck.") 
            ? setCard(() => 0) : useHistory.push("/")
        } else{
            setCard((card) => card +1)
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
                        <li className='breadcrumb-item active' aria-current='page'>
                            {deck.name}
                        </li>
                    </ol>
                </nav>
                    {deck?.cards?.length < 3 &&
                    <div>
                        <NotEnoughCards deck={deck} />
                    </div>
                    }
                <h4>{deck.name}</h4>
                <div className="card" style="width: 20rem;">
                    <div className="card-body">
                        <h6 className="card-title mb-2">Card {card +1} of {deck.cards.length}</h6>
                        <p className="card-text">{flip ? deck.cards[card].front : deck.cards[card].back}</p>                        
                        <button type="button" className="btn btn-secondary" onClick={()=> handleFlip()}>Flip</button>
                        {!flip ? <button className="btn btn-primary" onClick={handleNext()}>Next</button>: null}
                    </div>
                </div>
            </div>
        </main>
    )
    
}

export default Study;