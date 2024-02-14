import React from 'react';
import { withSvg } from '@/utility/components/Icon/Svg';

const Svg = () => (
  <>
    <path
      d="M0 12H18V10H0V12ZM0 7H18V5H0V7ZM0 0V2H18V0H0Z"
      fill="white"
    />
  </>
);

export default withSvg(24, 24)(Svg);
