import styled from 'styled-components';

import { spacing } from '@/utility/props';
import { mq } from '@/utility/styles';
import { label2 } from '@/utility/styles/text';

export const TitleWrapper = styled.div`
  display: block;

  ${mq('md')} {
    ${({ theme }) => theme.colors.button.tertiary['default-1']};
    display: flex;
    justify-content: space-between;
  }
`;
export const TitleComponentElement = styled.div`

`;

export const LinkWrapper = styled.div`
  min-width: 100px;
  padding-left: 20px;
  align-self: end;
`;
export const Link = styled.a`
  ${label2};
  color: ${({ theme }) => theme.colors.button.tertiary['default-1']};
  ${({ theme }) => spacing({ theme, mb: 'micro2' })};
  text-decoration: none;
  text-align: right;
`;
