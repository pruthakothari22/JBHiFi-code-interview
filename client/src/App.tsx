import React, { useState } from 'react';
import WeatherForm from './Components/WeatherForm';
import WeatherInfo from './Components/WeatherInfo';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<{
    description: string;
  } | null>(null);
  const [error, setError] = useState<{ message: string } | null>(null);

  const fetchWeatherData = async ({
    city,
    country,
  }: {
    city: string;
    country: string;
  }) => {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    try {
      const response = await fetch(`${serverUrl}/weather?q=${city},${country}`);
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
        setError(null);
      } else {
        setWeatherData(null);
        setError({ message: data.error });
      }
    } catch (error: any) {
      setWeatherData(null);
      setError({ message: error });
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <WeatherForm onSubmit={fetchWeatherData} />
      <WeatherInfo weatherData={weatherData} error={error} />
    </div>
  );
};

export default App;
