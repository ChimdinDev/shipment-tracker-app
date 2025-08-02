import React from "react";
import { Pressable, PressableProps, TextStyle, View } from "react-native";
import { AppText } from "@/components/atom";
import { styles } from "./AppButton.styles";
import { ColorKey, Colors, TypographyType } from "@/theme";
import LoadingIcon from "../Icons/LoadingIcon";

type AppButtonProps = PressableProps & {
  title?: string;
  titleType?: TypographyType;
  isError?: boolean;
  isLoading?: boolean;
  titleColor?: ColorKey;
  inverted?: boolean; // replaces 'variant'
  textStyle?: TextStyle;
  buttonColor?: ColorKey;
};

export default function AppButton({
  title,
  titleType = "heading3",
  isLoading,
  titleColor = "white",
  inverted = false,
  textStyle,
  style,
  children,
  buttonColor = "blue500",
  ...rest
}: AppButtonProps) {
  const backgroundColor = inverted ? Colors.white : Colors[buttonColor];
  const textColor = inverted ? Colors[buttonColor] : Colors[titleColor];
  const borderColor = Colors[buttonColor];
  const showBorder = inverted;

  return (
    <Pressable
      style={({ pressed, hovered }) => [
        styles.button,
        {
          backgroundColor,
          borderWidth: showBorder ? 1 : 0,
          borderColor,
          opacity: pressed ? 0.9 : 1,
        },
        typeof style === "function" ? style({ pressed, hovered }) : style,
      ]}
      disabled={isLoading ?? rest.disabled}
      accessibilityRole="button"
      {...rest}
    >
      {children && typeof children !== "function" ? (
        children
      ) : isLoading ? (
        <View style={{ width: 30, height: 30 }}>
          <LoadingIcon />
        </View>
      ) : (
        <AppText type={titleType} style={[{ color: textColor }, textStyle]}>
          {title}
        </AppText>
      )}
    </Pressable>
  );
}
