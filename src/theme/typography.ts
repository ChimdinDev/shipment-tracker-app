import { TextStyle, StyleSheet, Platform } from "react-native";
import { moderateScale } from "../utils/dimensions";

export type TypographyType =
  | "heading1"
  | "heading2"
  | "heading3"
  | "display"
  | "subtitle"
  | "bodyLarge"
  | "bodyRegular"
  | "bodySmall"
  | "label";

type Typography = {
  [key in TypographyType]: TextStyle;
};

export const typography: Typography = StyleSheet.create({
  heading1: {
    fontFamily: "SFPro-Bold",
    fontSize: moderateScale(34),
    lineHeight: moderateScale(40),
  },
  heading2: {
    fontFamily: "SFPro-Bold",
    fontSize: moderateScale(24),
    lineHeight: moderateScale(32),
  },
  heading3: {
    fontFamily: "SFPro-Bold",
    fontSize: moderateScale(18),
    lineHeight: moderateScale(28),
  },
  display: {
    fontFamily: "SFPro-Regular",
    fontSize: moderateScale(17),
    lineHeight: moderateScale(28),
  },
  subtitle: {
    fontFamily: "Inter-SemiBold",
    fontSize: moderateScale(18),
    lineHeight: moderateScale(24),
  },
  bodyLarge: {
    fontFamily: "Inter-Regular",
    fontSize: moderateScale(16),
    lineHeight: moderateScale(24),
  },
  bodyRegular: {
    fontFamily: "Inter-Regular",
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
  },
  bodySmall: {
    fontFamily: "Inter-Regular",
    fontSize: moderateScale(12),
    lineHeight: moderateScale(16),
  },
  label: {
    fontFamily: "Inter-Medium",
    fontSize: moderateScale(10),
    lineHeight: moderateScale(16),
    letterSpacing: 0.5,
  },
});
