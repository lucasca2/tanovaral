import { Pressable } from "react-native";

import {
  Wrapper,
  WrapperText,
  Title,
  Subtitle,
} from "@/features/Home/components/Header/Header.styles";

import { useLocation } from "@/features/Location/hooks/useLocation";
import { WEATHER_TYPES } from "@/features/Location/constants";
import { Skeleton } from "@/features/Home/components/Header/components/Skeleton/Skeleton";
import { Icon } from "@/features/Location/components/Icon/Icon";

export const Header = () => {
  const { city, weather, getCurrentLocation, isLoading } = useLocation();

  if (isLoading) return <Skeleton />;

  return (
    <Wrapper>
      <Icon type={weather?.type} />
      <WrapperText>
        <Title>
          {city?.name ? `${city.name}` : "Sua localização"}
          {weather?.temperature?.current
            ? ` - ${weather.temperature.current}°`
            : ""}
        </Title>
        {weather?.type ? (
          <Subtitle>{WEATHER_TYPES[weather.type]}</Subtitle>
        ) : (
          <Pressable onPress={getCurrentLocation}>
            <Subtitle>Adicione</Subtitle>
          </Pressable>
        )}
      </WrapperText>
    </Wrapper>
  );
};
