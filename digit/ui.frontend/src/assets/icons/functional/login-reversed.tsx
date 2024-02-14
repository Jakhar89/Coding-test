import React from 'react';
import { withSvg } from '@/utility/components/Icon/Svg';

const Svg = () => (
  <>
    <path
      d="M12.225 21V19.5H19.5V4.5H12.225V3H19.5C19.9 3 20.25 3.15 20.55 3.45C20.85 3.75 21 4.1 21 4.5V19.5C21 19.9 20.85 20.25 20.55 20.55C20.25 20.85 19.9 21 19.5 21H12.225ZM10.275 16.375L9.2 15.3L11.75 12.75H3V11.25H11.7L9.15 8.7L10.225 7.625L14.625 12.025L10.275 16.375Z"
      fill="white"
    />
  </>
);

export default withSvg(24, 24)(Svg);
