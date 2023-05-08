import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Scaleling = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 100,
          backgroundColor: "red",
          justifyContent: "center",
          alignItems: "center",
          transform: [
            {
              rotateY: "50deg",
            },
          ],
        }}
      >
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            color: "#fff",
          }}
        >
          Box
        </Text>
      </View>
    </View>
  );
};

export default Scaleling;

const styles = StyleSheet.create({});
