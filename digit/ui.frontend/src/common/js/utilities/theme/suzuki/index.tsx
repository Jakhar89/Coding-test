import { Fragment } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { normalize } from 'styled-normalize';

import { mq } from '@/styles/index';

import SuzukiBoldWoff from '@/assets/fonts/SuzukiPro-Bold.woff';
import SuzukiRegularWoff from '@/assets/fonts/SuzukiPro-Regular.woff';
import SuzukiBoldWoff2 from '@/assets/fonts/SuzukiPro-Bold.woff2';
import SuzukiRegularWoff2 from '@/assets/fonts/SuzukiPro-Regular.woff2';

import { ChildrenPropTypes } from '@/types/global/generic';
import theme from './theme';

export * from './theme';

const GlobalStyles = createGlobalStyle`

${normalize}

@font-face {
  font-family: 'SuzukiPro';
  font-weight: normal;
  src: url(${SuzukiRegularWoff}) format('woff'),
       url(${SuzukiRegularWoff2}) format('woff2');
}

@font-face {
  font-family: 'SuzukiPro';
  font-weight: bold;
  src: url(${SuzukiBoldWoff}) format('woff'),
       url(${SuzukiBoldWoff2}) format('woff2');
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
