import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useRef } from "react";
import { WIDTH } from "../../utils/AppDimension";
import { smallImgData } from "../../data/smallData";
import { AntDesign } from "@expo/vector-icons";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AnimatedBtn = Animated.createAnimatedComponent(TouchableOpacity);

const ImageSliderReanimated = () => {
  const scrollRef = useRef();
  const translateX = useSharedValue(0);

  // on Scroll handler value detector
  const onScrollHanlder = useAnimatedScrollHandler({
    onScroll: (event) => {
      // console.log(event.contentOffset.x);
      translateX.value = event.contentOffset.x;
    },
  });

  //  activePage value
  const activePage = useDerivedValue(() => {
    return Math.round(translateX.value / WIDTH);
  });

  // goTo Prevslider Btn
  const goToSliderFunc = useCallback((text) => {
    console.log(text);

    if (text == "prev") {
      if (activePage.value === 0) return;
      scrollRef?.current.scrollTo({ x: WIDTH * (activePage.value - 1) });
    } else {
      if (activePage.value === smallImgData.length - 1) return;
      scrollRef?.current.scrollTo({ x: WIDTH * (activePage.value + 1) });
    }
  }, []);

  // nextBtn Animation
  const nextBtnAnimStyle = useAnimatedStyle(() => {
    const opacity =
      activePage.value === smallImgData.length - 1
        ? withTiming(0)
        : withTiming(1);
    return {
      opacity,
    };
  });

  // prevBtn Animation
  const prevBtnAnimStyle = useAnimatedStyle(() => {
    const opacity = activePage.value === 0 ? withTiming(0) : withTiming(1);
    return {
      opacity,
    };
  });
  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>ImageSliderWithReanimated</Text>
      </View>

      <View style={styles.contentWrapper}>
        {/* scrollable items */}
        <View style={styles.sliderWrapper}>
          <Animated.ScrollView
            ref={scrollRef}
            horizontal
            scrollEventThrottle={16}
            pagingEnabled
            onScroll={onScrollHanlder}
          >
            {smallImgData.map((data, index) => (
              <Slider key={data.id} data={data} index={index} />
            ))}
          </Animated.ScrollView>
        </View>

        {/* footer */}
        <View style={styles.footerContainer}>
          {/* prevIcon */}
          <AnimatedBtn
            onPress={() => goToSliderFunc("prev")}
            style={[styles.btnContainer, prevBtnAnimStyle]}
          >
            <AntDesign name="arrowleft" size={24} color="black" />
          </AnimatedBtn>

          {/* dots indicator */}
          <View style={styles.dotsWrapper}>
            {smallImgData.map((_, index) => (
              <Dot key={index} index={index} activePage={activePage} />
            ))}
          </View>

          {/* nextIcon */}
          <AnimatedBtn
            onPress={() => goToSliderFunc("next")}
            style={[styles.btnContainer, nextBtnAnimStyle]}
          >
            <AntDesign name="arrowright" size={24} color="black" />
          </AnimatedBtn>
        </View>
      </View>
    </View>
  );
};

export default ImageSliderReanimated;

const Slider = ({ data, index }) => {
  return (
    <View style={[styles.itemContainer]}>
      <Image source={{ uri: data.img }} style={styles.imgStyle} />
    </View>
  );
};

const Dot = ({ index, activePage }) => {
  const animStyle = useAnimatedStyle(() => {
    return {
      backgroundColor:
        activePage.value == index
          ? withTiming("black", { duration: 300 })
          : withTiming("#fff", { duration: 300 }),
    };
  });
  return <Animated.View style={[styles.dotContainer, animStyle]} />;
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

  contentWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sliderWrapper: {
    width: "100%",
    height: 330,
  },
  itemContainer: {
    width: WIDTH,
    height: 300,
  },
  imgStyle: {
    flex: 1,
  },
  footerContainer: {
    width: WIDTH,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  dotsWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dotContainer: {
    width: 15,
    height: 15,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 10,
  },
  btnContainer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
