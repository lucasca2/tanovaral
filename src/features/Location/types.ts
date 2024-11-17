export type City = {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state: string;
};

export type WeatherType =
  | "Clear"
  | "Clouds"
  | "Rain"
  | "Thunderstorm"
  | "Drizzle"
  | "Snow"
  // -- Atmosphere
  | "Mist"
  | "Smoke"
  | "Haze"
  | "Dust"
  | "Fog"
  | "Sand"
  | "Ash"
  | "Squall"
  | "Tornado";

export type Weather = {
  type: WeatherType;
  temperature: {
    current: number;
    feelsLike: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
};

// Opean Weather API Types
export type OWAWeather = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: WeatherType;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export type OWACity = {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state: string;
};
