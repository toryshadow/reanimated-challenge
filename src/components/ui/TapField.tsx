import React, { FC, useEffect, useState } from "react";
import {StyleSheet} from 'react-native';
import Animated from "react-native-reanimated";
import AnimatedLottieView from "lottie-react-native";
import { TapGestureHandler } from "react-native-gesture-handler";

import { BALL_SIZE, COLORS } from "../../constants";
import { useAnimateLottie } from "../../hooks";

export const TapField: FC = () => {
  const { lottie, playLottie, reverseLottie } = useAnimateLottie()
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      playLottie()
    } else {
      reverseLottie()
    }
  }, [isActive])

  return (
    <TapGestureHandler
      numberOfTaps={2}
      onActivated={() => setActive(state => !state)}
    >
      <Animated.View style={styles.container}>
        <AnimatedLottieView
          source={require('../../assets/lottie/heart.json')}
          progress={lottie.current}
          loop={false}
          autoPlay={false}
        />
      </Animated.View>
    </TapGestureHandler>
  );
};

const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: BALL_SIZE/5,
  },
});
