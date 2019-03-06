import { AsyncStorage } from "react-native";

const DECK_KEY = "Flashcards:decks";

export function getDecks() {
  return AsyncStorage.getItem(DECK_KEY).then(value => JSON.parse(value));
}

export function getDeck(title) {
  return getDecks().then(decks => decks[title]);
}

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(
    DECK_KEY,
    JSON.stringify({ [title]: { title } })
  );
}

export function addCardToDeck(title, card) {
  return getDeck(title).then(deck => {
    const { questions = [] } = deck;
    questions.push(card);

    const result = { ...deck, questions };

    AsyncStorage.mergeItem(DECK_KEY, JSON.stringify({ [deck.title]: result }));

    return result;
  });
}
