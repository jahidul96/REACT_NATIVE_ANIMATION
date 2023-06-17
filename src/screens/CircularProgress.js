import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import Svg, { Circle } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from "react-native-reanimated";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgress = ({ progress, onPress }) => {
  const strokeWidth = 20;
  const radiusVal = 150;

  const innerRadius = (radiusVal - strokeWidth) / 2;
  const circumference = 2 * Math.PI * innerRadius;

  const progressFill = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => ({
    strokeDasharray: [circumference * progressFill.value, circumference],
  }));

  useEffect(() => {
    progressFill.value = withTiming(progress, {
      duration: 1500,
    });
  }, [progress]);
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.9} style={styles.svgWrapper}>
        <Svg>
          {/* background circle */}
          <Circle
            cx={radiusVal}
            cy={radiusVal}
            r={innerRadius}
            strokeWidth={strokeWidth}
            stroke={"red"}
            opacity={0.3}
          />
          {/* foreground circle */}
          <AnimatedCircle
            animatedProps={animatedProps}
            cx={radiusVal}
            cy={radiusVal}
            r={innerRadius}
            strokeWidth={strokeWidth}
            stroke={"red"}
            // opacity={0.2}

            strokeLinecap="round"
            rotation={-90}
            originX={radiusVal}
            originY={radiusVal}
          />
        </Svg>
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 20,
          color: "#fff",
        }}
      >
        {progress}
      </Text>
    </View>
  );
};

export default CircularProgress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },

  svgWrapper: {
    width: 300,
    height: 300,
    alignSelf: "center",
  },
});
