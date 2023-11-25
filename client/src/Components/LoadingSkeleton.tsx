import React from 'react';
import styled, { keyframes } from 'styled-components';

const SkeletonContainer = styled.div`
  margin-top: 20px;
  background-color: #ecf0f1;
  padding: 15px;
  border-radius: 5px;
  text-align: -webkit-center;
`;

const SkeletonLine = styled.div`
  height: 16px;
  width: 50%;
  background-color: #ddd;
  margin: 15px 10px;
`;

// Animation for the loading effect
const loadingAnimation = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const SkeletonLoading = styled(SkeletonLine)`
  background: linear-gradient(90deg, #ddd 25%, #f5f5f5 50%, #ddd 75%);
  background-size: 200% 100%;
  animation: ${loadingAnimation} 1.5s infinite;
`;

const LoadingSkeleton: React.FC = () => {
  return (
    <SkeletonContainer>
      <SkeletonLoading />
      <SkeletonLoading />
    </SkeletonContainer>
  );
};

export default LoadingSkeleton;
