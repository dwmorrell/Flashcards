import { React, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import CardForm from "./CardForm";

function CreateCard () {

    const initialDeckState = {
        id: "",
        name: "",
        description: "",
    };

    const { deckId } = useParams();
    const [ deck, setDeck ] = useState(initialDeckState);

    // Fetches readDeck data from utils/api using "deckId" and sets state for "deck"
    useEffect(() => {
        async function fetchData() {
            const abortController = new AbortController();
            try { 
                const deckResponse = await readDeck(deckId, abortController.signal);
                setDeck(deckResponse);
            } catch (error) {
                console.error("Something went wrong", error);
            }
            return () => {
                abortController.abort();
            };
        }
        fetchData();
    }, [deckId]);
    
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
                        Add Card
                    </li>
                </ol>
            </nav>
            <h3> {`${deck.name}: Add Card`} </h3>
            <div className="card">
                <div className="card-body">
                    <CardForm />
                </div>
            </div>
        </div>
    )

}

export default CreateCard