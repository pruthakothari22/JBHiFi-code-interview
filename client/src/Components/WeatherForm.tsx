import React, { useState } from 'react';

interface WeatherFormProps {
  onSubmit: (data: { city: string; country: string }) => void;
}

const WeatherForm: React.FC<WeatherFormProps> = ({ onSubmit }) => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ city, country });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        City:
        <input
          type='text'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </label>
      <label>
        Country:
        <input
          type='text'
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </label>
      <button type='submit'>Get Weather</button>
    </form>
  );
};

export default WeatherForm;
