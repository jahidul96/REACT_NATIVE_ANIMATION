import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";

const ITEM_HEIGHT = height * 0.8;

const contents = [
  {
    id: 1,
    name: "page 1",
    color: "red",
  },
  {
    id: 2,
    name: "page 2",
    color: "blue",
  },
  {
    id: 3,
    name: "page 3",
    color: "green",
  },
  {
    id: 4,
    name: "page 4",
    color: "pink",
  },
];

const { width, height } = Dimensions.get("screen");

const Paging = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={contents}
        pagingEnabled={true}
        snapToInterval={height * 0.8}
        decelerationRate={"fast"}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View style={[styles.pageStyle, { backgroundColor: item.color }]}>
              <Text>{item.name}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Paging;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageStyle: {
    width: width,
    height: height * 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
});
