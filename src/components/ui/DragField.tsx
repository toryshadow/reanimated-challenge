import {StyleSheet} from 'react-native';
import Animated, {
  runOnJS,
  SharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent
} from "react-native-gesture-handler";
import React, { FC } from "react";
import { TapField } from "./TapField";
import { GestureContextType } from "../../types";
import { animationConfig, BALL_SIZE, COLORS, OFFSET, xCenter, yCenter } from "../../constants";

interface DragFieldProps {
  scale: SharedValue<number>,
  onChangePosition?: (value: GestureContextType) => void
}
export const DragField: FC<DragFieldProps> = ({ scale, onChangePosition }) => {
  const x = useSharedValue(xCenter);
  const y = useSharedValue(yCenter);
  const isActive = useSharedValue(1);

  const drag = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    GestureContextType
  >({
    onStart: (event, context) => {
      context.x = x.value;
      context.y = y.value;
    },
    onActive: (event, context) => {
      x.value = (event.translationX / scale.value + context.x);
      y.value = (event.translationY / scale.value + context.y);
      isActive.value = withTiming(1.5);
    },
    onEnd: event => {
      x.value = withTiming(xCenter, animationConfig);
      y.value = withTiming(yCenter, animationConfig);
      isActive.value = withTiming(1, animationConfig);
    },
  });

  const dragItemStyle =  useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: x.value},
        {translateY: y.value},
        {scale: isActive.value }
      ],
    };
  });

  useDerivedValue(() => {
    if (onChangePosition) {
      runOnJS(onChangePosition)({ x: x.value, y: y.value });
    }
  }, [x.value, y.value]);

  return (
    <>
      <PanGestureHandler onGestureEvent={drag}>
        <Animated.View style={[styles.container, dragItemStyle]}>
          <TapField />
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: BALL_SIZE,
    height: BALL_SIZE,
    borderRadius: BALL_SIZE/5,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
});
