import React from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

const LeftActions = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: "clamp"
  });

  return (
    <View style={styles.leftAction}>
      <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
        Add to cart
      </Animated.Text>
    </View>
  );
};
export default props => {
  const { item, onSwipeFromLeft, onRightPress } = props;

  return (
    <Swipeable renderLeftActions={LeftActions}>
      <View style={styles.container}>
        <Text>{item.name}</Text>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16
  },
  seperator: { flex: 1, borderBottomWidth: 1, borderBottomColor: "blue" },
  leftAction: {
    flex: 1,
    backgroundColor: "#388e3c",
    justifyContent: "center"
  },
  actionText: {
    color: "#fff",
    fontWeight: "bold",
    alignContent: "center"
  }
});

const Seperator = () => <View style={styles.seperator} />;

export { Seperator };
