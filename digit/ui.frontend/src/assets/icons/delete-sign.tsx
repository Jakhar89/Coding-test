import React from 'react';

import { withSvg } from '@/utility/components/Icon/Svg';

const Svg = () => (
  <path d="M37.414 1.414L36 0L18.707 17.293L1.414 0L0 1.414L17.293 18.707L0 36L1.414 37.414L18.707 20.121L36 37.414L37.414 36L20.121 18.707L37.414 1.414Z" />
);

export default withSvg(38, 37)(Svg);
