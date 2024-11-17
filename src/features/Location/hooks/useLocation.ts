import { useEffect, useState } from "react";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";

import { City, OWAWeather, Weather } from "@/features/Location/types";
import { getCurrentWeather } from "@/features/Location/api/getCurrentWeather";
import { getCityByCoords } from "@/features/Location/api/getCityByCoords";
import { mapOWAWeatherToWeather } from "@/features/Location/utils/mapOWAWeatherToWeather";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LocationKey = {
  city: "@tanovaral/location:city",
  weather: "@tanovaral/location:weather",
};

export const useLocation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [city, setCity] = useState<City>();
  const [weather, setWeather] = useState<Weather>();

  async function getCurrentLocation() {
    setIsLoading(true);

    const { status } = await requestForegroundPermissionsAsync();

    if (status !== "granted") {
      return {};
    }

    const location = await getCurrentPositionAsync();

    const _city = await getCityByCoords({
      lat: location.coords.latitude,
      lon: location.coords.longitude,
    });

    const _weather = await getCurrentWeather({
      q: _city.name,
    });

    setCity(_city);

    const mappedWeather = mapOWAWeatherToWeather(_weather);
    setWeather(mappedWeather);

    storeLocation({ city: _city, weather: mappedWeather });

    setIsLoading(false);

    return { city: _city, weather: mappedWeather };
  }

  const storeLocation = async ({
    city: _city,
    weather: _weather,
  }: {
    city?: City;
    weather?: Weather;
  }) => {
    if (_city)
      await AsyncStorage.setItem(LocationKey.city, JSON.stringify(_city));

    if (_weather)
      await AsyncStorage.setItem(LocationKey.weather, JSON.stringify(_weather));
  };

  const fetchStoragedLocation = async () => {
    setIsLoading(true);
    const storagedCity = await AsyncStorage.getItem(LocationKey.city);

    if (storagedCity) {
      setCity(JSON.parse(storagedCity));

      const storagedWeather = await AsyncStorage.getItem(LocationKey.weather);
      if (storagedWeather) setWeather(JSON.parse(storagedWeather));

      getCurrentLocation();
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchStoragedLocation();
  }, []);

  return {
    city,
    weather,
    getCurrentLocation,
    isLoading,
  };
};
