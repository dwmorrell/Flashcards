# Flashcards

## Project: Flashcard-o-matic
Premise: A local school has decided to put together a flashcard application, Flashcard-o-matic, to help their students study online. Teachers will use this application to create decks of flashcards for the subjects they teach, and students will study the decks. The school needs you to build the application that the students and teachers will use.

## Purpose:
This project was designed to test my ability to work with rendering and state management using React. 

## Required Skills:

* Installing packages via NPM
* Running tests from the command line
* Writing React function components
* Creating routes, including nested routes, using React Router
* Using hooks like useState(), useParams(), and useHistory()
* Debugging React code through console output and using the VS Code debugger

### API

There are two datasets that are a part of this project: decks and cards.

You can view all the data inside of the data/db.json file. Each data set can be accessed via a named property in this file. The following is a partial listing of the data in data/db.json:
```
{
  "decks": [
    {
      "id": 1,
      "name": "...",
      "description": "..."
    }
  ],
  "cards": [
    {
      "id": 1,
      "front": "...",
      "back": "...",
      "deckId": 1
    }
  ]
}
```
### Decks
Each Deck is an object with the following shape:
```
{
  "id": 1,
  "name": "Rendering in React",
  "description": "React's component structure allows for quickly building a complex web application that relies on DOM manipulation. "
}
```

A Deck represents a collection of flashcards, or simply cards.

### Cards
Each card is an object with the following shape:
```
{
  "id": 1,
  "front": "Differentiate between Real DOM and Virtual DOM.",
  "back": "Virtual DOM updates are faster but do not directly update the HTML",
  "deckId": 1
}
```

Each card represents a flashcard with a front , where the question is displayed, and a back, where the answer can be found. A card also contains the deckId, which matches the card to the deck that the card belongs to.

#### Utility functions
There are several utility functions exported from src/utils/api/index.js that allow you to perform create, read, update, and delete operations with the API server. You will need to select and use the appropriate functions in your React components.

Note that the updateDeck(), readDeck(), and listDecks() functions call the API server using URLs that include a query string of _embed=cards. The results of the API calls for these functions will contain both the deck and the cards associated with the deck, so you won't have to make additional API calls to load the cards for each deck when you use these functions.
