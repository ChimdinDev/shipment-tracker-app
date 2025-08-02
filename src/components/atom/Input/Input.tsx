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
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  isError?: boolean;
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
  leftIcon,
  rightIcon,
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
   const errorColor =  Colors.red700;
    const blurredColor = Colors.neutral400;

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
        {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
 
       {isFocused && <AppText style={styles.errorText}>{rest.placeholder}</AppText>}

        <TextInput
          style={[styles.textInput, { color: textColor }, textInputStyle]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={placeholderColor}
          cursorColor={Colors.blue500}
          {...rest}
        />

        {rightIcon && (
          <Pressable style={styles.iconContainer} onPress={onPressIcon}>
            {rightIcon}
          </Pressable>
        )}
      </View>

      {isError && errorText ? (
        <AppText style={styles.errorText}>{errorText}</AppText>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8, // Replace with Radius.sm if needed
    paddingHorizontal: Spacing.lg,
    paddingVertical: 10,
  },
  textInput: {
    flex: 1,
    marginHorizontal: 5,
    ...typography.bodyRegular,
    fontSize: 16,
    lineHeight: 20,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  errorText: {
    marginTop: 4,
    marginLeft: Spacing.lg,
    fontSize: 12,
    color: Colors.red700,
  },
});
