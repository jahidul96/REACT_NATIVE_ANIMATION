import { StyleSheet, Text, View } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  TapGestureHandler,
} from "react-native-gesture-handler";
import React from "react";
import Animated, {
  event,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const GestureEvents = () => {
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}
    >
      <MovingPanGesture />
    </GestureHandlerRootView>
  );
};

// OntapGesture
const OnTapGestureComp = () => {
  const tapState = useSharedValue(false);

  const onTapGestureEvent = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      tapState.value = true;
    },
    onEnd: (event, ctx) => {
      tapState.value = false;
    },
  });

  const aStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: tapState.value ? "blue" : "red",
      transform: [
        {
          scale: tapState.value ? withTiming(1.5, 300) : withTiming(1, 300),
        },
      ],
    };
  });
  return (
    <TapGestureHandler onGestureEvent={onTapGestureEvent}>
      <Animated.View style={[styles.box, aStyle]} />
    </TapGestureHandler>
  );
};

// moving pan gesture

const MovingPanGesture = () => {
  const state = useSharedValue(false);
  const startingPosition = 100;
  const x = useSharedValue(startingPosition);
  const y = useSharedValue(startingPosition);

  const onTap = useAnimatedGestureHandler({
    onStart: () => {
      state.value = true;
    },
    onActive: (event, ctx) => {
      x.value = startingPosition + event.translationX;
      y.value = startingPosition + event.translationY;
    },
    onEnd: (event, ctx) => {
      state.value = false;
      x.value = withSpring(startingPosition);
      y.value = withSpring(startingPosition);
    },
  });

  const aStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: state.value ? "blue" : "red",
      transform: [
        { translateX: x.value },
        { translateY: y.value },
        { scale: state.value ? 1.4 : 1 },
      ],
    };
  });
  return (
    <PanGestureHandler onGestureEvent={onTap}>
      <Animated.View style={[styles.box, aStyle]} />
    </PanGestureHandler>
  );
};

export default GestureEvents;

const styles = StyleSheet.create({
  box: {
    width: 120,
    height: 120,
    backgroundColor: "red",
    borderRadius: 100,
  },
});
