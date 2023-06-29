import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LineChart, ProgressChart } from "react-native-chart-kit";

const WIDTH = Dimensions.get("window").width - 16;
const ProgressChartExample = () => {
  return (
    <View>
      <>
        <Text style={styles.header}>Progress Chart</Text>
        <ProgressChart
          data={[0.4, 0.2, 0.8]}
          width={WIDTH}
          height={220}
          chartConfig={{
            backgroundColor: "#1cc910",
            backgroundGradientFrom: "#eff3ff",
            backgroundGradientTo: "#efefef",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </>
    </View>
  );
};

export default ProgressChartExample;

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    fontSize: 18,
    padding: 16,
    marginTop: 16,
  },
});
