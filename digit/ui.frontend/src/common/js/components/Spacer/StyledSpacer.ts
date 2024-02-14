import styled from 'styled-components';

import { mq } from '@/utility/styles';

import { SpacerParsedProps } from './definitions';

export const SpacerElement = styled.div<SpacerParsedProps>`
  margin-top: ${({ mobileSpace }) => mobileSpace + 'px'};

  ${mq('md')} {
    margin-top: ${({ tabletSpace }) => tabletSpace + 'px'};
  }

  ${mq('lg')} {
    margin-top: ${({ desktopSpace }) => desktopSpace + 'px'};
  }
`;
