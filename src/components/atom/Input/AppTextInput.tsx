import { Colors, ColorKey, Spacing, typography } from "@/theme";
import { useState } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import AppText from "../Text/AppText";

type AppTextInputProps = TextInputProps & {
  style?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  isError?: boolean;
  isUrl?: boolean; // New prop to indicate if the input is a URL
  errorText?: string;
  onPressIcon?: () => void;
  onFocusChange?: (isFocused: boolean) => void;
};

export default function AppTextInput({
  style,
  textInputStyle,
  isError,
  errorText,
  onPressIcon,
  isUrl,
  onFocusChange,
  ...rest
}: AppTextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    onFocusChange?.(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    onFocusChange?.(false);
  };

  const focusedColor = Colors.blue500;
  const errorColor = Colors.red700;
  const blurredColor = Colors.transparent;

  const borderColor = isError
    ? errorColor
    : isFocused
      ? focusedColor
      : blurredColor;

  const backgroundColor = Colors.neutral100;
  const textColor = isError
    ? errorColor
    : isFocused
      ? focusedColor
      : blurredColor;

  const placeholderColor = Colors.neutral400;

  return (
    <>
      <View style={[styles.container, { borderColor, backgroundColor }, style]}>

        {isFocused && <AppText >{rest.placeholder}</AppText>}

        <View style={styles.innerContainer}>

          {isUrl &&
            <View>
              <AppText type="bodyLarge" >https:// <AppText style={{fontFamily:"Inter-Thin"}}> |  </AppText></AppText>
            </View>
          }

          <TextInput
            style={[styles.textInput, { color: textColor }, textInputStyle]}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholderTextColor={placeholderColor}
            cursorColor={Colors.blue500}
            {...rest}
          />

        </View>

      </View>

      {isError && errorText ? (
        <AppText style={styles.errorText}>{errorText}</AppText>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    overflow: "hidden",
    height: 56,
    borderWidth: 1,
    borderRadius: 10, // Replace with Radius.sm if needed
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,

  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    padding: 0,
    height: 22,
    fontSize: 16,
    ...typography.bodyRegular,
  },

  errorText: {
    marginTop: 4,
    marginLeft: Spacing.lg,
    fontSize: 12,
    color: Colors.red700,
  },
});
