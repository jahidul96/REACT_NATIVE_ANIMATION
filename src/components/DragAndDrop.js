import React, { useRef } from "react";
import { Animated, View, StyleSheet, PanResponder, Text } from "react-native";
import { Letters } from "../data/Letters";
import DragItem from "./DragItem";

const DragAndDrop = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        {Letters.map((item, index) => (
          <DragItem key={index} data={item} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contentWrapper: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
});

export default DragAndDrop;
