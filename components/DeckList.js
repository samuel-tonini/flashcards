import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback
} from "react-native";
import { getDecks } from "../utils/api";
import { blue, gray } from "../utils/colors";

export default class DeckList extends Component {
  state = {
    decks: null
  };

  componentDidFocus = async () => {
    await getDecks()
      .then(value => JSON.parse(value))
      .then(decks => this.setState({ decks }));
  };

  componentDidMount() {
    this.subs = [
      this.props.navigation.addListener("didFocus", this.componentDidFocus)
    ];
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }

  render() {
    const { decks } = this.state;

    if (decks === null) {
      return null;
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={Object.values(decks)}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback
              onPress={() => {
                this.props.navigation.navigate("Deck", { deck: item });
              }}
            >
              <View style={styles.itemContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.card}>
                  {item.questions ? item.questions.length : 0} cards
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )}
          keyExtractor={item => item.title}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },
  itemContainer: {
    padding: 20
  },
  title: {
    fontSize: 40,
    color: blue,
    textAlign: "center"
  },
  card: {
    fontSize: 20,
    color: gray,
    textAlign: "center"
  },
  separator: {
    height: 1,
    backgroundColor: "#CED0CE"
  }
});
