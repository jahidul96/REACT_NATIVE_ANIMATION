import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
const HomeScreen = ({ navigation }) => {
  const logout = () => {
    AsyncStorage.removeItem("isAppFirstLaunched");
    navigation.navigate("OnboardingScreen");
  };
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>HomeScreen</Text>

      <TouchableOpacity style={{ marginTop: 20 }} onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;
