import React, { useState } from 'react';
import styled from 'styled-components';

interface WeatherFormProps {
  onSubmit: (data: { city: string; country: string }) => void;
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
`;

const FormGroup = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 8px;
  margin-top: 5px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: #3498db;
  color: #fff;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

const WeatherForm: React.FC<WeatherFormProps> = ({ onSubmit }) => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ city, country });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormGroup>
        <span>City</span>
        <Input
          type='text'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <span>Country</span>
        <Input
          type='text'
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </FormGroup>
      <SubmitButton type='submit'>Get Weather</SubmitButton>
    </FormContainer>
  );
};

export default WeatherForm;
