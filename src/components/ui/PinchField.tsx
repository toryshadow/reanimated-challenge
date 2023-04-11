import {
  PinchGestureHandler, PinchGestureHandlerGestureEvent
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle, useDerivedValue,
  useSharedValue
} from "react-native-reanimated";
import React, { FC } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { COLORS, shadowStyles } from "../../constants";

interface PinchFieldProps {
  children: React.ReactNode;
  onDrag: (value: number) => void;
  style?: ViewStyle;
}
export const PinchField: FC<PinchFieldProps> = ({ children, onDrag, style }) => {
  const scale = useSharedValue(1);

  const drag = useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
    onActive: (event, context) => {
      scale.value = event.scale;
    }
  });

  const pinchViewStyle = useAnimatedStyle(() => ({
    transform: [
      {scale: scale.value},
    ],
  }), [scale.value]);

  useDerivedValue(() => {
    runOnJS(onDrag)(scale.value);
  }, [scale.value]);

  return (
    <PinchGestureHandler onGestureEvent={drag}>
      <Animated.View style={[styles.container, pinchViewStyle, style]}>
        {children}
      </Animated.View>
    </PinchGestureHandler>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    ...shadowStyles,
  },
});
