import styled from 'styled-components';

import spacing from '@/props/spacing';
import { body1, headingH5 } from '@/styles/text';

export const Container = styled.div`
  border-radius: 6px;
  ${({ theme }) => spacing({ theme, mt: 'micro2', mb: 'micro3', p: 'micro1' })};

  &.error {
    background-color: ${({ theme }) => theme.colors.global['error-2']};
    border: 1px solid ${({ theme }) => theme.colors.global['error-1']};
  }

  &.info {
    background-color: ${({ theme }) => theme.colors.global['info-2']};
    border: 1px solid ${({ theme }) => theme.colors.global['info-1']};
  }

  &.success {
    background-color: ${({ theme }) => theme.colors.global['success-2']};
    border: 1px solid ${({ theme }) => theme.colors.global['success-1']};
  }

  &.warning {
    background-color: ${({ theme }) => theme.colors.global['warning-2']};
    border: 1px solid ${({ theme }) => theme.colors.global['warning-1']};
  }
  `;

export const Heading = styled.h5`
  ${headingH5}
`;

export const Content = styled.p`
  ${body1}
  margin-bottom: 0 !important;
`;
