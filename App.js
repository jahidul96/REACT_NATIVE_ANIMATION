import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DragAndDrop from "./src/components/DragAndDrop";
import Paging from "./src/screens/Paging";

const Stack = createNativeStackNavigator();

const App = () => {
  return <Paging />;
};

export default App;
