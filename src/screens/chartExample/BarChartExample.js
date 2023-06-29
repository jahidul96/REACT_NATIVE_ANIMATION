import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LineChart, BarChart } from "react-native-chart-kit";

const WIDTH = Dimensions.get("window").width - 16;
const BarChartExample = () => {
  return (
    <View>
      <>
        <Text style={styles.header}>Bar Chart</Text>
        <BarChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [20, 45, 28, 80, 99, 43],
              },
            ],
          }}
          width={WIDTH}
          height={220}
          yAxisLabel={"Rs"}
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

export default BarChartExample;

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    fontSize: 18,
    padding: 16,
    marginTop: 16,
  },
});
