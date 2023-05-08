import * as React from "react";
import {
  StatusBar,
  Image,
  FlatList,
  Animated,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import {
  FlingGestureHandler,
  Directions,
  GestureHandlerRootView,
  State,
} from "react-native-gesture-handler";
import { carouselData } from "../data/carouselData";
import { WIDTH } from "../utils/AppDimension";

const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
const ITEM_WIDTH = WIDTH * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const VISIBLE_ITEMS = 3;

const OverflowItems = ({ data, scrollXAnimated }) => {
  const inputRange = [-1, 0, 1];
  const translateY = scrollXAnimated.interpolate({
    inputRange,
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
  });

  return (
    <View style={styles.overflowContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {data.map((item, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <Text style={[styles.title]} numberOfLines={1}>
                {item.title}
              </Text>
              <View style={styles.itemContainerRow}>
                <Text style={[styles.location]}>
                  <EvilIcons
                    name="location"
                    size={16}
                    color="black"
                    style={{ marginRight: 5 }}
                  />
                  {item.location}
                </Text>
                <Text style={[styles.date]}>{item.date}</Text>
              </View>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
};

export default function FlatlistStackCarouselBannerAndTextAnimation() {
  const scrollXIndex = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(0);

  const setActiveIndex = React.useCallback((activeIndex) => {
    scrollXIndex.setValue(activeIndex);
    setIndex(activeIndex);
  });

  //   React.useEffect(() => {
  //     if (index === data.length - VISIBLE_ITEMS - 1) {
  //       // get new data
  //       // fetch more data
  //       const newData = [...data, ...data];
  //       setData(newData);
  //     }
  //   });

  React.useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FlingGestureHandler
        key="left"
        direction={Directions.LEFT}
        onHandlerStateChange={(ev) => {
          if (ev.nativeEvent.state === State.END) {
            if (index === carouselData.length - 1) {
              return;
            }
            setActiveIndex(index + 1);
          }
        }}
      >
        <FlingGestureHandler
          key="right"
          direction={Directions.RIGHT}
          onHandlerStateChange={(ev) => {
            if (ev.nativeEvent.state === State.END) {
              if (index === 0) {
                return;
              }
              setActiveIndex(index - 1);
            }
          }}
        >
          <View style={styles.container}>
            <StatusBar backgroundColor={"#f2f2f2"} barStyle={"dark-content"} />
            <OverflowItems
              data={carouselData}
              scrollXAnimated={scrollXAnimated}
            />
            <FlatList
              data={carouselData}
              keyExtractor={(_, index) => String(index)}
              horizontal
              inverted
              contentContainerStyle={{
                flex: 1,
                justifyContent: "center",
                padding: SPACING * 2,
                marginTop: 50,
              }}
              scrollEnabled={false}
              removeClippedSubviews={false}
              CellRendererComponent={({
                item,
                index,
                children,
                style,
                ...props
              }) => {
                const newStyle = [
                  style,
                  { zIndex: carouselData.length - index },
                ];
                return (
                  <View style={newStyle} index={index} {...props}>
                    {children}
                  </View>
                );
              }}
              renderItem={({ item, index }) => {
                const inputRange = [index - 1, index, index + 1];
                const translateX = scrollXAnimated.interpolate({
                  inputRange,
                  outputRange: [50, 0, -100],
                });
                const scale = scrollXAnimated.interpolate({
                  inputRange,
                  outputRange: [0.8, 1, 1.3],
                });
                const opacity = scrollXAnimated.interpolate({
                  inputRange,
                  outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
                });

                return (
                  <Animated.View
                    style={{
                      position: "absolute",
                      left: -ITEM_WIDTH / 2,
                      opacity,
                      transform: [
                        {
                          translateX,
                        },
                        { scale },
                      ],
                    }}
                  >
                    <Image
                      source={{ uri: item.poster }}
                      style={{
                        width: ITEM_WIDTH,
                        height: ITEM_HEIGHT,
                        borderRadius: 14,
                      }}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: -1,
  },
  location: {
    fontSize: 16,
  },
  date: {
    fontSize: 12,
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    padding: SPACING * 2,
  },
  itemContainerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  overflowContainer: {
    height: OVERFLOW_HEIGHT,
    overflow: "hidden",
  },
});
