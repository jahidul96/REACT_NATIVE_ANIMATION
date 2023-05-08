import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  Image,
  Animated,
} from "react-native";
import React, { useRef } from "react";
import { membersData } from "../data/people";

const Avator_Size = 60;
const SPACING = 20;
const ITEM_SIZE = Avator_Size + SPACING * 3.5;

const UserCardVerticalOpacityAnimation = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#f2f2f2"} barStyle={"dark-content"} />
      <Animated.FlatList
        bounces={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: scrollY } },
            },
          ],
          { useNativeDriver: true }
        )}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        data={membersData}
        contentContainerStyle={{
          padding: SPACING,
        }}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 1.5),
          ];
          const opacityInputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 0.7),
          ];

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });
          const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0],
          });
          return (
            <Animated.View
              style={{
                width: "100%",
                backgroundColor: "#fff",
                borderRadius: SPACING,
                marginBottom: SPACING,
                padding: SPACING,
                flexDirection: "row",
                alignItems: "center",
                opacity: opacity,
                transform: [{ scale }],
              }}
            >
              <Image source={{ uri: item.photoUrl }} style={styles.imgStyle} />

              <View style={styles.detailsWrapper}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.text}>{item.desc.slice(0, 100)}</Text>
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

export default UserCardVerticalOpacityAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  imgStyle: {
    width: Avator_Size,
    height: Avator_Size,
    borderRadius: Avator_Size,
  },
  detailsWrapper: {
    paddingHorizontal: 15,
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
    opacity: 0.6,
    overflow: "hidden",
  },
});
