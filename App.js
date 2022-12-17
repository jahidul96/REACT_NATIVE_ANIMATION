import { StatusBar, StyleSheet, Text, View } from "react-native";
import DragAndDrop from "./src/components/DragAndDrop";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor="red" />
      <DragAndDrop />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
