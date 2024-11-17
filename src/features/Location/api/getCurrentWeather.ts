import {
  OPEN_WEATHER_ENDPOINTS,
  OpenWeatherApi,
} from "@/services/OpenWeatherApi/OpenWeatherApi";
import { OWAWeather } from "@/features/Location/types";

type GetCurrentWeatherParams = {
  lat?: number;
  lon?: number;
  q?: string;
};

export const getCurrentWeather = async (
  params: GetCurrentWeatherParams
): Promise<OWAWeather> => {
  const data = await OpenWeatherApi(OPEN_WEATHER_ENDPOINTS.weather, {
    params: {
      lat: params.lat,
      lon: params.lon,
      q: params.q,
      units: "metric",
      lang: "pt_br",
    },
  });

  return data;
};
