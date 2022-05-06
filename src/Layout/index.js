import { React, useState, useEffect} from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import Deck from "./Deck";
import { Switch, Route } from "react-router-dom";
import CreateDeck from "./CreateDeck";
import { listDecks } from "../utils/api";
import ErrorMessage from "../common/ErrorMessage";



function Layout() {

  const [decks, setDecks] = useState([]);
  const [error, setError] = useState(undefined);

    useEffect (() => {
        const abortController = new AbortController();
        listDecks(abortController.signal).then(setDecks).catch(setError);
        return () => abortController.abort();
    }, []);

    if (error) {
        return <ErrorMessage error={error} />
    }


  return (
    <>
      <Header />
      <div className="container">
        
        <div>
          <Switch>
            <Route exact path={"/"}>
              <Home decks={decks} />
            </Route> 
            <Route exact path={"/decks/new"}>
              <CreateDeck />
            </Route>
            <Route exact path={"/decks/:deckId"}>
              <Deck decks={decks} />
            </Route>
              <NotFound />
          </Switch>
         </div>
      </div>
    </>
  );
}

export default Layout;
