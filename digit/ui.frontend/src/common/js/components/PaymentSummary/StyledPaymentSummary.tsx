import styled from 'styled-components';

import Grid from '@/utility/components/Grid';
import { spacing } from '@/utility/props';
import { mq } from '@/utility/styles';
import { button } from '@/utility/styles/button';
import {
    body1,
    body2,
    body3,
    boldBody2,
    fixedBody14,
    headingH5,
    headingH6,
    headingWithDivider
} from '@/utility/styles/text';
import { globalColors } from '@/utility/theme/global/colors';

export const ButtonContainer = styled.div`
    display: flex;
    ${({ theme }) => spacing({ theme, mt: '30px' })};

    button{
      margin-bottom: 0px;
    }
`;

export const ButtonWrapper = styled.div`
  margin-left: auto;
  position: relative;

  svg {
    ${({ theme }) => spacing({ theme, mr: { xs: 'micro2', md: 'micro3' } })};
    cursor: pointer;
    position: absolute;
    right: -24px;
    top: 0;
    width: 16px;

    ${mq('md')} {
      top: 2px;
    }
  }
`;

export const CloseButton = styled.button`
  ${button('tertiary', 'tertiary')};
  ${({ theme }) => spacing({ theme, mr: { xs: 'micro2', md: 'micro3' }, mb: 'micro2' })};
  margin-left: auto;
  position: relative;

  &:active, &:focus {
    border-color: ${({ theme }) => theme.colors.button.tertiary['hover-2']};
  }
`;

export const BorderHr = styled.span`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border['border-1']};
  display: block;
  margin-bottom:16px;
`;

export const DirectDebitIconWrapper = styled.div`
display:flex;
width:24px;
border-radius:50%;
border: 1px solid ${globalColors['success-1']}
background: ${globalColors['success-2']}

`;

export const DirectDebitEmpty = styled.div`
display:flex;
height:24px;
`;

export const EditDeleteIconWrapper = styled.div`
display:flex;
svg{
  &:first-child{
    ${({ theme }) => spacing({ theme, mr: { xs: 'macro2', md: 'micro2' } })}
  }
}
`;

export const NextDueDateContainer = styled.div`
  ${mq('lg')}{
    max-width: 564px;
  }
`;

export const ManageBankAccountFormContainer = styled.div`
  ${mq('lg')}{
    max-width: 564px;
  }
`;

export const PaymentFrequencyContainer = styled.div`
  .rfs-option svg{
    position:absolute;
    top:12px;
  }

  .rfs-option .label{
    padding-left: 40px;
  }
`;

export const PaymentMethodContainer = styled.div`
  ${mq('lg')}{
    max-width: 564px;
  }
`;

export const DescriptionContainer = styled.div`
  ${body1};

  a {
    color: #000000;
  }
`;

export const MessageBoxHeader = styled.div`
  ${headingH5};
  margin-bottom: 0 !important;
`;

export const MessageBoxContent = styled.div`
  ${body3};
  line-height: 200% !important;
`;

export const MessageBoxContentLabel = styled.span`
  font-weight: 700;
`;

export const MessageBoxSection = styled.div`
  ${body3};
`;

export const IconWrapper = styled.div`
  cursor: pointer;
`;

export const IconWrapperInline = styled.span`
  cursor: pointer;
  display: inline-block;
  width: 12px;
  padding-left: 4px;
`;

export const SuccessIconContainer = styled.div`
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

export const Container = styled.div`
  ${({ theme }) => spacing({ theme, p: 'micro2', mb: 'micro2' })};
  background-color: ${({ theme }) => theme.colors.background['light-2']};
  gap: 20px;
  margin-bottom: 0px !important;

  .eftBpayContainer {
    margin-bottom: 20px;
  }

  .eftBpayWrapper{
    display: flex;
    align-items: flex-start;
    width: auto;
  }
`;

export const HeadingWithSlimDivider = styled.h5`
  ${headingWithDivider(headingH5, 'slim')};
  ::before{
    background: ${({ theme }) => theme.colors.border['divider-2']};
  }
  margin-bottom: 12px !important;
`;

export const NoNextLineWrapper = styled.div`
  display: flex;
`;

export const Title = styled.p`
  ${boldBody2}
  margin: 0 !important;

  &::after {
    content: "\\00a0"
  }
`;

export const Detail = styled.p`
  ${body2}
  margin: 0 !important;
`;

export const GridRowContainer = styled(Grid.Row)``;

export const GridItemContainer = styled(Grid.Item)`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

export const PaymentMethodWrapper = styled.div`
  ${mq('lg')}{
    max-width: 564px;
  }
`;

export const DirectDebitWrapper = styled.div`
  button {
    margin-left: 0px;
    margin-botton: 0px;
  }

  .rfs-menu-container {
    padding: 20px 16px;
  }

  .rfs-control-container {
    .icon, .subText {
      display: none;
    }
  }

  .rfs-option {
    div{
      width: inherit;
      .subText {
        float: right;
      }
    }

    &.rfs-option-disabled {
      opacity: 1;
      padding: 12px;
      border-bottom: 1px solid #d9d9d9 !important;
      border-radius: 0;
      height: 100px;

      ${mq.lessThan('md')}{
        padding-top: 0;
        
        > div {
          display: flex;
          align-items: center;

          .label {
            width: calc(100% - 60px);
          }
          .subText {
            width: 60px;
            ${fixedBody14};
            line-height: 18px;
            margin-bottom: 0;
          }
        }
      }
    }

    &.rfs-option-focused {
      border: transparent;
    }

    &.rfs-option-focused {
      border: transparent;
    }
  }

  .rfs-option svg{
    position:absolute;
    top:14px;
  }

  .rfs-option .label{
    padding-left: 40px;
  }
`;

export const PaymentMethodTextWrapper = styled.div`
  ${body1}
  a {
    color: #000000;
  }
`;

export const RefundToggleHeader = styled.div`
  ${headingH6};
`;
