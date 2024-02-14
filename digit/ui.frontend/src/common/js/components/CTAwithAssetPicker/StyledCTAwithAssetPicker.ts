import styled from 'styled-components';

import Grid2 from '@/utility/components/Grid2';
import { spacing } from '@/utility/props';
import { mq } from '@/utility/styles';
import { body4, headingH5, label2 } from '@/utility/styles/text';

export const CTAContainer = styled.div`
  margin: 0 auto;
  ${({ theme }) => spacing({ theme, mt: { xs: '40px', md: '0px' } })}

`;

export const TextContainer = styled.div`
  text-align: center;
`;

export const CTATitle = styled(Grid2.Item)`
  ${headingH5};
  justify-content:center;
  margin-left:auto;
  margin-right:auto;

  ${mq('lg')} {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const CTASummary = styled(Grid2.Item)`
  ${body4};
  margin: 0 auto 28px;
  justify-content:center;

  ${mq('lg')} {
    margin: 0 auto 40px;
  }
`;

export const IconContainer = styled.div`
  
`;

export const CtaImgContainer = styled(Grid2.Item)`
  margin:auto;
`;

export const CtaImage = styled.img`
  width: 100%;
  margin-bottom: 28px;

  ${mq('lg')} {
    margin: 0 auto 40px;
  }
`;

export const ButtonContainer = styled.div`
  button {
    margin-right: auto;
  }
`;
