import styled, { css } from 'styled-components';

import Grid from '@/utility/components/Grid';
import { spacing } from '@/utility/props';
import { mq } from '@/utility/styles';
import { body0, boldBody1, fixedBody16, headingH4, headingH6, headingWithDivider } from '@/utility/styles/text';

import { CardTitleProps, InnerContainerProps } from './definitions';

export const CardGroup = styled.div`
`;

export const GridContainer = styled(Grid.Container)`
${mq('xs')}{
  ${({ theme }) => spacing({ theme, p: '0' })};
}

`;

export const GridRowContainer = styled(Grid.Row)`
  ${mq.lessThan('lg')} {
    display: flex;
  }
`;

export const GridItemContainer = styled(Grid.Item)`
  display: flex;
  ${mq.lessThan('md')} {
    margin-bottom: 24px;
  }
`;

export const CardContainer = styled.div`
display: flex;
flex-direction: column;
width: 100%;
${({ theme }) => spacing({ theme, p: { xs: 'micro2' } })};

  ${mq('lg')}{
    padding: 16px 24px 30px;
  }
`;

export const ButtonWrapper = styled.div`
  padding: 24px 30px;
  margin-top: 24px;
`;

export const BodyWrapper = styled.div`
`;

export const ContentWrapper = styled.div`
  padding: 24px 30px;
`;

export const CardWrapper = styled.div`
display:flex;
  ${mq.lessThan('md')}{
    flex-direction:column;
  }
`;

export const InnerContainer = styled.div<InnerContainerProps>`
  display:flex;
  flex-direction:column;

  ${mq('md')}{
    width: ${({ size }) => `${size?.[0]}%`};
    &:last-child{
      padding-left:5px;
    }
  }

  ${mq('xl')}{
    width: ${({ size }) => `${size?.[1]}%`};
  }
`;

export const CardTitle = styled.div<CardTitleProps>`
  ${({ divider }) => (divider ? headingWithDivider(headingH4) : headingH4)};

  margin-bottom: 8px;

  ${mq('md')}{
    margin-bottom: 12px;
  }

  &:before{
    margin-top: -20px;
  }
  &.renderH4{
    ${headingH6}
  }
`;

export const TitleContainer = styled.div`
  border-bottom: 2px solid ${({ theme }) => theme.colors.background['light-2']};

  ${mq.lessThan('md')}{
    border-top: 2px solid ${({ theme }) => theme.colors.background['light-2']};
    margin-top: 20px;
    padding-top: 20px;
    margin-bottom: 20px;
  }
  
  ${mq('md')}{
    padding-left: 40px;
    padding-bottom: 5px;
  }
`;

export const TransactionContainer = styled.div`
  ${mq('md')}{
    padding-left: 40px;
    padding-top: 30px;
  }
`;

export const LoanProgressContainer = styled.div`
  margin-bottom: 15px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.background['light-2']};
`;

export const RegoPlate = styled.div`
  ${boldBody1}
  color: ${({ theme }) => theme.colors.text.body['dark-2']};
  margin-bottom: 6px;

  ${mq('md')}{
    margin-bottom: 12px;
  }
`;
export const NextRepay = styled.div`
  ${fixedBody16}
  color: ${({ theme }) => theme.colors.text.body['dark-2']};
  margin-bottom:0;
  padding-bottom: 3px;
`;

export const SubNav = styled.div``;

export const SubNavButton = styled.div`
font-size: xxx-large;
max-height: 46px;
display: flex;
position: relative;
cursor:pointer;
width: fit-content;
margin-left: auto;
margin-right: 0;

line-height: 34px;
margin-bottom: 12px;
margin-top: -12px;

&:hover{
  color:${({ theme }) => theme.colors.link['light-2']}
}
`;
export const Dropdown = styled.ul`
  box-shadow: 0 10px 15px -3px rgba(46,41,51,.08), 0 4px 6px -2px rgba(71,63,79,.16);
  display: none;
  box-sizing: border-box;
  left: auto;
  list-style: none;
  position: absolute;
  right: 0;
  z-index: 9999;
  cursor:default;
  background:${({ theme }) => theme.colors.background['light-1']}
  color:initial;
  width: 207px;
  padding: 18px 14px;

  &.show{
    display:block;
  }

  li{
    ${fixedBody16};
    padding: 14px;
    margin-bottom: 0;
    &:hover{
      color:${({ theme }) => theme.colors.link['light-2']}
    }
  }

  a{
    text-decoration: none;
    color: inherit;
  }
`;

export const ButtonContainer = styled.div`
display:flex;
align-self: start;
margin-bottom: 0;
margin-top: auto;

${mq('xs')}{
  button{
    margin-bottom:0;
    padding: 10px;
  }
}

${mq('md')}{
  padding-left: 40px;
}

`;

export const NextRepayData = styled.div`
  ${body0};
  display:flex;
  ${mq.lessThan('md')}{
    padding-bottom: 22px;
    margin-bottom: 16px;
    border-bottom: 2px solid ${({ theme }) => theme.colors.background['light-2']};
  }
`;

export const NextDate = styled.div`
${body0}
${({ theme }) => spacing({ theme, pr: { xs: 'micro3' } })}
`;

export const NextAmount = styled.div`
  border-left: 2px solid ${({ theme }) => theme.colors.background['light-2']};
  ${({ theme }) => spacing({ theme, pl: { xs: 'micro3' } })}
  font-weight: bold;
`;

export const IconWrapper = styled.span`
  display: inline-block;
  color:  ${({ theme }) => theme.colors.border['border-1']};
  margin-left: 12px;

  &:hover {
    color:  ${({ theme }) => theme.colors.button.tertiary['default-1']};
  }
`;

export const StoryContainer = styled.div`
  background: #ececec;
  padding: 0 24px;
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  box-sizing: border-box;

  ${mq('sm')}{
    padding: 0 48px;
  }

  ${mq('md')}{
    padding: 0 64px;
  }
  
  ${mq('lg')}{
    padding: 0 80px;
  }

  ${mq('xl')}{
    padding: 0 76px;
  }
`;
