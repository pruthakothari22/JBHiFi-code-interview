import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  width: 50px;
  height: 50px;
  animation: ${rotate} 1s linear infinite;
`;

const LoadingSpinner: React.FC = () => {
  return <Spinner />;
};

export default LoadingSpinner;
