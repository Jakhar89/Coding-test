import React from 'react';
import { withSvg } from '@/utility/components/Icon/Svg';

const Svg = () => (
  <>
    <path
      d="M6.375 8.75H15.075L12.525 6.2L13.6 5.125L18 9.525L13.65 13.875L12.575 12.8L15.125 10.25H6.375V8.75ZM8.775 0.5V2H1.5V17H8.775V18.5H1.5C1.1 18.5 0.75 18.35 0.45 18.05C0.15 17.75 0 17.4 0 17V2C0 1.6 0.15 1.25 0.45 0.95C0.75 0.65 1.1 0.5 1.5 0.5H8.775Z"
      fill="white"
    />
  </>
);

export default withSvg(24, 24)(Svg);
