import React from "react";
import { StyleSheet, Text, View, StatusBar, Platform } from "react-native";
import { Constants } from "expo";
import { blue, white } from "./utils/colors";
import {
  createMaterialTopTabNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import DeckNew from "./components/DeckNew";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DeckList from "./components/DeckList";
import Deck from "./components/Deck";
import CardAdd from "./components/CardAdd";
import CardQuestion from "./components/CardQuestion";

function AppStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const Tabs = createMaterialTopTabNavigator(
  {
    DeckList: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: "Decks",
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="cards-playing-outline"
            size={30}
            color={tintColor}
          />
        )
      }
    },
    DeckNew: {
      screen: DeckNew,
      navigationOptions: {
        tabBarLabel: "New Deck",
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons name="new-box" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === "ios" ? blue : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === "ios" ? white : blue,
        shadowColor: "rgba(0,0,0,0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);

const Stack = createStackNavigator({
  Home: {
    screen: Tabs
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue
      }
    }
  },
  CardAdd: {
    screen: CardAdd,
    navigationOptions: {
      title: "Add Card",
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue
      }
    }
  },
  CardQuestion: {
    screen: CardQuestion,
    navigationOptions: {
      title: "Quiz",
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue
      }
    }
  }
});

const Navigator = createAppContainer(Stack);

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppStatusBar backgroundColor={blue} />
        <Navigator />
      </View>
    );
  }
}
