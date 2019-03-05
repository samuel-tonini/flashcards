import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { blue, white } from "../utils/colors";
import { saveDeckTitle } from "../utils/api";

export default class DeckNew extends Component {
  state = {
    title: ""
  };

  handleInputChange = title => {
    this.setState({ title });
  };

  handleSubmit = () => {
    const { title } = this.state;
    this.setState({ title: "" });
    saveDeckTitle(title);
    this.props.navigation.navigate("DeckList");
  };

  render() {
    const { title } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>What's the title of your new deck?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={this.handleInputChange}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
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
