import React from "react"
import { useState } from "react"
import { useHistory, Link } from "react-router-dom";
import { createDeck } from "../utils/api";
import NavBar from "../common/NavBar";

function CreateDeck () {
    const history = useHistory();

async function handleSubmit(event) {
    event.preventDefault();
    const response = await createDeck(newDeck);
    history.go(0);
}

const handleChange = (event) => {
    setNewDeck({...newDeck,
    [event.target.name]: event.target.value});
}

    const initialState = {
        name: "",
        description: "",
    }

    const [newDeck, setNewDeck] = useState(initialState);

    return (
        <div className="col">
            <div>
                <NavBar newDeck={newDeck}/>
            </div>
            <div>
                <h3>Create Deck</h3>
            </div>
            <div className="card">
                <div className="card-body">
                    <form>
                        <div>
                            <label>Name:</label>
                            <textarea
                                id="name"
                                type="textarea"
                                name="name"
                                rows="1"
                                placeholder="Deck Name"
                                onChange={handleChange}
                                value={newDeck.name}
                            />
                        </div>
                        <div>
                            <label>Description:</label>
                            <textarea
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
    )

}

export default CreateDeck