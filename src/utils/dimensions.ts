import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const baseWidth = 393; // Base width for scaling
const baseHeight = 844; // Base height for scaling

const horizontalScale = (size: number) => (width / baseWidth) * size;
const verticalScale = (size: number) => (height / baseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

export { horizontalScale, verticalScale, moderateScale };
