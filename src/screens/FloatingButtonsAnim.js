import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";

const CHATBTNYPOSITIONY = -80;
const CALLBTNPOSITIONY = -150;
const LINKBTNPOSITIONY = -220;

const AnimatedChatBtn = Animated.createAnimatedComponent(Pressable);

const FloatingButtonsAnim = () => {
  const pressd = useSharedValue(false);
  const chatBtnY = useSharedValue(0);
  const greenBtnY = useSharedValue(0);
  const linkBtnY = useSharedValue(0);

  const toggleBtn = () => {
    if (pressd.value) {
      chatBtnY.value = withTiming(0, { duration: 500 });
      greenBtnY.value = withTiming(0, { duration: 500 });
      linkBtnY.value = withTiming(0, { duration: 500 });
      pressd.value = false;
    } else {
      chatBtnY.value = withTiming(CHATBTNYPOSITIONY, { duration: 500 });
      greenBtnY.value = withTiming(CALLBTNPOSITIONY, { duration: 500 });
      linkBtnY.value = withTiming(LINKBTNPOSITIONY, { duration: 500 });
      pressd.value = true;
    }
  };

  const chatBtnAnimStyle = useAnimatedStyle(() => {
    const chatBtnScale = interpolate(
      chatBtnY.value,
      [CHATBTNYPOSITIONY, 0],
      [1, 0]
    );
    return {
      transform: [{ translateY: chatBtnY.value }, { scale: chatBtnScale }],
    };
  });
  const greenBtnAnimStyle = useAnimatedStyle(() => {
    const greenBtnScale = interpolate(
      greenBtnY.value,
      [CALLBTNPOSITIONY, 0],
      [1, 0]
    );
    return {
      transform: [{ translateY: greenBtnY.value }, { scale: greenBtnScale }],
    };
  });
  const linkBtnAnimStyle = useAnimatedStyle(() => {
    const linkBtnScale = interpolate(
      linkBtnY.value,
      [LINKBTNPOSITIONY, 0],
      [1, 0]
    );
    return {
      transform: [{ translateY: linkBtnY.value }, { scale: linkBtnScale }],
    };
  });
  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <Text style={styles.text}>Animated FloatingButtons</Text>
      </View>
      <AnimatedChatBtn
        style={[
          styles.btnStyle,
          { backgroundColor: "yellow", zIndex: -1 },
          linkBtnAnimStyle,
        ]}
      >
        <FontAwesome name="snapchat" size={24} color="black" />
      </AnimatedChatBtn>
      <AnimatedChatBtn
        style={[
          styles.btnStyle,
          { backgroundColor: "green", zIndex: -1 },
          greenBtnAnimStyle,
        ]}
      >
        <AntDesign name="wechat" size={24} color="#fff" />
      </AnimatedChatBtn>
      <AnimatedChatBtn
        style={[
          styles.btnStyle,
          { backgroundColor: "red", zIndex: -1 },
          chatBtnAnimStyle,
        ]}
      >
        <Feather name="phone-call" size={24} color="#fff" />
      </AnimatedChatBtn>

      <Pressable
        style={[styles.btnStyle, { backgroundColor: "blue" }]}
        onPress={toggleBtn}
      >
        <AntDesign name="pluscircleo" size={24} color="#fff" />
      </Pressable>
    </View>
  );
};

// CircularFloatingButtons
const callBtnPosY = -80;
const chatBtnPosY = -30;
const chatBtnPosX = -80;

export const CircularFloatingButtons = () => {
  const pressd = useSharedValue(false);
  const callBtnY = useSharedValue(0);
  const chatBtnY = useSharedValue(0);
  const chatBtnX = useSharedValue(0);

  const toggleBtn = () => {
    if (pressd.value) {
      callBtnY.value = withTiming(0, { duration: 500 });
      chatBtnY.value = withTiming(0, { duration: 500 });
      chatBtnX.value = withTiming(0, { duration: 500 });
      pressd.value = false;
    } else {
      callBtnY.value = withTiming(callBtnPosY, { duration: 500 });
      chatBtnY.value = withTiming(chatBtnPosY, { duration: 500 });
      chatBtnX.value = withTiming(chatBtnPosX, { duration: 500 });
      pressd.value = true;
    }
  };

  const callBtnAnimStyle = useAnimatedStyle(() => {
    const scale = interpolate(callBtnY.value, [callBtnPosY, 1], [1, 0]);
    const opacity = interpolate(callBtnY.value, [callBtnPosY, 0.5], [1, 0.5]);
    return {
      transform: [{ translateY: callBtnY.value }, { scale }],
      opacity,
    };
  });

  const chatBtnAnimStyle = useAnimatedStyle(() => {
    const scale = interpolate(chatBtnY.value, [chatBtnPosY, 1], [1, 0]);
    return {
      transform: [
        { translateY: chatBtnY.value },
        { translateX: chatBtnX.value },
        { scale },
      ],
    };
  });
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={styles.appBar}>
          <Text style={styles.text}>Animated FloatingButtons</Text>
        </View>

        {/* call btn */}
        <AnimatedChatBtn
          style={[
            styles.btnStyle,
            { backgroundColor: "red", zIndex: 999 },
            callBtnAnimStyle,
          ]}
        >
          <AntDesign name="wechat" size={24} color="#fff" />
        </AnimatedChatBtn>
        {/* chat btn */}
        <AnimatedChatBtn
          style={[
            styles.btnStyle,
            { backgroundColor: "green", zIndex: 999 },
            chatBtnAnimStyle,
          ]}
        >
          <Feather name="phone-call" size={24} color="#fff" />
        </AnimatedChatBtn>

        <Pressable
          style={[styles.btnStyle, { backgroundColor: "blue" }]}
          onPress={toggleBtn}
        >
          <AntDesign name="pluscircleo" size={24} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
};

export default FloatingButtonsAnim;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appBar: {
    width: "100%",
    height: 100,
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor: "blue",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  btnStyle: {
    width: 60,
    height: 60,
    backgroundColor: "blue",
    borderRadius: 100,
    position: "absolute",
    right: 30,
    bottom: 30,
    zIndex: 999,
    justifyContent: "center",
    alignItems: "center",
  },
});
