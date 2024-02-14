import styled from 'styled-components';

import { mq } from '@/utility/styles';

export const MarketingContentContainer = styled.div`
  width: 100%;
  
  ${mq.lessThan('md')} {
    margin-bottom: 30px;
  }
`;

export const MarketingContentImage = styled.img`
  border-radius: 6px;
  width: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
`;

export const MarketingHyperLink = styled.a`
`;
