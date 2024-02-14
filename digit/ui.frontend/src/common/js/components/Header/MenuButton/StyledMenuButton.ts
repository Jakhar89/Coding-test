import styled from 'styled-components';

import { body2 } from '@/utility/styles/text';
import { spacing } from '@/utility/props';
import { mq } from '@/utility/styles';

export const Button = styled.div`
  display: flex;
  ${({ theme }) => spacing({ theme, pr: '20px' })};
  flex-direction: row;
  align-items: center;
  cursor: pointer;

  ${mq('md')} {
    display: none;
  }
`;

export const Label = styled.span`
  ${body2}
  margin-bottom: 0 !important;
`;

export const IconWrapper = styled.span`
  ${({ theme }) => spacing({ theme, pl: '12px' })};
`;
