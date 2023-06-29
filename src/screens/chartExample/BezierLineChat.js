import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";

//import React Native chart Kit for different kind of Chart
import { LineChart } from "react-native-chart-kit";

const WIDTH = Dimensions.get("window").width - 16;

const BezierLineChat = () => {
  return (
    <View
      style={{
        flex: 1,
        padding: 10,
      }}
    >
      <>
        <Text style={styles.header}>Bezier Line Chart</Text>
        <LineChart
          data={{
            labels: ["January", "February", "March", "April"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={WIDTH} // from react-native
          height={220}
          yAxisLabel={"Rs"}
          chartConfig={{
            backgroundColor: "#1cc910",
            backgroundGradientFrom: "#eff3ff",
            backgroundGradientTo: "#efefef",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </>
    </View>
  );
};

export default BezierLineChat;

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    fontSize: 18,
    padding: 16,
    marginTop: 16,
  },
});
