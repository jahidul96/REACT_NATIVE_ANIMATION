import React, { useRef } from "react";
import { Animated, View, StyleSheet, PanResponder, Text } from "react-native";
import DragItem from "../components/DragItem";
import { Letters } from "../data/Letters";
import { membersData } from "../data/people";

const FamilyTree = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        {membersData.map((item, index) => (
          <DragItem key={index} data={item} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  contentWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
});

export default FamilyTree;
