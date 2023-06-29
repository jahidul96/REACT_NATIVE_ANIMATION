import {
  Animated,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import React, { useEffect, useRef } from "react";

const Btn = ({ text, onPress }) => {
  return (
    <TouchableNativeFeedback
      onPress={onPress}
      accessibilityRole="button"
      background={TouchableNativeFeedback.Ripple("#fff")}
    >
      <View style={styles.btnStyle}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};
const FadeAnimScreen = () => {
  const fadein = useRef(new Animated.Value(0)).current;

  const FadeinAnim = () => {
    Animated.timing(fadein, {
      useNativeDriver: true,
      duration: 1000,
      toValue: 1,
    }).start();
  };
  const FadeOutAnim = () => {
    Animated.timing(fadein, {
      useNativeDriver: true,
      toValue: 0,
      duration: 1000,
    }).start();
  };
  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.textWrapper, opacity: fadein }}>
        <Text style={styles.text}>This is fade in text</Text>
      </Animated.View>
      <Btn text={"FadeIN"} onPress={FadeinAnim} />
      <Btn text={"FadeOut"} onPress={FadeOutAnim} />
    </View>
  );
};

export default FadeAnimScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  textWrapper: {
    width: "100%",
    height: 60,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  btnStyle: {
    backgroundColor: "green",
    width: "100%",
    height: 60,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
});
