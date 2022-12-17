import { StatusBar, StyleSheet, Text, View } from "react-native";
import { DragAndDelete } from "./src/components/DragAndDelete";
import DragAndDrop from "./src/components/DragAndDrop";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor="red" />
      {/* <DragAndDrop /> */}

      <DragAndDelete />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
