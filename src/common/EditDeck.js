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
    const [editDeck, setEditDeck ] = useState(initialState);

    /* Fetches data from "readDeck" from utils/api passing in "deckId"
       Sets "editDeck" state from api response
    */
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
    }, [deckId]);

    /* Handles submit button click
       updates "deck" in decks database using "updateDeck" function from utils/api passing in "editDeck" state
       Returns user to /deck/:deckId path when complete
    */  
    async function handleSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        const response = await updateDeck({...editDeck}, abortController.signal);
        history.go(0);
        return response;
    }

    //  Sets "editDeck" state using input from forms
    const handleChange = (event) => {
        setEditDeck({...editDeck,
        [event.target.name]: event.target.value});
    }

    return (
        <div className="col">
            <nav aria-label='breadcrumb'>
                <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                        <Link to='/'> Home</Link>
                    </li>
                    <li className='breadcrumb-item'>
                        <Link to={`/decks/${deckId}`}>{editDeck.name}</Link>
                    </li>
                    <li className='breadcrumb-item active' aria-current='page'>
                        Edit Deck
                    </li>
                </ol>
            </nav>
            <div>
                <h3>{editDeck.name}: Edit Deck</h3>
            </div>
            <div className="card">
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label>Name:</label>
                            <input
                                className="form-control"
                                id="name"
                                type="input"
                                name="name"
                                placeholder={editDeck.name}
                                onChange={handleChange}
                                value={editDeck.name}
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
                                value={editDeck.description}
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