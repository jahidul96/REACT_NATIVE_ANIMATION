import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CircularProgress from "./src/screens/CircularProgress";

const Stack = createNativeStackNavigator();

let progress = 0.6;

const App = () => {
  return <CircularProgress progress={progress} />;
};

export default App;
