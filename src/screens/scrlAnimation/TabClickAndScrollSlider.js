import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useRef } from "react";
import { HEIGHT, WIDTH } from "../../utils/AppDimension";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const tabs = ["Recent", "Gallery"];

const TabClickAndScrollSlider = () => {
  const translateX = useSharedValue(0);

  const scrollRef = useRef();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translateX.value = event.contentOffset.x;
      //   console.log(event.contentOffset.x);
    },
  });

  const activeTab = useDerivedValue(() => {
    return Math.round(translateX.value / WIDTH);
  });

  const changeTab = useCallback((text) => {
    if (text == "Recent") {
      scrollRef?.current.scrollTo({ x: 0 });
    } else {
      scrollRef?.current.scrollTo({ x: WIDTH });
    }
  }, []);

  return (
    <View style={styles.container}>
      {/* appbar content */}
      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>Custome Slider With reanimated</Text>
      </View>

      {/* tabs/slider */}
      <View style={styles.tabWrapper}>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            data={tab}
            activeTab={activeTab}
            index={index}
            onPress={changeTab}
          />
        ))}
      </View>

      {/* scroll content/ */}
      <View style={styles.scrollWrapper}>
        <Animated.ScrollView
          ref={scrollRef}
          horizontal
          bounces={false}
          pagingEnabled
          onScroll={scrollHandler}
        >
          {/* recent Tab content */}
          <View style={[styles.scrollTabStyle]}>
            <Text style={styles.tabTitleStyle}>Recent Tab</Text>
          </View>
          {/* Gallery Tab content */}
          <View style={[styles.scrollTabStyle]}>
            <Text style={styles.tabTitleStyle}>Gallery Tab</Text>
          </View>
        </Animated.ScrollView>
      </View>
    </View>
  );
};

export default TabClickAndScrollSlider;

const Tab = ({ data, activeTab, index, onPress }) => {
  const tabAnimStyle = useAnimatedStyle(() => {
    return {
      borderBottomColor:
        activeTab.value === index
          ? withTiming("blue", { duration: 300 })
          : withTiming("transparent", { duration: 300 }),
      borderBottomWidth: withTiming(4, { duration: 300 }),
    };
  });

  const animStyle = useAnimatedStyle(() => {
    return {
      backgroundColor:
        activeTab.value === index
          ? withTiming("green", { duration: 300 })
          : withTiming("transparent", { duration: 300 }),
      transform: [
        {
          translateX: withTiming(0, { duration: 300 }),
        },
      ],
    };
  });
  return (
    <TouchableOpacity style={[styles.tabStyle]} onPress={() => onPress(data)}>
      <Text style={styles.tabTitleStyle}>{data}</Text>
      {/* animatableBottomBar/  */}
      <Animated.View style={[styles.animatableBottomBarStyle, animStyle]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appBar: {
    width: WIDTH,
    height: 100,
    backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingTop: 30,
    justifyContent: "center",
  },
  appBarTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },

  tabWrapper: {
    width: WIDTH,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: "red",
  },

  tabStyle: {
    width: WIDTH / 2,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  tabTitleStyle: {
    fontSize: 18,
    fontWeight: "600",
  },
  scrollWrapper: {
    flex: 1,
  },
  scrollTabStyle: {
    width: WIDTH,
    height: HEIGHT - 200,
    justifyContent: "center",
    alignItems: "center",
  },
  animatableBottomBarStyle: {
    width: WIDTH / 2,
    height: 4,
    position: "absolute",
    top: 55,
  },
});
