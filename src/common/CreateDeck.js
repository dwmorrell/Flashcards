import React from "react"
import { useState } from "react"
import { useHistory, Link } from "react-router-dom";
import { createDeck } from "../utils/api";

function CreateDeck ({ decks }) {

    const initialState = {
        name: "",
        description: "",
    }

    const history = useHistory();
    const [newDeck, setNewDeck] = useState(initialState);

    async function handleSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        const response = await createDeck({...newDeck}, abortController.signal);
        const newDeckId = response.id;
        history.push(`${newDeckId}`);
        return response;
    }

    const handleChange = (event) => {
        setNewDeck({...newDeck,
        [event.target.name]: event.target.value});
    }
    
    

    return (
        <div className="col">
            <nav aria-label='breadcrumb'>
                <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                        <Link to='/'> Home</Link>
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
                                placeholder="Deck Name"
                                onChange={handleChange}
                                value={newDeck.name}
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
                                placeholder="Describe the deck"
                                onChange={handleChange}
                                value={newDeck.description}
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

export default CreateDeck