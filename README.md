# Tá no Varal 🌦️

A mobile app developed with **Expo**, the app is designed to solve the problem of forgetting clothes on the clothesline;

---

## 📋 Pre requisites

To run this project, you will need:

1. **Node.js** installed (version 16 or higher is recommended).
2. **Expo CLI** installed globally. If you don't have it, install it with:

```bash
npm install -g expo-cli
```
   
3.	An account on OpenWeather to get an API key.

## 🔧 Environment Setup

1. Clone the repository;
```bash
git clone https://github.com/your-repo/ta-no-varal.git
cd ta-no-varal
```

2. Install the dependencies;
```bash
npm install
```

3. Setup the environment variables:
- Create a .env file at the root of the project
- Add the following variables:
```env
EXPO_PUBLIC_OPEN_WEATHER_API_URL=https://api.openweathermap.org
EXPO_PUBLIC_OPEN_WEATHER_API_KEY=YOUR_API_KEY
```

4. Run the app:
```bash
npm start
```