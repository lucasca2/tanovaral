const BASE_URL = process.env.EXPO_PUBLIC_OPEN_WEATHER_API_URL;
const API_KEY = process.env.EXPO_PUBLIC_OPEN_WEATHER_API_KEY;

export const OPEN_WEATHER_ENDPOINTS = {
  city: "/geo/1.0/reverse",
  forecast: "/data/2.5/forecast",
  weather: "/data/2.5/weather",
};

export async function OpenWeatherApi(
  _url: string,
  init?: Omit<RequestInit, "body"> & {
    body?: Record<string, any>;
    params?: Record<string, any>;
  }
) {
  let url = _url;

  if (init?.params) {
    const queryString = new URLSearchParams({
      ...init.params,
      appid: API_KEY!,
    }).toString();

    url = `${url}?${queryString}`;
  }

  const requestUrl = `${BASE_URL}${url}`;

  const response = await fetch(requestUrl, {
    ...init,
    body: JSON.stringify(init?.body),
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  } as RequestInit);

  if (response.ok) {
    return await response.json();
  }

  throw await response.json();
}
