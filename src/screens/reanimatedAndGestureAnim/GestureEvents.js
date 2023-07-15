import { ImageBackground, StyleSheet, Text, View } from "react-native";
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

const bg =
  "https://i.pinimg.com/originals/07/70/34/0770344658a5e5fe17140aeb2684a881.jpg";
const back =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXuNOqTR_wolt2EYQdnzDBUkUwJzuM7-VPWT9u2DtGcS2a9Y6AsA1FFklcVVG6BT9koh8&usqp=CAU";

const IMGWIDTH = "100%";
const IMGHEIGHT = "100%";

const GestureEvents = () => {
  return <ImageMoveGesture />;
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
    onStart: (event, ctx) => {
      state.value = true;
      ctx.startX = x.value;
      ctx.startY = y.value;
    },
    onActive: (event, ctx) => {
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
    },
    // onEnd: (event, ctx) => {
    //   state.value = false;
    //   x.value = withSpring(startingPosition);
    //   y.value = withSpring(startingPosition);
    // },
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

const ImageMoveGesture = () => {
  const gestureState = useSharedValue(false);
  const startingPosition = 0;
  const x = useSharedValue(startingPosition);
  const y = useSharedValue(startingPosition);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      gestureState.value = true;
      ctx.startX = x.value;
      ctx.startY = y.value;
    },
    onActive: (event, ctx) => {
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
    },
    onEnd: (event, ctx) => {
      gestureState.value = false;
      x.value = withSpring(startingPosition);
      y.value = withSpring(startingPosition);
    },
  });

  const imgAnimStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: x.value },
        { translateY: y.value },
        { scale: gestureState.value ? 0.6 : 1 },
      ],
      opacity: gestureState.value ? 0.7 : 1,
      borderRadius: gestureState.value ? 10 : 0,
    };
  });
  return (
    <ImageBackground style={styles.backImgStyle} source={{ uri: back }}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.Image
          source={{ uri: bg }}
          style={[styles.imageStyle, imgAnimStyle]}
        />
      </PanGestureHandler>
    </ImageBackground>
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
  imgWrapper: {
    flex: 1,
    backgroundColor: "red",
  },
  imageStyle: {
    width: IMGWIDTH,
    height: IMGHEIGHT,
  },

  backImgStyle: {
    flex: 1,
  },
});
