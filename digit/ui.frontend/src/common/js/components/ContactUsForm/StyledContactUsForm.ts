import styled from 'styled-components';

import { spacing } from '@/utility/props';
import { headingH6, underlineFixedBody14, body3 } from '@/utility/styles/text';
import { mq } from '@/utility/styles';

export const ContactUsContainer = styled.div`
  ${mq('lg')} {
    max-width: 564px;
  }
`;

export const RadioLabel = styled.label`
${headingH6}
display: inline-block;
`;

export const FormLabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FormUrl = styled.a`
  ${underlineFixedBody14}
  text-transform: none;
  color: ${({ theme }) => theme.colors.text.body['dark-1']};
  letter-spacing: 0;
`;

export const YourMessageText = styled.p`
  ${body3}
  color: ${({ theme }) => theme.colors.text.body['dark-2']};
  ${({ theme }) => spacing({ theme, mb: '10px' })};
`;
