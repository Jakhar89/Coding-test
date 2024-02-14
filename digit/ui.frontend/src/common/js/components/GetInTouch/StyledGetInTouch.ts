import styled from 'styled-components';

import Grid from '@/utility/components/Grid';
import { mq, svg } from '@/utility/styles';
import { body0, body3 } from '@/utility/styles/text';

export const GetInTouchContainer = styled.div`
    padding: 60px 25px;
    background: #fff;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.12);
`;

export const GridRowContainer = styled(Grid.Row)`
  ${mq.lessThan('lg')} {
    display: flex;
    flex-direction: column;
  }
`;

export const GridItemContainer = styled(Grid.Item)`
  display: flex;
  width: auto;
  &.buttonAlign {
    ${mq.lessThan('lg')} {
      padding-left: 105px;
    }
  }
`;

export const TextContainer = styled.div`

`;

export const GetInTouchTitle = styled.div`
  ${body0}
  font-weight: 400 !important;
  font-size: 28px !important;
`;

export const GetInTouchSummary = styled.div`
  ${body3}
  font-weight: 400 !important;
  font-size: 16px !important;
  width: 95%;
`;

export const IconContainer = styled.div`
  padding-right: 40px;
  svg {
    max-width: 83px;
    max-height: 83px;
  }
  ${mq.lessThan('lg')} {
    padding-right: 20px;
  }
`;

export const ButtonContainer = styled.div`
  padding-top: 20px;
  button {
    font-size: 14px !important;
    font-weight: 600 !important;
    letter-spacing: 0.12em !important;
    line-height: 140% !important;
    padding: 12px 20px;
    margin-bottom: 0px;
  }
`;
