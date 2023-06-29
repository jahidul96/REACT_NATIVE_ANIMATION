import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FadeAniWithUseSharedVal from "./src/screens/reanimatedAndGestureAnim/FadeAniWithUseSharedVal";

const Stack = createNativeStackNavigator();

const App = () => {
  return <FadeAniWithUseSharedVal />;
};

export default App;
