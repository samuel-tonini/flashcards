import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { blue, white, gray } from "../utils/colors";

export default class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params;

    return {
      title: deck.title
    };
  };

  render() {
    const { deck } = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.card}>
          {deck.questions ? deck.questions.length : 0} cards
        </Text>
        <TouchableOpacity style={styles.addCardbutton}>
          <Text style={styles.addCardButtonText}>ADD CARD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quizButton}>
          <Text style={styles.quizButtonText}>START QUIZ</Text>
        </TouchableOpacity>
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
