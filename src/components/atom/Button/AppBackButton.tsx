import {
  PressableProps,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { ColorKey, Colors, Spacing } from "@/theme";
import { router } from "expo-router";
import AppText from "../Text/AppText";

type AppBackButtonProps = PressableProps & {
  color?: ColorKey;
};

export default function AppBackButton({
  color = "blue500"
}: AppBackButtonProps) {

  const iconColor = Colors[color]
  const handleBackButtonPress = () => {
    router.back();
  };

  return (
    <TouchableOpacity onPress={handleBackButtonPress} style={styles.container}>
      <FontAwesome6 name="chevron-left" size={17} color={iconColor} />
      <AppText type="display" style={styles.text} color={"blue500"}>Cancel</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
    paddingBottom: Spacing.md,
  },
  text: {
    fontSize: 17,
  }
});
