import styled from 'styled-components';

import { headingH2, headingWithDivider, label2 } from '@/utility/styles/text';
import { spacing } from '@/utility/props';

export const AnchorLinkTitle = styled.h2`
  ${headingWithDivider(headingH2, 'default')};
  ${({ theme }) => spacing({ theme, mb: { xs: 'micro2' } })}
`;

export const AnchorLinkItems = styled.ul`
  margin: 0;
  padding: 0;
`;

export const AnchorLinkItem = styled.li`
  list-style-type: none;
  ${({ theme }) => spacing({ theme, mb: 'micro2' })};

  &:last-child {
    margin-bottom: 0 !important;
  }
`;

export const AnchorLink = styled.a`
  all: unset;
  ${label2}
  color: ${({ theme }) => theme.colors.button.tertiary['default-1']};
  cursor: pointer;
  margin-bottom: 0;
`;

export const RichTextContainer = styled.div`
  h2 {
    ${headingWithDivider(headingH2, 'default')};
    ${({ theme }) => spacing({ theme, mt: 'macro1' })};
  }
`;
