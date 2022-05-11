import { React, useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";

function CreateCard () {

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

    const { deckId } = useParams();
    const history = useHistory();
    const [ deck, setDeck ] = useState(initialDeckState);
    const [ card, setCard ] = useState(initialCardState);

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

    function handleChange({ target }) {
        setCard({
            ...card,
            [target.name]: target.value,
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        const response = await createCard( deckId, { ...card }, abortController.signal);
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
                        Add Card
                    </li>
                </ol>
            </nav>
            <h3> {`${deck.name}: Add Card`} </h3>
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
                                placeholder="Front Side of Card"
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
                                placeholder="Back Side of Card"
                                onChange={handleChange}
                                value={card.back}
                            />
                        </div>
                        <Link to={`/decks/${deckId}`}><button type="button" className="btn btn-secondary">Cancel</button></Link>
                        <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Save</button>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default CreateCard