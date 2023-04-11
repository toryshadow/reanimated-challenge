import { useRef } from 'react'
import { Animated, Easing } from 'react-native'

// Lottie doesn't work with reanimated v3 by some reason, so in this hook we are using react-native animated
export const useAnimateLottie = (duration = 2000) => {
  const lottie = useRef(new Animated.Value(0))

  const playLottie = () => {
    Animated.timing(lottie.current, {
      toValue: 1,
      duration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start()
  }

  const reverseLottie = () => {
    Animated.timing(lottie.current, {
      toValue: 0,
      duration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start()
  }

  return {
    lottie,
    playLottie,
    reverseLottie,
  }
}

