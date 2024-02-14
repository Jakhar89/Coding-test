import { css } from 'styled-components';

import { throwInDev } from '@/utility/helpers/dev';
import { mq } from '@/utility/styles/';
import { label2, label3 } from '@/utility/styles/text';
import { buttonOrLinkFocusState } from '@/utility/theme/global/colors';
import { IButtonColors, IButtonSettings } from '@/utility/theme/global/definitions';

export function buttonReset() {
  return css`
    display: inline-block;
    padding: 0;
    margin: 0;
    text-decoration: none;
    background: transparent;
    border-color: transparent;
    color: inherit;
    font-family: inherit;
    font-size: 1rem;
    cursor: pointer;
    text-align: center;
    appearance: none;
  `;
}

export function buttonColors(settings: IButtonColors) {
  return css`
    // hack to handle gradient borders
    background: ${settings?.borderImage ? settings?.borderImage : settings?.background};
    border-color: ${settings?.borderColor};
    color: ${settings?.color};
    position: relative;

    svg {
      fill: ${settings?.color};
    }

    &:visited {
      color: ${settings?.color};

      path {
        fill: ${settings?.color};
      }

      &:hover {
        path {
          fill: ${settings?.colorHover};
        }
      }
    }

    &:hover {
      background: ${settings?.backgroundHover};
      border-color: ${settings?.borderHover} !important;
      color: ${settings?.colorHover};

      svg {
       fill: ${settings?.colorHover};
      }
    }

    ${buttonOrLinkFocusState()}

    &:active {
      background: ${settings?.backgroundActive};
      border-color: ${settings?.borderActive};
      color: ${settings?.colorActive};
    }

    /* You have the option of disabled attr for form elements, or data-disabled for any other */
    &:disabled,
    &[data-disabled] {
      &:hover {
        background: ${settings?.background};
        color: ${settings?.color};
      }

      &:active {
        background: ${settings?.background};
      }
    }
  `;
}

export function buttonSize(settings: IButtonSettings) {
  return css`
    ${label3}
    border-style:  ${settings?.borderStyle} !important;
    border-width:  ${settings?.borderWidth} !important;
    border-top-left-radius: ${settings?.borderRadius?.topLeft ? `${settings?.borderRadius?.topLeft}px` : null};
    border-top-right-radius: ${settings?.borderRadius?.topRight ? `${settings?.borderRadius?.topRight}px` : null};
    border-bottom-right-radius: ${
      settings?.borderRadius?.bottomRight ? `${settings?.borderRadius?.bottomRight}px` : null
    };
    border-bottom-left-radius: ${settings?.borderRadius?.bottomLeft ? `${settings?.borderRadius?.bottomLeft}px` : null};
    padding: ${settings?.padding.sm.y}px ${settings?.padding.sm.x}px;
    text-align: center;

    ${mq('md')} {
      ${label2}
      padding: ${settings?.padding.md.y}px ${settings?.padding.md.x}px;
    }
  `;
}

export const button =
  (size = 'primary', color = 'primary') =>
  ({ theme }) => {
    if (typeof size !== 'string') {
      // most likely got a theme object. give helpful error
      throwInDev(
        `Invalid button 'size' parameter (${size}). Usage: button([size],[color]) => curried fn. Did you forget to add parenthesis?`,
      );
    }

    return css`
    ${buttonReset}
    ${buttonSize(theme.button[size])}
    ${buttonColors(theme.button.colors[color])}
  `;
  };
