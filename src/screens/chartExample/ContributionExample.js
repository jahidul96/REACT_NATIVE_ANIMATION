import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ContributionGraph } from "react-native-chart-kit";

const WIDTH = Dimensions.get("window").width - 16;
const ContributionExample = () => {
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      <>
        <Text style={styles.header}>Contribution Graph</Text>
        <ContributionGraph
          values={[
            { date: "2019-01-02", count: 1 },
            { date: "2019-01-03", count: 2 },
            { date: "2019-01-04", count: 3 },
            { date: "2019-01-05", count: 4 },
            { date: "2019-01-06", count: 5 },
            { date: "2019-01-30", count: 2 },
            { date: "2019-01-31", count: 3 },
            { date: "2019-03-01", count: 2 },
            { date: "2019-04-02", count: 4 },
            { date: "2019-03-05", count: 2 },
            { date: "2019-02-30", count: 4 },
          ]}
          endDate={new Date("2019-04-01")}
          numDays={105}
          width={"100%"}
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
        />
      </>
    </View>
  );
};

export default ContributionExample;

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    fontSize: 18,
    padding: 16,
    marginTop: 16,
  },
});
