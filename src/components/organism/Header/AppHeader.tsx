import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
} from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ColorTypes, Spacing } from "@/shared/theme";
import { useThemedColor } from "@/shared/hooks/useThemedColor";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import AppText from "../../atom/Text/AppText";
import AppBackButton from "../../atom/Button/AppBackButton";

type AppHeaderProps = {
  title: string;
  lightColor?: ColorTypes;
  darkColor?: ColorTypes;
  showBackButton?: boolean;
  onRightPress?: () => void;
  rightIconName?: keyof typeof AntDesign.glyphMap;
  navigation?: NavigationProp<RootStackParamList>;
  style?: ViewStyle;
};

export default function AppHeader({
  title,
  lightColor,
  darkColor,
  showBackButton = true,
  onRightPress,
  rightIconName,
  navigation,
  style,
}: AppHeaderProps) {
  const iconColor = useThemedColor(
    { light: lightColor, dark: darkColor },
    "text-default",
  );
  const nav = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={[styles.container, style]}>
      {/* Left Icon */}
      {showBackButton ? (
        <AppBackButton navigation={navigation ?? nav} />
      ) : (
        <View style={{ width: 24 }} />
      )}

      {/* Title */}
      <AppText style={[styles.title, { color: iconColor }]} numberOfLines={1}>
        {title}
      </AppText>

      {/* Right Icon (Optional) */}
      {rightIconName ? (
        <TouchableOpacity onPress={onRightPress}>
          <AntDesign name={rightIconName} size={24} color={iconColor} />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 24 }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xl,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    flex: 1,
  },
});
