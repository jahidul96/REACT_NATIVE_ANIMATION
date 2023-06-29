import React, { Component, useEffect, useState } from "react";
import { StyleSheet, View, Text, PanResponder, Animated } from "react-native";

const Draggable = () => {
  const [showDraggable, setShowDraggable] = useState(false);
  const opacity = new Animated.Value(1);
  const pan = new Animated.ValueXY();

  useEffect(() => {
    setShowDraggable(true);
  }, []);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e, gesture) => true,
    onPanResponderGrant: (e, gesture) => {
      pan.setOffset({
        x: pan.x._value,
        y: pan.y._value,
      });
      pan.setValue({ x: 0, y: 0 });
    },
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: (e, gesture) => {
      if (isDropArea(gesture)) {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }).start(() => setShowDraggable(false));
      }
    },
  });

  const isDropArea = (gesture) => {
    return gesture.moveY < 200;
  };

  const renderDraggable = () => {
    const panStyle = {
      transform: pan.getTranslateTransform(),
    };
    if (showDraggable) {
      return (
        <View style={{ position: "absolute" }}>
          <Animated.View
            {...panResponder.panHandlers}
            style={[panStyle, styles.circle, { opacity: opacity }]}
          />
        </View>
      );
    }
  };

  return (
    <View style={{ width: "20%", alignItems: "center" }}>
      {renderDraggable()}
    </View>
  );
};

export const DragAndDelete = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.dropZone}>
        <Text style={styles.text}>Drop them here!</Text>
      </View>
      <View style={styles.ballContainer} />
      <View style={styles.row}>
        <Draggable />
        <Draggable />
        <Draggable />
        <Draggable />
        <Draggable />
      </View>
    </View>
  );
};

let CIRCLE_RADIUS = 30;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  ballContainer: {
    height: 200,
  },
  circle: {
    backgroundColor: "skyblue",
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
  },
  row: {
    flexDirection: "row",
  },
  dropZone: {
    height: 200,
    backgroundColor: "#00334d",
  },
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
  },
});
