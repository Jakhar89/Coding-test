import styled from 'styled-components';

import { mq, svg } from '@/utility/styles';

export const Wrapper = styled.div`
  display: inline;
  flex-shrink: 0;
  width: 95px;

  &.hino {
    ${svg(140, 63)}
  }

  &.lexus {
    ${svg(200, 63)}
  }

  &.mazda,
  &.powertorque {
    ${svg(200, 84)}
  }

  &.power-alliance {
    ${svg(200, 67)}
  }

  &.suzuki {
    ${svg(150, 37)}
  }

  &.toyota {
    ${svg(180, 42)}
  }

  // >= tablet
  ${mq('sm')} {
    width: 150px;

    &.toyota {
      width: 180px;
    }
  }
`;
