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

const Input = styled.input<{ hasError?: boolean }>`
  padding: 8px;
  margin-top: 5px;
  border: 1px solid ${(props) => (props.hasError ? '#e74c3c' : '#ccc')};
`;

const ErrorText = styled.span`
  color: #e74c3c;
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
  const [inputError, setInputError] = useState({
    city: '',
    country: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputError((prev) => ({ ...prev, [name]: '' }));

    if (name === 'city') {
      setCity(value);
    } else if (name === 'country') {
      setCountry(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs before submitting
    if (!city) {
      setInputError((prev) => ({ ...prev, city: 'Please enter a city.' }));
      return;
    }

    if (!country) {
      setInputError((prev) => ({
        ...prev,
        country: 'Please enter a country.',
      }));
      return;
    }

    // Reset input errors
    setInputError({ city: '', country: '' });

    onSubmit({ city, country });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormGroup>
        <span>City:</span>
        <Input
          type='text'
          name='city'
          value={city}
          onChange={handleChange}
          hasError={!!inputError.city}
        />
        {inputError.city && <ErrorText>{inputError.city}</ErrorText>}
      </FormGroup>
      <FormGroup>
        <span>Country:</span>
        <Input
          type='text'
          name='country'
          value={country}
          onChange={handleChange}
          hasError={!!inputError.country}
        />
        {inputError.country && <ErrorText>{inputError.country}</ErrorText>}
      </FormGroup>
      <SubmitButton type='submit'>Get Weather</SubmitButton>
    </FormContainer>
  );
};

export default WeatherForm;
