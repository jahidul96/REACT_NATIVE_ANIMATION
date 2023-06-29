import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const FadeAniWithUseSharedVal = () => {
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const changeOpacity = (text) => {
    if (text == "show") {
      opacity.value = 1;
    } else {
      opacity.value = 0;
    }
  };
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.textWrapper, animatedStyle]}>
        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          FadeAniWithUseSharedVal
        </Text>
      </Animated.View>

      <Button title="Show" onPress={() => changeOpacity("show")} />
      <Button title="Hide" onPress={() => changeOpacity("hide")} />
    </View>
  );
};

export default FadeAniWithUseSharedVal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  textWrapper: {
    backgroundColor: "red",
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 20,
    marginBottom: 20,
  },
});
