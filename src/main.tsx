import {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { StyleSheet, View } from "react-native";
import { AnimatedOverlay, DragField, PinchField } from "./components";
import React from "react";
import { GestureContextType } from "./types";
import { COLORS, height, OFFSET, width } from "./constants";

export const Main = () => {
  const scale = useSharedValue(0);
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const onDrag = (value: number) => scale.value = value;
  const onChange = (value: GestureContextType) => {
    x.value = value.x;
    y.value = value.y;
  }


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
      <AnimatedOverlay x={x} y={y}/>
    </>
  )
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    padding: OFFSET,
  },
});
