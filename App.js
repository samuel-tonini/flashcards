import React from "react";
import { View, StatusBar } from "react-native";
import { Constants } from "expo";
import { blue } from "./utils/colors";
import { Navigator } from "./components/Navigator";

function AppStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

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
