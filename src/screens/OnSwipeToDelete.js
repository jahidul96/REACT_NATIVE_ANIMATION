import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { membersData } from "../data/people";
import { AntDesign } from "@expo/vector-icons";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PinchGestureHandler,
  ScrollView,
} from "react-native-gesture-handler";
import Animated, {
  event,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { WIDTH } from "../utils/AppDimension";

const OnSwipeToDelete = () => {
  const [users, setUsers] = useState(membersData);
  const scrollRef = useRef(null);

  const onDeleteUser = useCallback((userId) => {
    // console.log(userId);
    // const newUser = users.filter((user) => user.id !== userId);
    // console.log(newUser);
    setUsers((users) => users.filter((user) => user.id !== userId));
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.text}>All Users</Text>
        </View>
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 20 }}
        >
          {users.map((data) => (
            <UserComp
              data={data}
              key={data.id}
              onDismiss={onDeleteUser}
              simultaneousHandlers={scrollRef}
            />
          ))}
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  );
};

export default OnSwipeToDelete;

const ITEM_HEIGHT = 70;

const UserComp = ({ data, onDismiss, simultaneousHandlers }) => {
  const x = useSharedValue(0);
  const useItemHeight = useSharedValue(ITEM_HEIGHT);
  const itemOpacity = useSharedValue(1);
  const itemMarginTop = useSharedValue(20);

  const TranslateXTrash = -WIDTH * 0.25;
  const onGestureEvent = useAnimatedGestureHandler({
    onActive: (event) => {
      x.value = event.translationX;
    },

    onEnd: (event) => {
      const dismissalState = x.value < TranslateXTrash;
      if (dismissalState) {
        x.value = withTiming(-WIDTH);
        useItemHeight.value = withTiming(0);
        itemOpacity.value = withTiming(0);
        itemMarginTop.value = withTiming(0, 300, (finished) => {
          if (finished && onDismiss) {
            // console.log(data);
            runOnJS(onDismiss)(data.id);
          }
        });
      } else {
        x.value = withSpring(0);
      }
    },
  });

  const animStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }],
    };
  });

  const iconAnimStyle = useAnimatedStyle(() => {
    const opacity = x.value < TranslateXTrash ? 1 : 0;
    return {
      opacity,
    };
  });

  const itemContainerAnimStyle = useAnimatedStyle(() => {
    return {
      height: useItemHeight.value,
      marginTop: itemMarginTop.value,
      opacity: itemOpacity.value,
    };
  });

  return (
    <Animated.View style={[styles.itemWrapper, itemContainerAnimStyle]}>
      <Animated.View style={[styles.delIconWrapper, iconAnimStyle]}>
        <AntDesign name="delete" size={22} color="red" />
      </Animated.View>
      <PanGestureHandler
        simultaneousHandlers={simultaneousHandlers}
        onGestureEvent={onGestureEvent}
      >
        <Animated.View style={[styles.itemContainer, animStyle]}>
          <Image style={styles.imgStyle} source={{ uri: data.photoUrl }} />
          <Text style={styles.userNameStyle}>{data.name}</Text>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    width: "100%",
    height: 80,
    backgroundColor: "red",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  text: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  itemWrapper: {
    width: "100%",
    backgroundColor: "red",
    borderRadius: 10,
  },
  itemContainer: {
    width: "100%",
    backgroundColor: "blue",
    height: "100%",
    borderRadius: 10,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  imgStyle: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#fff",
  },
  userNameStyle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 10,
  },
  delIconWrapper: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    position: "absolute",
    right: 10,
    alignSelf: "center",
    top: 10,
  },
});
