import React, { useEffect, useState } from 'react';

import { CircularProgressSVG } from './CircularProgressSVG';
import { ArcCanvasContainer, SvgContainer } from './StyledGraphicalLoanProgress';

const GradientSVG = () => {
  // Power Alliance Gradient
  const [startColor, endColor, idCSS, rotation] = [
    'rgb(0, 188, 231)',
    'rgb(98, 187, 70)',
    'powerAllianceGrandientId',
    '90',
  ];

  let gradientTransform = `rotate(${rotation})`;

  return (
    <svg style={{ height: 0, position: 'absolute' }}>
      <defs>
        <linearGradient
          id={idCSS}
          gradientTransform={gradientTransform}
        >
          <stop
            offset="0%"
            stopColor={startColor}
          />
          <stop
            offset="100%"
            stopColor={endColor}
          />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const Arc = ({ percentage = 0, children }) => {
  return (
    <ArcCanvasContainer>
      <GradientSVG />
      <SvgContainer>
        <CircularProgressSVG percentage={percentage} />
        {children}
      </SvgContainer>
    </ArcCanvasContainer>
  );
};

export default Arc;
