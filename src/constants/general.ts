import { Dimensions } from "react-native";

export const { width, height } = Dimensions.get('window');
export const animationConfig = { duration: 1000 };
export const BALL_SIZE = 50;
export const HALF_BALL_SIZE = BALL_SIZE / 2;

export const OFFSET = 30;
export const xCenter = width/2 - HALF_BALL_SIZE - OFFSET;
export const yCenter = height/2 - HALF_BALL_SIZE - OFFSET;

export const shadowStyles = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.34,
  shadowRadius: 6.27,
}
