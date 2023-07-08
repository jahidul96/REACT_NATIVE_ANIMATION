import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const ScrollVeriticalAnimation = () => {
  const [index, setIndex] = useState(0);
  const scrollRef = useRef(null);

  const selecItem = (item) => {
    setIndex(item);
  };

  const verticalFunc = (item) => {
    setIndex(item);
  };

  const renderItem = ({ item }) => (
    <Item item={item} index={index} onPress={selecItem} />
  );
  const renderItem2 = ({ item }) => (
    <Item
      item={item}
      index={index}
      onPress={verticalFunc}
      extraStyle={styles.wrapperStyle2}
    />
  );

  useEffect(() => {
    scrollRef?.current?.scrollToIndex({
      index: index,
      animated: true,
    });
  }, [index]);
  return (
    <View style={styles.container}>
      <View
        style={{
          marginBottom: 10,
          marginTop: 20,
        }}
      >
        <FlatList
          ref={scrollRef}
          initialScrollIndex={index}
          horizontal
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item}
          style={styles.topFlatListStyle}
        />
      </View>

      <View
        style={{
          paddingHorizontal: 10,
          flex: 1,
        }}
      >
        <FlatList
          initialScrollIndex={index}
          data={data}
          renderItem={renderItem2}
          keyExtractor={(item) => item}
          style={styles.bottomFlatListStyle}
          showsVerticalScrollIndicator={false}
          onScroll={(event) => {
            const y = event.nativeEvent.contentOffset.y / 50;
            setIndex(y.toFixed(0));
          }}
        />
      </View>
    </View>
  );
};

export default ScrollVeriticalAnimation;

const Item = ({ item, index, onPress, extraStyle }) => (
  <TouchableOpacity
    style={[
      styles.wrapperStyle,
      extraStyle,
      index == item && styles.activeColor,
    ]}
    onPress={() => onPress(item)}
  >
    <Text style={styles.textStyle}>{item}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  topFlatListStyle: {
    marginLeft: 8,
  },
  bottomFlatListStyle: {
    paddingBottom: 10,
  },
  wrapperStyle: {
    width: 50,
    height: 50,
    backgroundColor: "#bbb",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  activeColor: {
    backgroundColor: "red",
  },
  wrapperStyle2: {
    width: "100%",
    height: 50,
    backgroundColor: "#bbb",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  textStyle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
