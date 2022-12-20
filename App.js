import { StatusBar, StyleSheet, Text, View } from "react-native";
import { DragAndDelete } from "./src/components/DragAndDelete";
import DragAndDrop from "./src/components/DragAndDrop";
import DropWithReanimated from "./src/screens/DropWithReanimated";
import Example from "./src/screens/Example";
import FamilyTree from "./src/screens/FamilyTree";
import Zoom from "./src/screens/Zoom";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor="red" />
      {/* <DragAndDrop /> */}

      {/* <DragAndDelete /> */}

      <Zoom />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
