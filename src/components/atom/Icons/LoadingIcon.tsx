import React, { useEffect, useRef } from "react"
import { Animated } from "react-native"
import Svg, { SvgProps, Path } from "react-native-svg"
import { memo } from "react"

const AnimatedSvg = Animated.createAnimatedComponent(Svg)

const LoadingIcon = (props: SvgProps) => {
  const rotateValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const startRotation = () => {
      rotateValue.setValue(0)
      Animated.loop(
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ).start()
    }

    startRotation()
  }, [rotateValue])

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <AnimatedSvg
      fill="none"
      style={{ transform: [{ rotate }] }}
      {...props}
    >
      <Path
        fill="#fff"
        fillOpacity={0.4}
        d="M24.5 12c0 6.627-5.373 12-12 12S.5 18.627.5 12s5.373-12 12-12 12 5.373 12 12ZM4.04 12a8.46 8.46 0 1 0 16.92 0 8.46 8.46 0 0 0-16.92 0Z"
      />
      <Path
        fill="#fff"
        d="M22.73 12c.977 0 1.783-.797 1.64-1.764A12.003 12.003 0 0 0 14.264.13C13.297-.013 12.5.792 12.5 1.77c0 .978.8 1.751 1.757 1.954a8.459 8.459 0 0 1 6.519 6.519c.203.956.977 1.757 1.954 1.757Z"
      />
    </AnimatedSvg>
  )
}

const Memo = memo(LoadingIcon)
export default Memo