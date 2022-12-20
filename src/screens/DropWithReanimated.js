import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";

import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

const DropWithReanimated = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: (event, context) => {
      if (event.absoluteY > 150) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.dropzone,
          {
            top: 0,
            height: 200,
            width: "100%",
            position: "absolute",
          },
        ]}
      ></View>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View
          style={[styles.square, { height: 100, width: 100 }, rStyle]}
        />
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dropzone: {
    backgroundColor: "rgba(0, 0, 256, 0.5)",
  },
  square: {
    borderRadius: 15,
    backgroundColor: "red",
  },
});

export default DropWithReanimated;
