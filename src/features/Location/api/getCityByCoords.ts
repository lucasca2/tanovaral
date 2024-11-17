import {
  OPEN_WEATHER_ENDPOINTS,
  OpenWeatherApi,
} from "@/services/OpenWeatherApi/OpenWeatherApi";
import { OWACity } from "@/features/Location/types";

type GetCityByCoordsParams = {
  lat: number;
  lon: number;
};

export const getCityByCoords = async (
  params: GetCityByCoordsParams
): Promise<OWACity> => {
  const data = await OpenWeatherApi(OPEN_WEATHER_ENDPOINTS.city, {
    params: {
      lat: params.lat,
      lon: params.lon,
      limit: 1,
    },
  });

  return data?.[0];
};
