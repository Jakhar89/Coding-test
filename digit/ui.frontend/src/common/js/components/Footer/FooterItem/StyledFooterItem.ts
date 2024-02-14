import styled from 'styled-components';

import { spacing } from '@/utility/props';
import { mq } from '@/utility/styles';
import { button } from '@/utility/styles/button';
import { label2, label3 } from '@/utility/styles/text';

export const ItemWrapper = styled.ul`
  ${({ theme }) => spacing({ theme, my: 0, p: 0 })};

  ${mq('md')} {
    align-items: center;
    display: flex;
    flex-direction: row;
    margin-left: auto;
    flex-wrap: wrap;
  }
`;

export const Item = styled.li`
  ${label3}
  align-items: flex-start;
  display: inline-flex;
  list-style-type: none;

  &:last-child {
    ${({ theme }) => spacing({ theme, pr: { md: 0 } })};
  }

  ${mq('md')} {
    ${label2}
  }

  ${({ theme }) =>
    spacing({
      theme,
      pr: { xs: 'macro2', md: 'micro2', xl: 'macro2' },
      mb: '0 !important',
    })};

  ${mq('lg')} {
    white-space: nowrap;
  }
`;

export const Link = styled.a`
  ${button('tertiary', 'tertiaryReversed')};
  ${({ theme }) => spacing({ theme, mb: { xs: 'macro2', md: '15px', xl: 0 } })};

  ${mq.lessThan('md')} {
    text-align: left;
  }
`;

export const Label = styled.span``;
