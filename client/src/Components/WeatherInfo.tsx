import React from 'react';
import styled from 'styled-components';

const WeatherInfoContainer = styled.div`
  margin-top: 20px;
  background-color: #ecf0f1;
  padding: 15px;
  border-radius: 5px;
  text-align: center;
`;

const ErrorContainer = styled.div`
  margin-top: 20px;
  color: #e74c3c; /* Red color for errors */
  text-align: center;
`;

interface WeatherInfoProps {
  weatherData: { description: string } | null;
  error: string | null;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ weatherData, error }) => {
  if (error) {
    return <ErrorContainer>{error}</ErrorContainer>;
  }

  if (!weatherData) {
    return null;
  }

  return (
    <WeatherInfoContainer>
      <h2>Weather Information</h2>
      <p>Description: {weatherData.description}</p>
    </WeatherInfoContainer>
  );
};

export default WeatherInfo;
