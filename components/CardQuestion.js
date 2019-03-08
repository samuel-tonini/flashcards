import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { blue, white, gray, green, red } from "../utils/colors";
import { addCardToDeck, getDeck } from "../utils/api";

export default class CardQuestion extends Component {
  state = {
    showAnswer: false,
    cardIndex: 0,
    totalCorrect: 0,
    deck: null
  };

  async componentDidMount() {
    const { deck: title } = this.props.navigation.state.params;
    await getDeck(title).then(deck => this.setState({ deck }));
  }

  handleToggleShowAnswer = () => {
    const { showAnswer } = this.state;
    this.setState({ showAnswer: !showAnswer });
  };

  handleNextQuestion = correct => {
    const { totalCorrect, cardIndex } = this.state;
    this.setState({
      totalCorrect: correct ? totalCorrect + 1 : totalCorrect,
      cardIndex: cardIndex + 1,
      showAnswer: false
    });
  };

  render() {
    const { showAnswer, deck, cardIndex, totalCorrect } = this.state;
    const { deck: title } = this.props.navigation.state.params;

    if (deck === null) return null;

    const totalQuestions = deck.questions.length;

    console.log("totalQuestions", totalQuestions);
    console.log("cardIndex", cardIndex);

    if (cardIndex >= totalQuestions) {
      return (
        <View style={styles.resultContainer}>
          <Text
            style={styles.title}
          >{`You had correct on ${totalCorrect} of ${totalQuestions} questions`}</Text>
          <TouchableOpacity
            style={styles.return}
            onPress={() => {
              this.props.navigation.navigate("Deck", {
                deck: title
              });
            }}
          >
            <Text style={styles.answerButtonText}>GO TO DECK</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.indicatorContainer}>
          <Text>{`${cardIndex + 1}/${totalQuestions}`}</Text>
        </View>
        <View style={styles.questionContainer}>
          <Text style={styles.title}>
            {showAnswer
              ? deck.questions[cardIndex].answer
              : deck.questions[cardIndex].question}
          </Text>
          <TouchableOpacity onPress={this.handleToggleShowAnswer}>
            <Text style={styles.button}>
              {showAnswer ? "QUESTION" : "ANSWER"}
            </Text>
          </TouchableOpacity>
        </View>
        {showAnswer && (
          <View style={styles.answerButtonContainer}>
            <TouchableOpacity
              style={styles.correct}
              onPress={() => this.handleNextQuestion(true)}
            >
              <Text style={styles.answerButtonText}>CORRECT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.incorrect}
              onPress={() => this.handleNextQuestion(false)}
            >
              <Text style={styles.answerButtonText}>INCORRECT</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  questionContainer: {
    flex: 6,
    justifyContent: "center",
    alignItems: "center"
  },
  indicatorContainer: {
    flex: 1,
    padding: 20
  },
  answerButtonContainer: {
    flex: 3
  },
  resultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    color: blue,
    fontSize: 22,
    textAlign: "center"
  },
  button: {
    color: gray,
    margin: 20
  },
  answerButtonText: {
    color: white
  },
  correct: {
    padding: 10,
    alignSelf: "center",
    borderRadius: 5,
    backgroundColor: green,
    margin: 20
  },
  incorrect: {
    backgroundColor: red,
    padding: 10,
    alignSelf: "center",
    borderRadius: 5,
    margin: 20
  },
  return: {
    backgroundColor: blue,
    padding: 10,
    alignSelf: "center",
    borderRadius: 5,
    margin: 20
  }
});
