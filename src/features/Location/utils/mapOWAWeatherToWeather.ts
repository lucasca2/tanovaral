import { OWAWeather, Weather, WeatherType } from "@/features/Location/types";

export const mapOWAWeatherToWeather = (
  data: OWAWeather
): Weather | undefined => {
  if (!data) return;

  const roundedTemperature = Math.round(Number(data.main.temp));
  const roundedFeelsLike = Math.round(Number(data.main.feels_like));

  const weather = data.weather[0];

  if (!weather) return;

  return {
    type: weather.main as WeatherType,
    temperature: {
      current: roundedTemperature,
      feelsLike: roundedFeelsLike,
      humidity: data.main.humidity,
    },
    wind: {
      speed: data.wind.speed,
      deg: data.wind.deg,
      gust: data.wind.gust,
    },
  };
};
