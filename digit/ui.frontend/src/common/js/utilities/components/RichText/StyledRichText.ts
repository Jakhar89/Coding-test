import styled, { css } from 'styled-components';

import { spacing } from '@/utility/props';
import { body1, headingH1, headingH2, headingH3, headingH4, headingH5, headingH6 } from '@/styles/text';
import { buttonOrLinkFocusState } from '@/utility/theme/global/colors';

export const RICH_TEXT_CLASSNAME = 'rich-text';

export const headingStyle = () => css`
  h1 {
    ${headingH1}
  }

  h2 {
    ${headingH2}
  }

  h3 {
    ${headingH3};
  }

  h4 {
    ${headingH4};
  }

  h5 {
    ${headingH5};
  }

  h6 {
    ${headingH6};
  }
`;

export const linkStyle = () => css`
  a {
    color: inherit;
    text-decoration: underline;

    ${buttonOrLinkFocusState()}
  }
`;

export const textStyle = () => css`
  p {
    ${body1}
  }
`;

export const listStyle = () => css`
  ol, ul {
    ${({ theme }) => spacing({ theme, pl: '24px' })};
    ${body1}
  }
`;

export const RichTextWrapper = styled.div`
  ${body1}
  ${headingStyle}
  ${linkStyle}
  ${listStyle}
  ${textStyle}
  margin-bottom: 0 !important;
  word-wrap: break-word;

  p, ul, ol {
    &:last-child {
      margin-bottom: 0;
    }
  }
`;
