
import { React, useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteDeck } from "../utils/api";
import CardList from "../common/CardList";


export const Deck = () => {
    
    const initialState = {
        name: "",
        description: "",
    }

      const [ deck, setDeck ] = useState(initialState);
      const [ cards, setCards ] = useState([]);
      const { deckId } = useParams();
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
    }, []);

    async function handleDeleteDeck(deck) {
        if (window.confirm(`Delete this deck? You will not be able to recover it.`)) {
            history.push("/");
            return await deleteDeck(deck.id);
        }
    }

    const list = cards.map((card) => {
        return (
      <CardList key={card.id} card={card} deck={deck}/>
        )
      });
    

    return (
        <main>
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
        <div className="col">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title font-weight-lighter flex-fill">{deck.name}</h4>
                        <h6 className="card-subtitle mb-2 text-muted">{`${cards.length} cards`}</h6>
                        <p className="card-text">{deck.description}</p>
                        <Link to={`/decks/${deck.id}/study`}><button type="button" className="btn btn-light">Study</button></Link>
                        <Link to={`/decks/${deck.id}/edit`}><button type="button" className="btn btn-secondary">Edit</button></Link>
                        <Link to={`/decks/${deck.id}/cards/new`}><button type="button" className="btn btn-light">Add Cards</button></Link>
                        <button type="button" className="btn btn-danger" onClick={()=> handleDeleteDeck(deck)}>Delete</button>
                    </div>
                </div> 
                <h2>Cards</h2>
                <section>{list}</section>
        </div>
 
        </main>
    );
}

export default Deck