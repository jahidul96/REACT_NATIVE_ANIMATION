import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Animated,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { carouselData } from "../data/carouselData";
import { WIDTH } from "../utils/AppDimension";
import {
  Directions,
  FlingGestureHandler,
  GestureHandlerRootView,
  State,
} from "react-native-gesture-handler";

const IMAGE_WIDTH = WIDTH * 0.7;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.5;
const VISIVAL_ITEM = 4;

const FlipUpAndDownCardAnimation = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const reactiveAnimated = useRef(new Animated.Value(0)).current;

  const setActiveSlide = useCallback((newIndex) => {
    setActiveIndex(newIndex);
    reactiveAnimated.setValue(newIndex);
  });

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactiveAnimated,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FlingGestureHandler
        key="DOWN"
        direction={Directions.DOWN}
        onHandlerStateChange={(ev) => {
          if (ev.nativeEvent.state === State.END) {
            if (activeIndex == 0) {
              return;
            }
            setActiveSlide(activeIndex - 1);
          }
        }}
      >
        <FlingGestureHandler
          key="UP"
          direction={Directions.UP}
          onHandlerStateChange={(ev) => {
            if (ev.nativeEvent.state === State.END) {
              if (carouselData.length - 1 === activeIndex) {
                return;
              }
              setActiveSlide(activeIndex + 1);
            }
          }}
        >
          <View style={styles.container}>
            <FlatList
              data={carouselData}
              scrollEnabled={false}
              contentContainerStyle={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              showsVerticalScrollIndicator={false}
              keyExtractor={(_, index) => index.toString()}
              CellRendererComponent={({
                index,
                item,
                children,
                style,
                ...props
              }) => {
                const newStyle = [
                  style,
                  {
                    zIndex: carouselData.length - index,
                    left: -IMAGE_WIDTH / 2,
                    top: -IMAGE_HEIGHT / 2,
                  },
                ];
                return (
                  <View index={index} style={newStyle} {...props}>
                    {children}
                  </View>
                );
              }}
              renderItem={({ item, index }) => {
                const inputRange = [index - 1, index, index + 1];
                const translateY = animatedValue.interpolate({
                  inputRange,
                  outputRange: [15, 0, -15],
                });

                const opacity = animatedValue.interpolate({
                  inputRange,
                  outputRange: [1, 1, 0],
                });
                return (
                  <Animated.View
                    style={{
                      position: "absolute",
                      opacity,
                      transform: [{ translateY }],
                    }}
                  >
                    <Image
                      source={{ uri: item.poster }}
                      style={styles.imageStyle}
                    />
                  </Animated.View>
                );
              }}
            />
          </View>
        </FlingGestureHandler>
      </FlingGestureHandler>
    </GestureHandlerRootView>
  );
};

export default FlipUpAndDownCardAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageStyle: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: 10,
  },
});
