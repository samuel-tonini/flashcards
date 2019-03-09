import React from "react";
import { Platform } from "react-native";
import { blue, white } from "../utils/colors";
import {
  createMaterialTopTabNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import DeckNew from "./DeckNew";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DeckList from "./DeckList";
import Deck from "./Deck";
import CardAdd from "./CardAdd";
import CardQuestion from "./CardQuestion";

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

export const Navigator = createAppContainer(Stack);
