import React, { useState } from 'react';
import styled from 'styled-components';
import WeatherForm from './Components/WeatherForm';
import WeatherInfo from './Components/WeatherInfo';
import LoadingSpinner from './Components/LoadingSpinner';

const AppContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const AppTitle = styled.h1`
  color: #3498db;
`;

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<{
    description: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ message: string } | null>(null);

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
        setError({ message: data.error });
      }
    } catch (error: any) {
      setWeatherData(null);
      setError({ message: error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContainer>
      <AppTitle>Weather App</AppTitle>
      <WeatherForm onSubmit={fetchWeatherData} />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <WeatherInfo weatherData={weatherData} error={error} />
      )}
    </AppContainer>
  );
};

export default App;
