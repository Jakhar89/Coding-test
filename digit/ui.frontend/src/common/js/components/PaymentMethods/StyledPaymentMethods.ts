import styled from 'styled-components';

import { label3 } from '@/utility/styles/text';
import { mq } from '@/utility/styles';
import { spacing } from '@/utility/props';

import Grid from '@/utility/components/Grid';

export const Container = styled.div`
  ${({ theme }) => spacing({ theme, p: 'macro2', mb: 'macro2' })};
  background-color: ${({ theme }) => theme.colors.background['light-2']};
`;

export const HeadingAndDescriptionContainer = styled.div`
  ${({ theme }) => spacing({ theme, mb: 'macro2' })};
`;

export const PaymentMethodsContainer = styled(Grid.Row)`
  ${mq.lessThan('xl')} {
    flex-direction: column;
  }
`;

export const NominatedPaymentMethodContainer = styled(Grid.Item)`
  ${({ theme }) => spacing({ theme, mt: { xs: '42px', md: 0 } })};
  background-color: ${({ theme }) => theme.colors.background['light-1']};
  border-radius: 10px 0 10px 10px;
  border: 2px solid ${({ theme }) => theme.colors.border['border-2']};
  display: flex;
  flex-direction: column;
  position: relative;

  ${mq('xl')} {
    flex-direction: row;
  }

  &::before {
    ${label3}
    ${({ theme }) => spacing({ theme, p: '8px 24px 8px 8px', m: 0 })};
    background-color: ${({ theme }) => theme.colors.background['dark-1']};
    border-radius: 5px 5px 0 0;
    color: ${({ theme }) => theme.colors.text.body['light-1']};
    content: "${({ flagText }) => flagText ?? 'Nominated payment method'}";
    position: absolute;
    right: -2px;
    text-align: center;
    top: -34px;
  }
`;

export const IconWrapper = styled.div`
  svg {
    position: absolute;
    right: 4px;
    top: -24px;
    height: 12px;
    width: 12px;
    path {
      fill: white;
    }
  }
`;

export const OtherPaymentMethodContainer = styled(Grid.Item)`
  ${({ theme }) => spacing({ theme, mt: { xs: '42px', md: 0 } })};
  border-radius: 10px 0 10px 10px;
  display: flex;
  flex-direction: column;

  ${mq('xl')} {
    flex-direction: row;
  }
`;
