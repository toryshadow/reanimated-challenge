import React, { FC } from "react";
import {StyleSheet} from 'react-native';
import Animated, { SharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";

import { COLORS, xCenter, yCenter } from "../../constants";

interface AnimatedOverlayProps {
  x: SharedValue<number>
  y: SharedValue<number>
}
export const AnimatedOverlay: FC<AnimatedOverlayProps> = ({ x, y}) => {
  const animatedItemStyle =  useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: withSpring(xCenter - x.value)},
        {translateY: withSpring(yCenter  - y.value)},
      ],
    };
  });

  return (
    <Animated.View style={[styles.overlay,animatedItemStyle]} />
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.blue,
    zIndex: -1
  }
});
