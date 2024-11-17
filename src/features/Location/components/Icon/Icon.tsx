import { ImageSourcePropType } from "react-native";

import { WeatherType } from "@/features/Location/types";
import { StyledIcon } from "@/features/Location/components/Icon/Icon.styles";

import ClearImage from "@/features/Location/components/Icon/static/clear.png";

const ICON_BY_TYPE: Record<WeatherType, ImageSourcePropType> & {
  default: ImageSourcePropType;
} = {
  Clear: ClearImage,
  Rain: ClearImage,
  Clouds: ClearImage,
  Thunderstorm: ClearImage,
  Drizzle: ClearImage,
  Snow: ClearImage,
  Mist: ClearImage,
  Smoke: ClearImage,
  Haze: ClearImage,
  Dust: ClearImage,
  Fog: ClearImage,
  Sand: ClearImage,
  Ash: ClearImage,
  Squall: ClearImage,
  Tornado: ClearImage,

  default: ClearImage,
};

export const Icon = ({ type }: { type?: WeatherType }) => {
  const source = ICON_BY_TYPE?.[type || "default"] || ICON_BY_TYPE.default;

  return <StyledIcon source={source} />;
};
