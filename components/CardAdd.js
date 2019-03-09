import React, { PureComponent } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { blue, white } from "../utils/colors";
import { addCardToDeck } from "../utils/api";

export default class CardAdd extends PureComponent {
  state = {
    question: "",
    answer: ""
  };

  handleQuestionChange = question => {
    this.setState({ question });
  };

  handleAnswerChange = answer => {
    this.setState({ answer });
  };

  handleSubmit = () => {
    const { deck: title } = this.props.navigation.state.params;
    const { question, answer } = this.state;

    this.setState({ question: "", answer: "" });
    addCardToDeck(title, { question, answer });
    this.props.navigation.navigate("Deck", { deck: title });
  };

  render() {
    const { question, answer } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Question</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={question}
            onChangeText={this.handleQuestionChange}
          />
        </View>
        <Text style={styles.title}>Answer</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={answer}
            onChangeText={this.handleAnswerChange}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
          <Text style={styles.buttonText}>SUBMIT</Text>
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
    fontSize: 22,
    textAlign: "center"
  },
  inputContainer: {
    borderColor: blue,
    borderWidth: 1,
    margin: 15,
    width: 300
  },
  input: {
    color: blue,
    fontSize: 22,
    backgroundColor: "#ffffff",
    paddingLeft: 5,
    paddingRight: 5
  },
  button: {
    padding: 10,
    backgroundColor: blue,
    alignSelf: "center",
    borderRadius: 5,
    margin: 20
  },
  buttonText: {
    color: white,
    fontSize: 20
  }
});
