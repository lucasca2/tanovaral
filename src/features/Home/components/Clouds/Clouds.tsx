import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LeftCloud, RightCloud, WrapperClouds } from "./Clouds.styles";

export const Clouds = () => {
  const { top } = useSafeAreaInsets();

  return (
    <WrapperClouds safeTop={top}>
      <LeftCloud />
      <RightCloud />
    </WrapperClouds>
  );
};
