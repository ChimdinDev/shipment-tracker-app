import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  View,
} from "react-native";
import React from "react";
import { ColorKey, Colors, typography, TypographyType } from "@/theme";


export type AppTextProps = TextProps & {
  color?: ColorKey;
  type?: TypographyType;
  fontWeight?: TextStyle["fontWeight"];
};

export default function AppText({
  color = "text",
  fontWeight,
  style,
  type = "bodyRegular",
  ...rest
}: AppTextProps) {
  // Use themed colors for the text

  const textColor = Colors[color] 

  return (
    <Text
      style={[
        typography[type],
        {
          color:textColor,
          fontWeight: fontWeight,
        },
        style,
      ]}
      {...rest}
    />
  );
}
