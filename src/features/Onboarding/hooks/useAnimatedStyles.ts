import { useEffect, useState } from "react";
import { LayoutChangeEvent } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useOnboarding } from "../providers/useOnboarding";

export const useAnimatedStyles = () => {
  const { hasComplete } = useOnboarding();
  const [isFirstRender, setIsFirstRender] = useState(true);

  const [bottomSheetHeight, setBottomSheetHeight] = useState(0);
  const bottomSheetPosition = useSharedValue(0);
  const bottomSheetOpacity = useSharedValue(0);
  const overlayOpacity = useSharedValue(0);

  const handleBottomSheetOnLayout = (event: LayoutChangeEvent) => {
    setBottomSheetHeight(event.nativeEvent.layout.height);
  };

  useEffect(() => {
    // If i'ts first render and bottomSheet is already rendered
    if (isFirstRender && bottomSheetHeight !== 0) {
      setIsFirstRender(false);
      bottomSheetPosition.value = bottomSheetHeight;
    }
  }, [bottomSheetHeight, isFirstRender]);

  useEffect(() => {
    // If user didn't finish onboarding
    if (!isFirstRender && !hasComplete) {
      overlayOpacity.value = withTiming(1, { duration: 300 });
      bottomSheetOpacity.value = 1;
      bottomSheetPosition.value = withSpring(0, {
        damping: 18,
        stiffness: 100,
        mass: 1,
        restDisplacementThreshold: 0.0001,
        restSpeedThreshold: 0.0001,
      });
    }
  }, [hasComplete, isFirstRender]);

  useEffect(() => {
    // If user finished onboarding
    if (!isFirstRender && hasComplete) {
      overlayOpacity.value = withTiming(0, { duration: 300 });
      bottomSheetPosition.value = withTiming(bottomSheetHeight, {
        duration: 300,
      });
    }
  }, [hasComplete, bottomSheetHeight, isFirstRender]);

  const bottomSheetStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: bottomSheetPosition.value }],
      opacity: bottomSheetOpacity.value,
    };
  }, [hasComplete]);

  const overlayStyles = useAnimatedStyle(() => {
    return {
      opacity: overlayOpacity.value,
    };
  }, [hasComplete]);

  return { bottomSheetStyles, overlayStyles, handleBottomSheetOnLayout };
};
