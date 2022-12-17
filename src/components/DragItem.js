import { Animated, PanResponder, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";

const DragItem = ({ data }) => {
  const pan = useRef(new Animated.ValueXY()).current;

  console.log(pan.x);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;
  return (
    <Animated.View
      style={{
        transform: [{ translateX: pan.x }, { translateY: pan.y }],
      }}
      {...panResponder.panHandlers}
    >
      <View style={styles.box}>
        <Text style={styles.text}>{data.letter}</Text>
      </View>
    </Animated.View>
  );
};

export default DragItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold",
  },
  box: {
    height: 60,
    width: 60,
    backgroundColor: "blue",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 10,
  },
  text: {
    color: "#fff",
  },
});
