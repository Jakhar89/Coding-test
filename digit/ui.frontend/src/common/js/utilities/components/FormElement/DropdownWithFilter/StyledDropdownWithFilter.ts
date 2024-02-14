import {
  AUTOSIZE_INPUT_CLS,
  CARET_ICON_CLS,
  CONTROL_CONTAINER_CLS,
  LOADING_DOTS_CLS,
  MENU_CONTAINER_CLS,
  OPTION_CLS,
  OPTION_DISABLED_CLS,
  OPTION_FOCUSED_CLS,
  OPTION_SELECTED_CLS,
} from 'react-functional-select/dist/constants';
import styled, { css } from 'styled-components';

import { spacing } from '@/utility/props';
import { mq } from '@/utility/styles';
import { fixedBody16 } from '@/utility/styles/text';

import { DropdownWithFilterStyleProps } from './definitions';

export const StyledDropdownConfig = {
  color: {
    iconSeparator: 'transparent !important',
    placeholder: ({ theme }) => theme.colors.text.body['dark-2'],
  },
  noOptions: {
    css: `
      all: unset;
      display: block;
      text-align: center;
      ${fixedBody16}
    `,
  },
};

// !!IMPORTANT NOTES: If Dropdown styling has change this styling will require to update too!
export const SelectContainer = styled.div<DropdownWithFilterStyleProps>`
  ${fixedBody16}
  background-color: transparent;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.text.body['dark-1']};
  margin: 0;
  padding: 0;

  /* rfs-control-container */
  .${CONTROL_CONTAINER_CLS} {
    ${({ theme }) => spacing({ theme, py: '18px', px: '24px', mb: 0 })};
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.colors.border['border-1']};
    box-shadow: none;
    cursor: pointer;
    line-height: inherit;

    &:hover {
      border-color: ${({ theme }) => theme.colors.border['border-2']};
    }

    &:focus-within, &:focus {
      outline: 2px auto ${({ theme }) => theme.colors.global['info-1']} !important;
    }

    ${({ hasError }) =>
      hasError &&
      css`
      outline: 2px auto ${({ theme }) => theme.colors.global['error-1']} !important;
    `}

    /* Placeholder container */
    div {
      height: 24px;
      padding: 0;
    }
  }

  .${LOADING_DOTS_CLS} {
    display: none;
  }

  /* rfs-caret-icon */
  .${CARET_ICON_CLS} {
    align-items: center;
    border: none !important;
    /* Check object length is not empty to hide magnifying lens icon or chevron icon */
    display: ${({ isSelected }) => (!isSelected ? 'flex' : 'none')};
    justify-content: center;
    padding: 0;
    width: 24px;

    ${({ isSearchable }) =>
      isSearchable
        ? css`
      /* UNSET transform and transition for search icon */
      transform: unset;
      transition: unset;

      &::after {
        /* Search Icon */
        background-image: url("data:image/svg+xml,%3Csvg width='18' height='19' viewBox='0 0 18 19' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16.9 18.975L10.325 12.4C9.825 12.8333 9.24167 13.1708 8.575 13.4125C7.90833 13.6541 7.2 13.775 6.45 13.775C4.65 13.775 3.125 13.15 1.875 11.9C0.625 10.65 0 9.14164 0 7.37498C0 5.60831 0.625 4.09998 1.875 2.84998C3.125 1.59998 4.64167 0.974976 6.425 0.974976C8.19167 0.974976 9.69583 1.59998 10.9375 2.84998C12.1792 4.09998 12.8 5.60831 12.8 7.37498C12.8 8.09164 12.6833 8.78331 12.45 9.44998C12.2167 10.1166 11.8667 10.7416 11.4 11.325L18 17.875L16.9 18.975ZM6.425 12.275C7.775 12.275 8.925 11.7958 9.875 10.8375C10.825 9.87914 11.3 8.72498 11.3 7.37498C11.3 6.02498 10.825 4.87081 9.875 3.91248C8.925 2.95414 7.775 2.47498 6.425 2.47498C5.05833 2.47498 3.89583 2.95414 2.9375 3.91248C1.97917 4.87081 1.5 6.02498 1.5 7.37498C1.5 8.72498 1.97917 9.87914 2.9375 10.8375C3.89583 11.7958 5.05833 12.275 6.425 12.275Z' fill='black'/%3E%3C/svg%3E");
        content: "";
        display: inline-block;
        height: 18px;
        width: 18px;
      }
      `
        : css`
          &::after {
            /* Chevron Icon  */
           background: transparent url("data:image/svg+xml,%3Csvg focusable='false' enable-background='new 0 0 10 6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Expand' class='coveo-category-facet-collapse-children-svg'%3E%3Ctitle%3EExpand%3C/title%3E%3Cg fill='%23fffff'%3E%3Cpath d='m5 5.932c-.222 0-.443-.084-.612-.253l-4.134-4.134c-.338-.338-.338-.886 0-1.224s.886-.338 1.224 0l3.522 3.521 3.523-3.521c.336-.338.886-.338 1.224 0s .337.886-.001 1.224l-4.135 4.134c-.168.169-.39.253-.611.253z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E") no-repeat right 50%;
           content: "";
           display: inline-block;
           height: 7.5px;
           width: 12px;
          }
      `};
  }

  /* rfs-menu-container <-- Dropdown option container  */
  .${MENU_CONTAINER_CLS} {
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    color: ${({ isLoading }) =>
      !isLoading ? ({ theme }) => theme.colors.text.body['dark-1'] : ({ theme }) => theme.colors.text.body['dark-2']};
    margin: 8px 0 0 0;
    max-height: 312px;
    max-width: ${({ isLoading }) => (isLoading ? '267px' : '100% !important')};
    padding: ${({ hasOptions, isLoading }) => (hasOptions && !isLoading ? '20px 0 20px 12px' : '28px 24px')};

    // the following is required to enforce options appearing correctly - see DDW-2802
    & > div {
      max-height: 272px !important;

      ${mq('lg')} {
        max-height: 184px !important;
      }
    }

    // desktop drowdown is shorter than mobile/tablet
    ${mq('lg')} {
      max-height: 224px;
    }
  }

  .${AUTOSIZE_INPUT_CLS} {
    line-height: inherit;
    width: 100% !important;
  }

  /* rfs-option <--- Dropdown option */
  .${OPTION_CLS} {
    align-items: center;
    border-radius: 4px;
    border: 2px solid transparent;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    height: auto !important;
    overflow-wrap: break-word !important;
	  ${({ theme }) => spacing({ theme, py: { xs: '6px', lg: '10px' }, pl: '10px' })}
	  text-align: left;
    user-select: none;
    white-space: normal;
    will-change: top;
    -webkit-tap-highlight-color: transparent;

    &::before {
      content: "";
      display: inline-block;
      height: 24px;
    }

    /* On hover*/
    &.${OPTION_FOCUSED_CLS},
    &:hover:not(.${OPTION_DISABLED_CLS}):not(.${OPTION_SELECTED_CLS}) {
      background-color: ${({ theme }) => theme.colors.background['light-2']};
    }

    /* On focus */
    &.${OPTION_FOCUSED_CLS},
    &:focus:not(.${OPTION_DISABLED_CLS}):not(.${OPTION_SELECTED_CLS}) {
      background-color: unset;
      border: 2px solid ${({ theme }) => theme.colors.global['info-1']};
    }

    /* On select */
    &.${OPTION_SELECTED_CLS} {
      background-color: unset;
      color: ${({ theme }) => theme.colors.text.body['dark-1']};
    }
  }
`;

export const CustomClearSvg = styled.svg`
  color: ${({ theme }) => theme.colors.icon['dark-1']};
  height: 14px;
  padding: 5px;
  width: 14px;
`;

export const IconWrapper = styled.div`
  div{
    alignItems: center;
  }
`;
