import {
  OPEN_WEATHER_ENDPOINTS,
  OpenWeatherApi,
} from "@/services/OpenWeatherApi/OpenWeatherApi";

type GetCurrentWeatherParams = {
  lat: number;
  lon: number;
};

export const getNextDaysForecast = async (params: GetCurrentWeatherParams) => {
  const data = await OpenWeatherApi(OPEN_WEATHER_ENDPOINTS.forecast, {
    params: {
      lat: params.lat,
      lon: params.lon,
      units: "metric",
      lang: "pt_br",
      cnt: 3,
    },
  });

  return data;
};
