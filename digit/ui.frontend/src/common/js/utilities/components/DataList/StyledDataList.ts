import styled from 'styled-components';

import { spacing } from '@/utility/props';
import { mq } from '@/utility/styles';
import { body0, body1, body2, boldBody0, boldBody1, boldBody2, fixedBody12 } from '@/utility/styles/text';

import { ContentWrapperProps, DataListItem, DataListStyleProps, ListHeader } from './definitions';

export const Container = styled.div``;

export const Title = styled.span`
  ${body1}
  color: ${({ theme }) => theme.colors.text.body['dark-2']};
  margin: 0 !important;
  width: 100%;
  word-break: break-word;
`;

export const BoldTitle = styled(Title)`
  ${boldBody1}
`;

export const BoldValue = styled.span`
  ${boldBody0}
  margin: 0 !important;
  padding-left: 12px;
  text-align: right;
  width: 100%;
`;

export const Value = styled.span<DataListStyleProps>`
  ${body0}
  align-self: center;
  color: ${({ isNegativeAmount, theme }) =>
    isNegativeAmount ? theme.colors.global['error-1'] : theme.colors.text.body['dark-1']};
  margin-bottom: 0 !important;
  margin-left: auto;
  padding-left: 12px;
  text-align: right;
  width: 100%;
  word-break: break-word;
`;

export const ContentWrapper = styled.div<ContentWrapperProps>`
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border['border-1']};
  ${({ theme }) =>
    spacing({
      theme,
      pt: { xs: '16px', md: '20px' },
      pb: { xs: '12px', md: '20px' },
    })};
  display: flex;
  flex-direction: ${({ direction }) => (direction ? direction : 'unset')}
  justify-content: ${({ justify }) => (justify ? justify : 'unset')}
  

  &:first-child {
    padding-top: 0;
  }
`;

export const ListHead = styled.div<ListHeader>`
  margin-bottom:0 !important;
  ${({ regular }) => (regular ? body2 : boldBody2)}
  color: ${({ theme }) => theme.colors.text.body['dark-1']};
  width: ${({ listSize }) => (listSize ? 100 / listSize + '%' : 'auto')}

  ${({ columnWidth }) =>
    columnWidth &&
    `
    width: ${columnWidth}%;
  `}

  ${mq.lessThan('sm')}{
    width:100%;
    margin-top:${({ regular }) => (regular ? '10px' : '0')}
    margin-bottom:${({ regular }) => (regular ? '20px !important' : '0')}
  }
`;

export const DisclaimerText = styled.span`
  ${fixedBody12}
  color: ${({ theme }) => theme.colors.text.body['dark-2']};
  display: block;
  margin-bottom: 0 !important;
`;

export const IconWrapper = styled.div`
  ${({ theme }) => spacing({ theme, pl: '8px' })};
  align-items: center;
  display: flex;
  justify-content: center;
  margin-bottom: auto;
  margin-top: auto;
  padding-bottom: '2px';
  flex:none;
  cursor: pointer;

  svg {
    path {
      fill: ${({ theme }) => theme.colors.icon['dark-2']};
    }
  }
`;
