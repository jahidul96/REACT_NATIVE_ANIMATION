import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FadeAniWithUseSharedVal from "./src/screens/reanimatedAndGestureAnim/FadeAniWithUseSharedVal";
import OnboardingScreen from "./src/screens/OnboardingScreen";
import GestureEvents from "./src/screens/reanimatedAndGestureAnim/GestureEvents";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import ScrollVeriticalAnimation from "./src/screens/scrlAnimation/ScrollVeriticalAnimation";

const Stack = createNativeStackNavigator();

const Wrapper = () => {
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}
    >
      <View style={styles.topBar}>
        <Text style={styles.textStyle}>Playing With Animation</Text>
      </View>
      <GestureEvents />
    </GestureHandlerRootView>
  );
};

const App = () => {
  return <Wrapper />;
};

export default App;

const styles = StyleSheet.create({
  topBar: {
    width: "100%",
    height: 100,
    alignItems: "center",
    backgroundColor: "blue",
    justifyContent: "center",
    paddingTop: 30,
  },
  textStyle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "700",
  },
});
