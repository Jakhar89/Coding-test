import styled from 'styled-components';

import { spacing } from '@/utility/props';
import { mq } from '@/utility/styles';
import { body3, underlineFixedBody16, underlineFixedBody12 } from '@/utility/styles/text';
import { buttonOrLinkFocusState } from '@/utility/theme/global/colors';

export const LegalCompliancesContentWrapper = styled.div`
  color: ${({ theme }) => theme.colors.text.body['dark-2']};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;

  ${mq('md')} {
    flex-direction: row;
    align-items: baseline;
  }
`;

export const LegalCompliancesContent = styled.div`
  ${body3}
  ${({ theme }) => spacing({ theme, my: { xs: 'macro2', md: 0 }, mt: { md: 'macro2' } })};

  ${mq('md')} {
    text-align: left;
  }
`;

export const LegalCompliancesContentItem = styled.li`
  ${underlineFixedBody12}
  list-style-type: none;
  margin: 0 !important;
  text-transform: capitalize;
  white-space: nowrap;

  &:not(:first-child) {
      ${({ theme }) => spacing({ theme, pl: '30px' })};
  }

  ${mq('md')} {
    ${underlineFixedBody16};
  }
`;

export const LegalCompliancesContentItemLink = styled.a`
  color: inherit;

  ${buttonOrLinkFocusState()}
`;

export const LegalCompliancesContentItemWrapper = styled.ul`
  display: flex;
  justify-content: center;
  margin: 0 !important;
  ${({ theme }) => spacing({ theme, pl: { xs: '0', md: '42px' } })};
`;
