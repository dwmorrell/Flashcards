import React from "react";
import { Link } from "react-router-dom";


export const NotEnoughCards = ({ deck }) => (
    <main className="container">
        <h4>Not enough cards.</h4>
        <p>You need at least 3 cards to study. There are {deck?.cards?.length} cards in this deck.</p>
        <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-secondary">+ Add Cards</Link>
    </main>
);

export default NotEnoughCards