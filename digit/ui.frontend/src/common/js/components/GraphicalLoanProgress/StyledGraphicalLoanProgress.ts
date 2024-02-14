import styled, { css, useTheme } from 'styled-components';

import { mq } from '@/utility/styles';
import { body1, body2, body3, fixedBody16, headingH3, headingH6 } from '@/utility/styles/text';

export const LoanProgressContainer = styled.div`
  max-width: 330px;
  width: 100%;
  padding-bottom: 20px;
  margin: 0 auto;

  ${mq('sm')} {
    max-width: 380px;
  }

  ${mq('md')} {
    max-width: 100%;
    padding-bottom: 40px;
  }

  ${mq('lg')} {
    max-width: 1000px;
    padding-bottom: 26px;
  }
`;

export const ArcContainer = styled.div`
  max-width: 290px;
  margin: 0 auto;

  ${mq('sm')} {
    max-width: 450px;
  }

  ${mq('md')} {
    margin-top: -25px;
  }

  ${mq('lg')} {
    max-width: 500px;
    margin-top: -22px;
  }

  ${mq('xl')} {
    margin-top: -40px;
  }

  ${mq('xxl')} {
    margin-top: -48px;
  }
`;

export const ProgressTitle = styled.h6`
  ${headingH6}
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text.heading['dark-2']};
  margin-bottom: 0 !important;
`;

export const ProgressCopy = styled.p`
  ${body1}
  color: ${({ theme }) => theme.colors.text.heading['dark-2']};
`;

export const LoanInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 20px;
  align-items: center;
`;

export const LoanInfo = styled.div`
  text-align: center;
  margin-top: -5px;
  flex-grow: 1;
  flex-basis: 0;

  ${mq('lg')} {
    margin-top: -10px;
  }
`;

export const LoanInfoLabelOne = styled.div`
  color: ${({ theme }) => theme.colors.text.body['dark-1']};

  ${mq.lessThan('xl')} {
    width: 80px;
  }

  ${mq.lessThan('lg')} {
    width: 60px;
  }

`;

export const LoanInfoLabel = styled.div`
  color: ${({ theme }) => theme.colors.text.body['dark-1']};

  ${mq.lessThan('xl')} {
    width: 110px;
  }

  ${mq.lessThan('lg')} {
    width: 97px;
  }
`;

export const LoanInfoValue = styled.div`
  ${headingH3}

  ${mq('md')} {
    font-size: 24px;
  }

  ${mq('lg')} {
    font-size: 32px;
    margin-bottom: 0 !important;
  }
  
  ${mq('xl')} {
    font-size: 40px;
  }
`;

export const LoanInfoCopy = styled.div`
  ${fixedBody16}
  margin-bottom: 0;
  display: flex;
  column-gap: 6px;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.border['border-1']};
`;

export const ArcCanvasContainer = styled.div`
  max-height: 150px;
  max-width: 220px;

  margin: 0 auto;
  overflow: hidden;

  ${mq('lg')} {
    max-height: 220px;
    max-width: 326px;
  }

  ${mq('xl')} {
    max-height: 248px;
    max-width: 368px;
  }

  .CircularProgressbar .CircularProgressbar-path {
    stroke: ${({ theme }) => {
      const color = theme.colors.button.primary['default-1'];
      if (color.includes('linear-gradient')) {
        return `url(#powerAllianceGrandientId)`;
      }
      return `${color}`;
    }};
  }
`;

export const ArcInfo = styled.div`
  text-align: center;
  position: absolute;
  width: 100%;
  height: 100%;
  margin-top: -70%;
`;

export const AccountNumber = styled.div`
  ${mq.lessThan('md')} {
    display: flex;
    column-gap: 8px;
    align-items: center;
    margin-bottom: 24px;
  }
`;

export const ACLabel = styled.p`
  ${body2}
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text.heading['dark-1']};
  margin-bottom: 0 !important;
`;

export const ACNumber = styled.p`
  ${body3};
  margin-top: 1px;
  color: ${({ theme }) => theme.colors.text.body['dark-1']};
`;

export const IconWrapper = styled.div`
  min-width: 24px;
  cursor: pointer;
`;

export const SvgContainer = styled.div`
  position: relative;

  .baseArc {
    stroke: rgb(214, 214, 214);
    stroke-width: 7;
    stroke-linecap: butt;
  }
  
  .progressArc {
    stroke-width: 7;
    stroke-linecap: butt;
    stroke: ${({ theme }) => {
      const color = theme.colors.button.primary['default-1'];
      if (color.includes('linear-gradient')) {
        return `url(#powerAllianceGrandientId)`;
      }
      return `${color}`;
    }};
  }
  
  .iconCircle {
    fill: ${({ theme }) => {
      const color = theme.colors.button.primary['default-1'];
      if (color.includes('linear-gradient')) {
        return `url(#powerAllianceGrandientId)`;
      }
      return `${color}`;
    }};;
    filter: drop-shadow(0px 0px 2px rgba(0,0,0,0.12));
  }

  .hideCurveSquare {
    fill: #fff;
    stroke: #fff;
  }
`;
