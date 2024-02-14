import React, { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { withSvg } from '@/utility/components/Icon/Svg';

const Svg = () => {
  const randomId = useMemo(() => uuidv4(), []);
  return (
    <>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26 45C37.598 45 47 35.598 47 24C47 12.402 37.598 3 26 3C14.402 3 5 12.402 5 24C5 35.598 14.402 45 26 45ZM26 48C39.2548 48 50 37.2548 50 24C50 10.7452 39.2548 0 26 0C12.7452 0 2 10.7452 2 24C2 37.2548 12.7452 48 26 48Z"
      ></path>
    </>
  );
};

export default withSvg(50, 50)(Svg);
