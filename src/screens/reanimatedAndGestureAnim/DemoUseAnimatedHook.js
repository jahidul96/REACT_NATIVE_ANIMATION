import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const DemoUseAnimatedHook = () => {
  const offset = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: offset.value,
        },
      ],
    };
  });

  const random = () => {
    offset.value = withSpring(Math.random() * 300);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyle]} />

      <Button title="Click me" onPress={random} />
    </View>
  );
};

export default DemoUseAnimatedHook;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: "red",
    borderRadius: 10,
    marginBottom: 40,
  },
});
