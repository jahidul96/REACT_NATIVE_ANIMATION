import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  GestureHandlerRootView,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const bg =
  "https://i.pinimg.com/originals/07/70/34/0770344658a5e5fe17140aeb2684a881.jpg";

const BkashTopBar = () => {
  const offset = useSharedValue(0);
  const [showBal, setShowBal] = useState(false);

  const toggleFunc = () => {
    offset.value = withTiming(0, {
      duration: 500,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    setShowBal(false);

    setTimeout(() => {
      offset.value = withTiming(100, {
        duration: 500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
      setShowBal(true);

      setTimeout(() => {
        offset.value = withTiming(0, {
          duration: 500,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });
        setShowBal(false);
      }, 5000); // Set the delay for resetting the offset value
    }, 300);
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.topAppBar}>
        <Image source={{ uri: bg }} style={styles.imgStyle} />

        <TouchableOpacity
          style={styles.moneyBox}
          activeOpacity={0.7}
          onPress={toggleFunc}
        >
          <View style={styles.tapBoxWrapper}>
            <Animated.View style={[styles.togglerBox, animatedStyles]} />
            {!showBal ? (
              <Text style={[styles.seeBalText]}>Tap to see</Text>
            ) : (
              <Text style={[styles.seeBalText, { marginLeft: -20 }]}>
                4,000 Tk
              </Text>
            )}
          </View>
        </TouchableOpacity>
        <View style={{ flex: 1 }}></View>
        <AntDesign name="setting" size={24} color="#fff" />
      </View>
    </GestureHandlerRootView>
  );
};

export default BkashTopBar;

const styles = StyleSheet.create({
  topAppBar: {
    width: "100%",
    height: 100,
    backgroundColor: "#d12053",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
    paddingHorizontal: 10,
    paddingTop: 30,
  },
  imgStyle: {
    width: 45,
    height: 45,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#fff",
  },
  moneyBox: {
    width: 150,
    height: 30,
    backgroundColor: "#fff",
    borderRadius: 30,
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  text: {},
  seeBalText: {
    marginLeft: 10,
  },
  tapBoxWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  togglerBox: {
    width: 23,
    height: 23,
    borderRadius: 100,
    backgroundColor: "red",
  },
});
