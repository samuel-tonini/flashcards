import { AsyncStorage } from "react-native";

const DECK_KEY = "Flashcards:decks";

export function getDecks() {
  return AsyncStorage.getItem(DECK_KEY);
}

export function getDeck(title) {
  return getDecks().then(decks =>
    Object.keys(decks).filter(deck => deck.title === title)
  );
}

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(
    DECK_KEY,
    JSON.stringify({ [title]: { title } })
  );
}

export function addCardToDeck(title, card) {
  return AsyncStorage.mergeItem(
    DECK_KEY,
    JSON.stringify({ [title]: { card } })
  );
}
