import { mq } from '@/utility/styles';
import { body1, headingH3, headingH4 } from '@/utility/styles/text';
import styled from 'styled-components';

export const DisputeProcessCompent = styled.div`
`;

export const DisputeProcessDisclaimer = styled.div`
  margin-top: -20px;
`;

export const DisputeProcessComponentElement = styled.div`
  counter-increment: step-by-step;
  padding-left: 120px;
  padding-bottom: 94px;
  position: relative;

  ${mq.lessThan('lg')} {
    padding-left: 90px;
    padding-bottom: 60px;
  }

  :not(:last-child)::before {
    background: ${({ theme }) => theme.colors.text.body['dark-2']};
    width: 1px;
    left: 40px;
    top: 42px;
    bottom: -42px;
    content: "";
    display: block;
    position: absolute;

    ${mq.lessThan('lg')} {
      left: 20px;
      top: 40px;
    }
  }

  ::after{
    ${headingH3}
    background: #fff;
    border-radius: 50%;
    border-style: solid;
    border-width: 2px;
    border-image: ${({ theme }) => theme.colors.border['divider-2']} 1;
    border: 2px solid ${({ theme }) => theme.colors.border['divider-1']};
    content: counter(step-by-step);
    height: 74px;
    left: 0;
    line-height: 74px !important;
    position: absolute;
    text-align: center;
    top: 0;
    width: 74px;

    ${mq.lessThan('lg')} {
      width: 38px;
      height: 38px;
      line-height: 38px !important;
      font-size: 20px;
    }
  }
`;

export const Heading = styled.div`
  ${headingH4}
`;

export const Description = styled.div`
  ${body1}
  width: 750px;

  ${mq.lessThan('lg')} {
    width: 100%;
  }
`;
