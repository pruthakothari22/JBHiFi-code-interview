import React from 'react';

interface WeatherInfoProps {
  weatherData: { description: string } | null;
  error: { message: string } | null;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ weatherData, error }) => {
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!weatherData) {
    return null;
  }

  return (
    <div>
      <h2>Weather Information</h2>
      <p>Description: {weatherData.description}</p>
    </div>
  );
};

export default WeatherInfo;
