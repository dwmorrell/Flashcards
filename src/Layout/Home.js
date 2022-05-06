import React from "react";
import { Link } from "react-router-dom";
import { Card } from "../common/Card";


export const Home = ({ decks }) => {
    

    const list = decks.map((deck) => <Card key={deck.id} deck={deck} />);

    return (
        <main className="container">
            <div>
                <Link to="/decks/new" className="btn btn-secondary"> Create Deck</Link>
            </div>
          <section className="col-12">{list}</section>
        </main>
    );
};

export default Home;