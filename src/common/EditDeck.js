import { React, useState, useEffect } from "react"
import { useHistory, Link, useParams } from "react-router-dom";
import { updateDeck, readDeck } from "../utils/api";

function EditDeck () {

    const { deckId } = useParams();

    const initialState = {
        name: "",
        description: "",
    }

    const history = useHistory();
    const [deck, setDeck] = useState(initialState);
    const [editDeck, setEditDeck ] = useState(initialState);

    useEffect(() => {
        async function fetchData() {
            const abortController = new AbortController();
            try {
                const response = await readDeck(deckId, abortController.signal);
                setEditDeck(response);  
            } catch (error) {
                console.error("Something went wrong", error);
            }
            return () => {
                abortController.abort();
            };
        }
        fetchData();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        const response = await updateDeck({...deck}, abortController.signal);
        history.go(0);
        return response;
    }

    const handleChange = (event) => {
        setDeck({...deck,
        [event.target.name]: event.target.value});
    }

    return (
        <div className="col">
            <nav aria-label='breadcrumb'>
                <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                        <Link to='/'> Home</Link>
                    </li>
                    <li className='breadcrumb-tiem'>
                        <Link to={`/decks/${deckId}`}>{editDeck.name}</Link>
                    </li>
                    <li className='breadcrumb-item active' aria-current='page'>
                        Create Deck
                    </li>
                </ol>
            </nav>
            <div>
                <h3>Create Deck</h3>
            </div>
            <div className="card">
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label>Name:</label>
                            <textarea
                                className="form-control"
                                id="name"
                                type="textarea"
                                name="name"
                                rows="1"
                                placeholder={editDeck.name}
                                onChange={handleChange}
                                value={deck.name}
                            />
                        </div>
                        <div className="form-group">
                            <label>Description:</label>
                            <textarea
                                className="form-control"
                                id="description"
                                type="textarea"
                                name="description"
                                rows="4"
                                placeholder={editDeck.description}
                                onChange={handleChange}
                                value={deck.description}
                            />
                        </div>
                        <Link to="/"><button type="button" className="btn btn-secondary">Cancel</button></Link>
                        <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );

};

export default EditDeck