import { React, useState, useEffect} from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import Deck from "./Deck";
import Study from "../Study/Study";
import CreateCard from "../common/CreateCard";
import EditCard from "../common/EditCard";
import EditDeck from "../common/EditDeck";
import { Switch, Route } from "react-router-dom";
import CreateDeck from "../common/CreateDeck";
import { listDecks } from "../utils/api";


function Layout() {

  const [decks, setDecks] = useState([]);

  /* Fetches data from "listDeck" from utils/api
     Sets "deck" state from api response
     Deck then gets passed to "Home" component
  */
  useEffect(() => {
    async function fetchData() {
        const abortController = new AbortController();
        try {
            const response = await listDecks(abortController.signal);
            setDecks(response);
        } catch (error) {
            console.error("Something went wrong", error);
        }
        return () => {
            abortController.abort();
        };
    }
    fetchData();
}, []);


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
              <Deck />
            </Route>
            <Route exact path={"/decks/:deckId/study"}>
              <Study />
            </Route>
            <Route exact path={"/decks/:deckId/cards/:cardId/edit"}>
              <EditCard />
            </Route>
            <Route exact path={"/decks/:deckId/cards/new"}>
              <CreateCard />
            </Route>
            <Route exact path={"/decks/:deckId/edit"}>
              <EditDeck />
            </Route>
            <Route>
              <NotFound />
              </Route>
          </Switch>
         </div>
      </div>
    </>
  );
}

export default Layout;
