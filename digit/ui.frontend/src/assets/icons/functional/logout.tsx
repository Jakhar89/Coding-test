import React from 'react';

import { withSvg } from '@/utility/components/Icon/Svg';

const Svg = () => (
  <>
    <path d="M9.375 11.25H18.075L15.525 8.7L16.6 7.625L21 12.025L16.65 16.375L15.575 15.3L18.125 12.75H9.375V11.25ZM11.775 3V4.5H4.5V19.5H11.775V21H4.5C4.1 21 3.75 20.85 3.45 20.55C3.15 20.25 3 19.9 3 19.5V4.5C3 4.1 3.15 3.75 3.45 3.45C3.75 3.15 4.1 3 4.5 3H11.775Z" />
  </>
);

export default withSvg(24, 24)(Svg);
