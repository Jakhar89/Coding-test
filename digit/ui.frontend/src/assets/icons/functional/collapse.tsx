import React from 'react';

import { withSvg } from '@/utility/components/Icon/Svg';

const Svg = () => (
  <>
    <path
      d="M12 8L6 14L7.41 15.41L12 10.83L16.59 15.41L18 14L12 8Z"
    />
  </>
);

export default withSvg(24, 24)(Svg);
