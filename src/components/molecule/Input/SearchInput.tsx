import { Colors, ColorKey, Spacing, typography } from "@/theme";
import { useRef, useState } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { set } from "react-hook-form";

type AppTextInputProps = TextInputProps & {
  style?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  isError?: boolean;
  errorText?: string;
  onFocusChange?: (isFocused: boolean) => void;
};

export default function SearchTextInput({
  style,
  textInputStyle,
  isError,
  errorText,
  onFocusChange,
  ...rest
}: AppTextInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const textInputRef = useRef<TextInput>(null);

  const handlePressIcon = () => {
    textInputRef.current?.blur();
  }

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
  const blurredColor = Colors.neutral400;

  const borderColor = isError
    ? errorColor
    : isFocused
      ? focusedColor
      :  Colors.transparent;

  const backgroundColor = Colors.neutral100;
  const textColor = isError
    ? errorColor
    : isFocused
      ? focusedColor
      : blurredColor;

  const placeholderColor = Colors.neutral400;

  return (

    <View style={[styles.container, { borderColor, backgroundColor }, style]}>

      <View style={styles.iconContainer}>
        <Feather name="search" size={24} color={textColor} />
      </View>

      <TextInput
        ref={textInputRef}
        style={[styles.textInput, { color: textColor }, textInputStyle]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholderTextColor={placeholderColor}
        placeholder="Search"
        cursorColor={Colors.blue500}
        {...rest}
      />

      {isFocused && (
        <TouchableOpacity style={styles.iconContainer} onPress={handlePressIcon}>
          <Feather name="x" size={24} color={textColor} />
        </TouchableOpacity>
      )}
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    height: 44,
    borderRadius: 10, // Replace with Radius.sm if needed
    paddingHorizontal: Spacing.lg,
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
