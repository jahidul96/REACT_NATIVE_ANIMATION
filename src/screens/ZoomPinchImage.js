import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  GestureHandlerRootView,
  PinchGestureHandler,
} from "react-native-gesture-handler";
import { imgUri } from "../utils/FileExports";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const AnimatedImgComp = Animated.createAnimatedComponent(Image);

const ZoomPinchImage = () => {
  const pinchVal = useSharedValue(1);

  const onGestureEvent = useAnimatedGestureHandler({
    onActive: (event, ctx) => {
      //   console.log(event);
      pinchVal.value = event.scale;
    },
    onEnd: (event, ctx) => {
      pinchVal.value = withTiming(1, 1000);
    },
  });

  const animStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pinchVal.value }],
    };
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PinchGestureHandler onGestureEvent={onGestureEvent}>
        <AnimatedImgComp
          source={{ uri: imgUri }}
          style={[{ flex: 1 }, animStyle]}
        />
      </PinchGestureHandler>
    </GestureHandlerRootView>
  );
};

export default ZoomPinchImage;

const styles = StyleSheet.create({});
