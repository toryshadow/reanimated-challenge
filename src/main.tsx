import Animated, {
  useAnimatedStyle,
  useSharedValue, withSpring
} from "react-native-reanimated";
import { StyleSheet, View } from "react-native";
import { DragField, PinchField } from "./components";
import React from "react";
import { GestureContextType } from "./types";
import { COLORS, HALF_BALL_SIZE, height, OFFSET, width, xCenter, yCenter } from "./constants";

export const Main = () => {
  const scale = useSharedValue(0);
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const onDrag = (value: number) => scale.value = value;
  const onChange = (value: GestureContextType) => {
    x.value = value.x;
    y.value = value.y;
  }

  const animatedItemStyle =  useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: withSpring(xCenter - x.value)},
        {translateY: withSpring(yCenter  - y.value)},
      ],
    };
  });

  const pinchViewStyle = useAnimatedStyle(() => {
    const isXOutside = x.value <= -OFFSET || x.value >= width - (OFFSET*3);
    const isYOutside = y.value <= -OFFSET || y.value >= height - (OFFSET*6);

    return {
      backgroundColor: isXOutside || isYOutside ? COLORS.white : COLORS.yellow,
    }
  }, [x.value, y.value]);

  return (
    <>
      <View style={styles.container}>
        <PinchField onDrag={onDrag} style={pinchViewStyle}>
          <DragField
            scale={scale}
            onChangePosition={onChange}
          />
        </PinchField>
      </View>
      <Animated.View style={[styles.overlay,animatedItemStyle]} />
    </>
  )
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    padding: OFFSET,
  },
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
