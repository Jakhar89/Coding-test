import React from 'react';

import { withSvg } from '@/utility/components/Icon/Svg';

const Svg = () => (
  <>
    <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" />
  </>
);

export default withSvg(24, 24)(Svg);
