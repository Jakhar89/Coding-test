import { Fragment } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { normalize } from 'styled-normalize';

import AltonaSansBoldWoff from '@/assets/fonts/AltonaSans-Bold.woff';
import AltonaSansBoldWoff2 from '@/assets/fonts/AltonaSans-Bold.woff2';
import AltonaSansRegularWoff from '@/assets/fonts/AltonaSans-Regular.woff';
import AltonaSansRegularWoff2 from '@/assets/fonts/AltonaSans-Regular.woff2';
import FuturaWoff from '@/assets/fonts/FuturaStd-Bold.woff';
import FuturaWoff2 from '@/assets/fonts/FuturaStd-Bold.woff2';

import { mq } from '@/styles/index';
import { ChildrenPropTypes } from '@/types/global/generic';

import theme, { FONT_FAMILY_TEXT_BOLD, FONT_FAMILY_TEXT, FONT_FAMILY_TEXT_TWO } from './theme';

export * from './theme';

const GlobalStyles = createGlobalStyle`

${normalize}

@font-face {
  font-family: ${FONT_FAMILY_TEXT_TWO};
  src: url(${FuturaWoff}) format('woff'),
       url(${FuturaWoff2}) format('woff2');
}

@font-face {
  font-family: ${FONT_FAMILY_TEXT};
  src: url(${AltonaSansRegularWoff}) format('woff'),
       url(${AltonaSansRegularWoff2}) format('woff2');
}

@font-face {
  font-family: ${FONT_FAMILY_TEXT_BOLD};
  font-weight: 700;
  src: url(${AltonaSansBoldWoff}) format('woff'),
       url(${AltonaSansBoldWoff2}) format('woff2');
}

html {
  box-sizing: border-box;
  height: 100%;
}

body {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  margin: 0;
  max-width: 100%;
  min-height: 100%;
  min-width: 300px;
  overflow-x: hidden;
  position: relative;
  &.sidebar-menu-active {
    height: 100%;
    overflow: hidden;
    width: calc(100% - 17px);
  }

  &.overlay-active {
    overflow: hidden;
    width: calc(100% - 17px);
  }
}

#root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

img,
picture,
svg {
  vertical-align: middle;
  border-style: none;
  height: auto;
  max-width: 100%;
}

/* TODO - confirm lazyloading images - haven't seen any in designs?
img {
  &.lazyload,
  &.lazyloading  {
    opacity: 0;
  }

  &.lazyloaded {
    ${mq('md')} {
      transition: opacity 0.4s linear;
    }

    opacity: 1;
  }
} */

.hide-on-print {
  @media print {
    display: none !important;
  }
}

@media print {
  * {
      background: transparent !important;
      color: black !important;
      color-adjust: economy;
      box-shadow: none !important;
      text-shadow: none !important;

      &::after {
        box-shadow: none !important;
      }
    }

    // Prevent page breaks in the middle of a blockquote or preformatted text block
    pre,
    blockquote {
      border: 1px solid black;
      break-inside: avoid;
    }

    tr,
    img {
      break-before: auto; /* 'always,' 'avoid,' 'left,' 'inherit,' or 'right' */
      break-after: auto; /* 'always,' 'avoid,' 'left,' 'inherit,' or 'right' */
      break-inside: avoid; /* or 'auto' */
     }
    img { max-width: 100% !important; }

    @page { margin: 0.5cm; }
  }
`;

export default function Theme({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <GlobalStyles />
        {children}
      </Fragment>
    </ThemeProvider>
  );
}

Theme.propTypes = {
  children: ChildrenPropTypes,
};
