import {
  View,
  ViewProps,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Spacing } from "@/theme";

type ThemedViewProps = {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

const AppContainer = ({
  style,
  children,
}: ThemedViewProps) => {
  return (
    <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
  );
};

export default AppContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
  },
});
