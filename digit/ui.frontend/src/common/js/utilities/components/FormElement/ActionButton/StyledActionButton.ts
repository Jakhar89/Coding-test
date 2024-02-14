import styled from 'styled-components';

import { spacing } from '@/utility/props';
import { mq } from '@/utility/styles';
import { button } from '@/utility/styles/button';

import { ActionButtonStyleProps } from './definitions';

export const Button: any = styled.button<ActionButtonStyleProps>`
  ${({ buttonType, disabled, isLoading }) =>
    button(buttonType, disabled || isLoading ? buttonType + 'Disabled' : buttonType)};
  align-items: center;
  border-width: ${({ buttonType }) => (buttonType === 'tertiary' ? '0 !important' : 'inherit')};
  ${({ theme }) => spacing({ theme, mb: { xs: '24px', md: '27px', lg: '30px' } })};
  display: flex !important;
  flex-direction: row;
  justify-content: center;
  margin-left: auto;
  margin-top: auto;

  ${(p) =>
    p?.icon === 'edit' &&
    `
    min-width: 110px;
    
    ${mq('lg')} {
      min-width: 128px;
    }
  `}
`;

export const Label = styled.span<ActionButtonStyleProps>`
  visibility: ${({ isLoading }) => (isLoading ? 'hidden' : 'visible')};
`;

export const IconWrapper = styled.div<ActionButtonStyleProps>`
  ${({ theme }) => spacing({ theme, pl: '8px' })};
  align-items: center;
  display: flex;
  justify-content: center;
  margin-bottom: auto;
  margin-top: auto;
  padding-bottom: ${({ iconType }) => (iconType === 'edit' ? '2px' : '0')};

  svg {
    height: 16px;
    width: 16px;

    path {
      fill: ${({ theme }) => theme.colors.background['light-1']};
    }
  }
`;

export const Loader = styled.span<ActionButtonStyleProps>`
  animation: rotation .7s linear infinite;
  background: ${({ buttonType }) =>
    buttonType === 'primary' || buttonType === 'reversed'
      ? 'conic-gradient(from 90deg at 50% 50%, rgba(255, 255, 255, 0) 0deg, rgba(255, 255, 255, 0) 0.04deg, #FFFFFF 360deg)'
      : 'conic-gradient(from 90deg at 50% 50%, rgba(26, 26, 26, 0) 0deg, rgba(26, 26, 26, 0) 0.04deg, #1A1A1A 360deg)'};
  border-radius: 50%;
  display: inline-block;
  height: 20px;
  left: 50%;
  margin-left: -10px; // half of width
  margin-top: -10px; // half of height
  position: absolute;
  top: 50%;
  width: 20px;
  clip-path: circle(9px at center);
  mask-image: radial-gradient(circle at center, transparent 7px, black 8px);

  @keyframes rotation {
    100% {
      transform: rotate(360deg)
    }
  }
`;
