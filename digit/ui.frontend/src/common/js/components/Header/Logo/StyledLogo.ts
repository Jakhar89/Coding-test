import styled, { css } from 'styled-components';
import { spacing } from '@/utility/props';
import { mq } from '@/utility/styles';

import { SidebarProps } from '../definitions';

export const LogoAnchor = styled.a``;

export const LogoWrapper = styled.div<SidebarProps>`
  display: flex;
  flex-grow: 1;

  // override default width from Logo utility
  ${mq.lessThan('sm')} {
    svg, img {
      width: 95px;
    }
  }

  ${({ shouldShowSidebarMenu }) =>
    shouldShowSidebarMenu &&
    css`
    ${({ theme }) =>
      spacing({
        theme,
        pb: '20px !important',
        pl: { xs: '24px' },
        pt: '22px !important',
      })};
  `}
`;
