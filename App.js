import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DragAndDrop from "./src/components/DragAndDrop";
import Paging from "./src/screens/Paging";
import ScrollVeriticalAnimation from "./src/components/ScrollVeriticalAnimation";
import OnboardingScreen from "./src/screens/OnboardingScreen";
import UserCardVerticalOpacityAnimation from "./src/screens/UserCardVerticalOpacityAnimation";
import FlatlistStackCarouselBannerAndTextAnimation from "./src/screens/FlatlistStackCarouselBannerAndTextAnimation";
import StackBannerCarousel from "./src/screens/StackBannerCarousel";

const Stack = createNativeStackNavigator();

const App = () => {
  return <StackBannerCarousel />;
};

export default App;
