import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { WIDTH } from "../../utils/AppDimension";
import { membersData } from "../../data/people";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const StorieSeenSnapChat = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.headerWrapper}>
        <Text style={styles.titleText}>StorieSeenDetailsAnim</Text>
      </View>

      {/* horizontal stories */}
      <View
        style={{
          height: 90,
          paddingTop: 10,
        }}
      >
        <ScrollView
          horizontal
          contentContainerStyle={{ paddingHorizontal: 10 }}
        >
          {membersData.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.storyItemStyle}
              onPress={() =>
                navigation.navigate("StoryDetails", { uri: item.photoUrl })
              }
            >
              <Image
                source={{ uri: item.photoUrl }}
                style={styles.imageStyle}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* vertical stories */}

      <View style={styles.verticalStoryWrapper}>
        {membersData.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.verticalstoryItemStyle}
            onPress={() =>
              navigation.navigate("StoryDetails", { uri: item.photoUrl })
            }
          >
            <Image
              source={{ uri: item.photoUrl }}
              style={styles.verticalimageStyle}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export const StoryDetails = ({ route, navigation }) => {
  const { uri } = route.params;
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scaleVal = useSharedValue(1);
  const isDragStart = useSharedValue(false);

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      x.value = event.translationX * 0.8;
      y.value = event.translationY * 0.8;
      scaleVal.value = 0.8;
      isDragStart.value = true;
    })
    .onEnd(() => {
      if (y.value > 300) {
        opacity.value = withTiming(0);
        runOnJS(navigation.goBack)();
      }
      x.value = withTiming(0);
      y.value = withTiming(0);
      scaleVal.value = withTiming(1);
      isDragStart.value = false;
    });

  const animStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      opacity.value,
      [0, 1],
      ["transparent", "white"]
    );
    return {
      transform: [
        { translateX: x.value },
        { translateY: y.value },
        { scale: scaleVal.value },
      ],
      backgroundColor,
      borderRadius: isDragStart.value ? 20 : 0,
      overflow: "hidden",
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, animStyle]}>
        <Image
          source={{ uri }}
          style={{
            width: WIDTH,
            height: 300,
          }}
        />
      </Animated.View>
    </GestureDetector>
  );
};

export default StorieSeenSnapChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerWrapper: {
    width: WIDTH,
    height: 100,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "blue",
    paddingTop: 20,
  },
  titleText: {
    fontSize: 20,
    color: "white",
  },

  storyItemStyle: {
    width: 70,
    height: 70,
    alignItems: "center",
  },
  imageStyle: {
    width: 60,
    height: 60,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "red",
    marginRight: 10,
  },

  verticalStoryWrapper: {
    width: WIDTH,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 5,
    justifyContent: "space-between",
  },
  verticalstoryItemStyle: {
    width: "47%",
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },
  verticalimageStyle: {
    flex: 1,
  },
});
