import React from 'react';

import { withSvg } from '@/utility/components/Icon/Svg';

const Svg = () => (
  <>
    <path d="M11 7H13V9H11V7ZM11 11H13V17H11V11Z" />
  </>
);

export default withSvg(24, 24)(Svg);
