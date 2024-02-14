import React from 'react';

import { withSvg } from '@/utility/components/Icon/Svg';

const Svg = () => (
  <>
    <path d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z" />
  </>
);

export default withSvg(24, 24)(Svg);
