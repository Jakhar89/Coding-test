import React from 'react';

import { withSvg } from '@/utility/components/Icon/Svg';

const Svg = () => (
  <>
    <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
  </>
);

export default withSvg(24, 24)(Svg);
