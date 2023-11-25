import React, { useState } from 'react';
import styled from 'styled-components';
import WeatherForm from './Components/WeatherForm';
import WeatherInfo from './Components/WeatherInfo';
import LoadingSkeleton from './Components/LoadingSkeleton';

const AppContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const AppTitle = styled.h1`
  color: #2980b9;
`;

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<{
    description: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async ({
    city,
    country,
  }: {
    city: string;
    country: string;
  }) => {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    setLoading(true);
    try {
      const response = await fetch(`${serverUrl}/weather?q=${city},${country}`);
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
        setError(null);
      } else {
        setWeatherData(null);
        setError(data.error);
      }
    } catch (error) {
      setWeatherData(null);
      setError('Error fetching weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContainer>
      <AppTitle>Weather App</AppTitle>
      <WeatherForm onSubmit={fetchWeatherData} />
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <WeatherInfo weatherData={weatherData} error={error} />
      )}
    </AppContainer>
  );
};

export default App;
