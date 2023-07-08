import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import React, { useRef, useState } from "react";

const Width = Dimensions.get("screen").width;

const TAB_WIDTH = Width * 0.3;

const Tabs = ["All", "Popular", "Sports", "News", "Soccer", "Cricket", "Intl"];

const bg =
  "https://i.pinimg.com/originals/07/70/34/0770344658a5e5fe17140aeb2684a881.jpg";

const AutoScrollTabOnTapAnim = () => {
  const scrollRef = useRef();
  const [activeTab, setActiveTab] = useState(0);

  const scrollToIndex = (index) => {
    setActiveTab(index);

    let offset = 0;
    if ((index + 1) * TAB_WIDTH - TAB_WIDTH * 0.5 > Width * 0.5) {
      offset = (index + 1) * TAB_WIDTH - Width * 0.66;
    }
    scrollRef?.current.scrollToOffset({
      offset,
      animated: true,
    });
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* Tabs */}
      <FlatList
        ref={scrollRef}
        style={styles.flatListContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        keyExtractor={(item) => item}
        data={Tabs}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => scrollToIndex(index)}
              style={[
                styles.btn,
                {
                  backgroundColor: index == activeTab ? "blue" : "#fff",
                },
              ]}
            >
              <Text
                style={[
                  styles.btnText,
                  { color: index == activeTab ? "#fff" : "#000" },
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      {/* Content */}

      <View style={styles.imageWrapper}>
        {Tabs.map((_, i) => {
          return <Image key={i} source={{ uri: bg }} style={styles.imgStyle} />;
        })}
      </View>
    </ScrollView>
  );
};

export default AutoScrollTabOnTapAnim;

const styles = StyleSheet.create({
  flatListContainer: {
    marginVertical: 20,
  },

  btn: {
    width: TAB_WIDTH,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "blue",
    borderRadius: 30,
    marginRight: 10,
  },

  btnText: {
    // color: "#fff",
    fontWeight: "700",
    fontSize: 17,
  },

  imageWrapper: {
    flex: 1,
    paddingHorizontal: 10,
  },

  imgStyle: {
    width: "100%",
    height: 300,
    marginBottom: 10,
    borderRadius: 10,
  },
});
