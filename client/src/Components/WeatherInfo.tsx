import React from 'react';
import styled from 'styled-components';

const WeatherInfoContainer = styled.div`
  margin-top: 20px;
  padding: 15px;
  border-radius: 15px;
  text-align: center;
  align-items: center;
  border: 2px solid #2980b9;
`;

const ErrorContainer = styled.div`
  margin-top: 20px;
  color: #e74c3c;
  text-align: center;
`;

const WeatherInformation = styled.h2`
  color: #2980b9;
  margin: 50px;
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
      <WeatherInformation>
        {weatherData.description.toUpperCase()}
      </WeatherInformation>
    </WeatherInfoContainer>
  );
};

export default WeatherInfo;
