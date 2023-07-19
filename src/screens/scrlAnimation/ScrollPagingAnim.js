import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { HEIGHT, WIDTH } from "../../utils/AppDimension";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { smallImgData } from "../../data/smallData";

const ScrollPagingAnim = () => {
  const translateX = useSharedValue(0);
  const onScrollEvent = useAnimatedScrollHandler((event) => {
    // console.log(event.contentOffset.x);
    translateX.value = withTiming(event.contentOffset.x, 1000);
    // translateX.value = withSpring(event.contentOffset.x);
    // translateX.value = event.contentOffset.x;
  });
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View style={styles.appBar}>
        <Text style={styles.text}>ScrollAnimation</Text>
      </View>
      <Animated.ScrollView
        pagingEnabled={true}
        snapToInterval={WIDTH}
        scrollEventThrottle={16}
        decelerationRate={"normal"}
        onScroll={onScrollEvent}
        horizontal
      >
        {smallImgData.map((item, index) => (
          <PageComp
            key={item.id}
            index={index}
            data={item}
            translateX={translateX}
          />
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const PageComp = ({ index, translateX, data }) => {
  const animStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      [(index - 1) * WIDTH, index * WIDTH, (index + 1) * WIDTH],
      [0, 1, 0]
    );
    const opacity = interpolate(
      translateX.value,
      [(index - 1) * WIDTH, index * WIDTH, (index + 1) * WIDTH],
      [0, 1, 0]
    );
    return {
      transform: [{ scale: scale }],
      opacity,
    };
  });
  return (
    <View style={styles.pageCompContainer}>
      <Animated.View
        style={[styles.box, { backgroundColor: data.bg }, animStyle]}
      >
        <Image source={{ uri: data.img }} style={styles.imgStyle} />
      </Animated.View>
    </View>
  );
};

export default ScrollPagingAnim;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appBar: {
    width: WIDTH,
    height: HEIGHT * 0.2 - 50,
    backgroundColor: "#40128B",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  pageCompContainer: {
    width: WIDTH,
    height: HEIGHT * 0.8 + 50,
    justifyContent: "center",
    alignItems: "center",
  },

  box: {
    width: 280,
    height: 280,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  imgStyle: {
    width: "100%",
    height: "100%",
  },
});
