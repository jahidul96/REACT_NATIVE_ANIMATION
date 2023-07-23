import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { AppColors } from "../utils/appColors";
import { WIDTH } from "../utils/AppDimension";
import { AntDesign, Ionicons, MaterialIcons } from "../utils/IconExport";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { fileModalData } from "../data/smallData";
import { Image } from "react-native";

const WhatsappMessageSendAnim = () => {
  const [value, setValue] = useState();
  const [showFileModal, setShowFileModal] = useState(false);

  const onPreesFile = () => {
    setShowFileModal(!showFileModal);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text>WhatsappMessageSendAnim</Text>
      </View>

      <ScrollView></ScrollView>

      {/* file modal */}
      <AnimatedFileModal showFileModal={showFileModal} />

      {/* footer section */}
      <Footer setValue={setValue} value={value} onPreesFile={onPreesFile} />
    </View>
  );
};

export default WhatsappMessageSendAnim;

const Footer = ({ setValue, value, onPreesFile }) => {
  const [textInputHeight, setTextInputHeight] = useState(50);

  const handleInputContentSizeChange = (event) => {
    if (event.nativeEvent.contentSize.height > 150) return;
    setTextInputHeight(event.nativeEvent.contentSize.height);
  };

  // inputContainerAnimation
  const inputContainerAnimStyle = useAnimatedStyle(() => {
    return {
      borderRadius: value
        ? withTiming(10, { duration: 300 })
        : withTiming(30, { duration: 300 }),
    };
  });

  // iconView animated styling

  const iconAnimStyle = useAnimatedStyle(() => {
    return {
      width: value
        ? withTiming(0, { duration: 500 })
        : withTiming(80, { duration: 500 }),
      transform: [
        {
          translateX: value
            ? withTiming(200, { duration: 700 })
            : withTiming(0, { duration: 700 }),
        },
      ],
    };
  });

  return (
    <View style={[styles.footerContainer, { height: 55 }]}>
      <Animated.View style={[styles.leftContainer, inputContainerAnimStyle]}>
        {/* textinput */}
        <TextInput
          multiline
          placeholderTextColor={"#fff"}
          placeholder="type..."
          value={value}
          onChangeText={(text) => setValue(text)}
          onContentSizeChange={handleInputContentSizeChange}
          style={[styles.inputStyle, { height: Math.max(40, textInputHeight) }]}
        />

        {/* link and camera icon comp */}

        <Animated.View style={[styles.leftIconWrapper, iconAnimStyle]}>
          <TouchableOpacity onPress={onPreesFile}>
            <AntDesign name="link" size={23} color={AppColors.WHITE} />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 10 }}>
            <Ionicons name="camera" size={25} color={AppColors.WHITE} />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>

      {/* recording/send button button comp */}
      {value ? (
        <Pressable style={styles.rightContainer}>
          <Ionicons name="send-sharp" size={20} color={AppColors.WHITE} />
        </Pressable>
      ) : (
        <Pressable style={styles.rightContainer}>
          <MaterialIcons
            name="keyboard-voice"
            size={22}
            color={AppColors.WHITE}
          />
        </Pressable>
      )}
    </View>
  );
};

const AnimatedFileModal = ({ showFileModal }) => {
  // file modal anim style
  const fAnimStyle = useAnimatedStyle(() => {
    return {
      opacity: showFileModal
        ? withTiming(1, { duration: 800 })
        : withTiming(0, { duration: 800 }),

      bottom: showFileModal
        ? withTiming(80, { duration: 500 })
        : withTiming(-200, { duration: 500 }),
    };
  });

  return (
    <Animated.View style={[styles.fileModalContainer, fAnimStyle]}>
      {fileModalData.map((data) => (
        <View
          key={data.id}
          style={[styles.itemStyle, { backgroundColor: data.bg }]}
        >
          <Image source={data.img} style={styles.imgStyle} />
        </View>
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.BLACK,
  },
  topBar: {
    width: "100%",
    height: 60,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
  footerContainer: {
    width: WIDTH,
    // minHeight: 60,
    backgroundColor: AppColors.BLACK,
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 4,
    justifyContent: "space-between",
    marginBottom: 8,
  },
  leftContainer: {
    flex: 1,
    minHeight: 50,
    marginRight: 3,
    backgroundColor: AppColors.GREY_BLACK,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    paddingVertical: 8,
  },
  inputStyle: {
    flex: 1,
    paddingHorizontal: 10,
    color: AppColors.WHITE,
    fontSize: 17,
  },

  leftIconWrapper: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 80,
  },
  rightContainer: {
    width: 47,
    height: 47,
    borderRadius: 100,
    backgroundColor: AppColors.GREY_BLACK,
    justifyContent: "center",
    alignItems: "center",
  },

  fileModalContainer: {
    width: WIDTH - 50,
    height: 200,
    backgroundColor: AppColors.GREY_BLACK,
    position: "absolute",
    alignSelf: "center",
    borderRadius: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 50,
    paddingVertical: 20,
    justifyContent: "space-between",
    alignItems: "center",

    left: 25,
    // zIndex: 999,
  },
  itemStyle: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: AppColors.WHITE,

    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  imgStyle: {
    width: 25,
    height: 25,
  },
});
