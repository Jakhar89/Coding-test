import styled, { css } from 'styled-components';

import { button } from '@/utility/styles/button';
import { boldBody2 } from '@/utility/styles/text';
import { spacing } from '@/utility/props';
import { mq } from '@/utility/styles';

import { SidebarProps } from '../definitions';
import depth from '@/utility/styles/depth';

export const Label = styled.span`
  color: ${({ theme }) => theme.colors.link['dark-1']};
  white-space: nowrap;

  ${mq.between('md', 'xl')} {
    font-size: 14px !important;
  }

  ${mq.lessThan('md')} {
    color: ${({ theme }) => theme.colors.button.tertiary['default-1']};
  }

  ${mq('md')} {
    ${boldBody2}
    text-transform: initial;
  }
`;

export const Link = styled.a`
  ${button('tertiary', 'tertiary')};
  /* Overwrite default margin bottom and padding */
  margin-bottom: 0 !important;
  padding: 0;

  ${mq('md')} {
    ${({ theme }) => spacing({ theme, pb: '6px', pt: '4px' })}
    border-bottom: 4px solid transparent !important;

    &:active, &:focus, &:hover {
      border-bottom: 4px solid ${({ theme }) => theme.colors.border['divider-1']} !important;
    }
  }

  ${mq.lessThan('md')} {
    text-align: left;
  }
`;

export const NavigationWrapper = styled.div<SidebarProps>`
  align-items: center;
  display: flex;
  flex-direction: row;

  ${mq('md')} {
    ${({ theme }) => spacing({ theme, ml: '30px' })}
  }

  ${mq.lessThan('md')} {
    align-items: flex-start;
    background-color: ${({ theme }) => theme.colors.background['light-1']};
    box-sizing: border-box;
    display: ${({ shouldShowSidebarMenu }) => (!shouldShowSidebarMenu ? 'none' : 'flex')};
    flex-direction: row;
    height: 100vh;
    position: absolute;
    width: 100%;
    z-index: ${depth.HEADER};

    ${({ shouldShowSidebarMenu }) =>
      shouldShowSidebarMenu &&
      css`
      background-color: ${({ theme }) => theme.colors.background['light-2']};
      height: 100%;
      left: 0px;
      position: fixed;
      top: 0px;
      width: 100%;
    `}

    &.darkTheme{
      background-color: ${({ theme }) => theme.colors.background['dark-1']};
  
      span{
        color: ${({ theme }) => theme.colors.background['light-1']};
      }
    }

    > div:not(.logo) {
      border: none;
    }
  }
`;

export const NavItemWrapper = styled.div<SidebarProps>`
  display: flex;
  flex-wrap: wrap;

  ${mq('md')} {
    row-gap: 24px;
  }

  ${mq.lessThan('md')} {
    flex-direction: column;

    > div:not(.logo) {
      ${({ theme }) => spacing({ theme, px: '24px', pt: 0, pb: '26px' })}
    }
  }
`;

export const Item = styled.div`
  ${({ theme }) =>
    spacing({
      theme,
      px: { xs: 0, md: '12px', lg: '24px', xl: '45px' },
    })}
  align-items: center;
  border-right: 1px solid ${({ theme }) => theme.colors.border['border-1']};
  cursor: pointer;
  display: flex;
  padding: auto;
  white-space: nowrap;

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    ${({ theme }) => spacing({ theme, pr: '30px' })};
    border: none;
  }

  svg {
    ${({ theme }) => spacing({ theme, pl: '8px', pb: { md: '4px' } })};

    ${mq.lessThan('md')} {
      width: 16px;
    }

    ${mq.between('md', 'xl')} {
      width: 20px;
    }
  }
`;

export const ClosePanel = styled.div<SidebarProps>`
  background: rgba(0, 0, 0, 0.4);
  display: ${({ shouldShowSidebarMenu }) => (!shouldShowSidebarMenu ? 'none' : 'flex')};
  height: 100%;
  position: relative;
  width: 48px;

  ${mq('md')} {
    display: none;
  }
`;

export const IconButtonWrapper = styled.button`
  all: unset;
  cursor: pointer;
`;
