import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { blue, white, gray } from "../utils/colors";
import { getDeck } from "../utils/api";

export default class Deck extends Component {
  state = {
    deck: null
  };

  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params;

    return {
      title: deck
    };
  };

  componentDidFocus = async () => {
    const { deck: title } = this.props.navigation.state.params;
    await getDeck(title).then(deck => this.setState({ deck }));
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
    const { deck } = this.state;

    if (deck === null) {
      return null;
    }

    const totalQuestions = deck.questions ? deck.questions.length : 0;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.card}>{totalQuestions} cards</Text>
        <TouchableOpacity
          style={styles.addCardbutton}
          onPress={() => {
            this.props.navigation.navigate("CardAdd", {
              deck: deck.title
            });
          }}
        >
          <Text style={styles.addCardButtonText}>ADD CARD</Text>
        </TouchableOpacity>
        {totalQuestions > 0 && (
          <TouchableOpacity
            style={styles.quizButton}
            onPress={() => {
              this.props.navigation.navigate("CardQuestion", {
                deck: deck.title
              });
            }}
          >
            <Text style={styles.quizButtonText}>START QUIZ</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    color: blue,
    fontSize: 30,
    textAlign: "center"
  },
  card: {
    color: gray,
    fontSize: 20,
    textAlign: "center"
  },
  buttonContainer: {
    flexDirection: "row"
  },
  addCardbutton: {
    marginTop: 30,
    marginBottom: 10,
    padding: 10,
    backgroundColor: white,
    borderColor: blue,
    borderWidth: 1,
    alignSelf: "center",
    borderRadius: 5
  },
  addCardButtonText: {
    color: blue,
    fontSize: 20
  },
  quizButton: {
    padding: 10,
    backgroundColor: blue,
    alignSelf: "center",
    borderRadius: 5
  },
  quizButtonText: {
    color: white,
    fontSize: 20
  }
});
