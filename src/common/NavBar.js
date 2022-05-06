
import { Link } from "react-router-dom"

function NavBar ({ newDeck }) {

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
               <li className="breadcrumb-item"><Link to="/">Home</Link> </li>
               <li className="breadcrumb-item active" aria-current="page">{`${newDeck.name}`}</li>
            </ol>
        </nav>
    );
};

export default NavBar;