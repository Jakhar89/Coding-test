import styled from 'styled-components';

import Grid from '@/utility/components/Grid';
import { spacing } from '@/utility/props';
import { mq } from '@/utility/styles';
import depth from '@/utility/styles/depth';
import { body1, fixedBody16, headingH1, label3 } from '@/utility/styles/text';

export const BorderHr = styled.span`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border['border-1']};
  display: block;
  margin-bottom:16px;
`;

export const GridRowContainer = styled(Grid.Row)``;

export const GridItemContainer = styled(Grid.Item)`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

export const ContentWrapper = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background['light-1']};
  display: flex;
  justify-content: center;
  pointer-events: auto;
  width: 100%;
  z-index: ${depth.MODALOVERLAY};

  ${mq.lessThan('md')} {
    box-sizing: border-box;
    height: 100%;
    left: 0;
    overflow: hidden;
    position: fixed;
    top: 0;
    padding-left: 24px;
    padding-right: 24px;
  }

  ${mq('lg')} {
    min-height: 560px;
  }

  
`;

export const DropDownBanks = styled.div`
${({ theme }) => spacing({ theme, px: { xs: '0', md: '15%' } })};
  & .bankListDropdown{
    li{
      text-align:left;
      padding-left: 40px;
      span {
        ${fixedBody16};
        color: ${({ theme }) => theme.colors.text.body['dark-1']}
      }
    }
  }
`;

export const IconWrapper = styled.div`
  ${({ theme }) => spacing({ theme, p: { xs: '21px', md: '42px' }, mb: { xs: 'macro2', md: 'micro2' } })};
  align-items: center;
  border-radius: 50%;
  border: 4px solid ${({ theme }) => theme.colors.border['border-1']};
  display: flex;
  justify-content: center;

  ${mq('md')} {
    border-width: 8px;
  }

  svg {
    height: 50px;
    width: 50px;

    ${mq('md')} {
      height: 100px;
      width: 100px;
    }
  }
`;

export const Heading = styled.h1`
  ${headingH1}
  max-width: 760px;
`;

export const NominateAccLabel = styled.div`
${label3}
${({ theme }) => spacing({ theme, p: '10px', mt: '20px', mb: 0 })};
color: ${({ theme }) => theme.colors.text.body['dark-1']};
text-align:left;
padding: 10px 0;
`;

export const Description = styled.div`
  ${body1}
  color: ${({ theme }) => theme.colors.text.body['dark-2']};
  max-width: 760px;
  margin-bottom: 0 !important;
`;

export const IconWrapperLoading = styled.div`
  ${({ theme }) => spacing({ theme, p: { xs: '25px', md: '50px' }, mb: { xs: 'macro2', md: 'micro2' } })};
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;

  svg {
    height: 50px;
    width: 50px;

    ${mq('md')} {
      height: 100px;
      width: 100px;
    }
  }

  &::before {
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-name: spinning;
    animation-timing-function: linear;
    border-radius: 50%;
    border: 4px solid ${({ theme }) => theme.colors.border['border-1']};
    border-left-color: ${({ theme }) => theme.colors.border['divider-1']};
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;

    ${mq('md')} {
      border-width: 8px;
    }

    @keyframes spinning {
      from { transform: rotate(0deg) }
      to { transform: rotate(360deg) }
    }
  }
`;
