import { StatusBar, StyleSheet, Text, View } from "react-native";
import ScrollVeriticalAnimation from "./src/components/ScrollVeriticalAnimation";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor="red" />
      <ScrollVeriticalAnimation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
