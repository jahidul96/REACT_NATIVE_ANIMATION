import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FadeAniWithUseSharedVal from "./src/screens/reanimatedAndGestureAnim/FadeAniWithUseSharedVal";
import OnboardingScreen from "./src/screens/OnboardingScreen";
import GestureEvents from "./src/screens/reanimatedAndGestureAnim/GestureEvents";

const Stack = createNativeStackNavigator();

const App = () => {
  return <GestureEvents />;
};

export default App;
