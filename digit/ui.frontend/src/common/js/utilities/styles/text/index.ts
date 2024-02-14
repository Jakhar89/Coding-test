import { css } from 'styled-components';

import spacing from '@/props/spacing';

import { mq } from '../';
import { IFixedTypographySetting, ITypographySetting } from '../../theme/global/definitions';

function headingStyle(settings: ITypographySetting) {
  return `
    margin: 0;
    ${settings.fontFamily ? `font-family: ${settings.fontFamily};` : ''}
    ${settings.fontSize ? `font-size: ${settings.fontSize.xs}px;` : ''}
    ${settings.fontWeight ? `font-weight: ${settings.fontWeight};` : ''}
    ${settings.letterSpacing ? `letter-spacing: ${settings.letterSpacing}px;` : ''}
    ${settings.lineHeight ? `line-height: ${settings.lineHeight.xs};` : ''}

    ${mq('sm')} {
      ${settings.fontSize ? `font-size: ${settings.fontSize.sm}px;` : ''}
      ${settings.fontWeight ? `font-weight: ${settings.fontWeight};` : ''}
      ${settings.letterSpacing ? `letter-spacing: ${settings.letterSpacing}px;` : ''}
      ${settings.lineHeight ? `line-height: ${settings.lineHeight.sm};` : ''}

    }

    ${mq('lg')} {
      ${settings.fontSize ? `font-size: ${settings.fontSize.lg}px;` : ''}
      ${settings.fontWeight ? `font-weight: ${settings.fontWeight};` : ''}
      ${settings.letterSpacing ? `letter-spacing: ${settings.letterSpacing}px;` : ''}
      ${settings.lineHeight ? `line-height: ${settings.lineHeight.lg};` : ''}
    }
  `;
}

function bodyStyle(settings: ITypographySetting) {
  return `
    margin: 0;
    ${settings.fontFamily ? `font-family: ${settings.fontFamily};` : ''}
    ${settings.fontSize ? `font-size: ${settings.fontSize.xs}px;` : ''}
    ${settings.fontWeight ? `font-weight: ${settings.fontWeight};` : ''}
    ${settings.lineHeight ? `line-height: ${settings.lineHeight.xs};` : ''}
    ${settings.textTransform ? `text-transform: ${settings.textTransform};` : ''}
    ${settings.spacing ? `margin-bottom: ${settings.spacing.xs}px;` : ''}

    ${mq('sm')} {
      ${settings.fontSize ? `font-size: ${settings.fontSize.sm}px;` : ''}
      ${settings.lineHeight ? `line-height: ${settings.lineHeight.sm};` : ''}
      ${settings.spacing ? `margin-bottom: ${settings.spacing.sm}px;` : ''}
    }

    ${mq('lg')} {
      ${settings.fontSize ? `font-size: ${settings.fontSize.lg}px;` : ''}
      ${settings.lineHeight ? `line-height: ${settings.lineHeight.lg};` : ''}
      ${settings.spacing ? `margin-bottom: ${settings.spacing.lg}px;` : ''}
    }
  `;
}

function boldBodyStyle(settings: ITypographySetting) {
  return `
    ${settings.fontWeight ? `font-weight: ${settings.fontWeight}` : ''}
  `;
}

function fixedStyle(settings: IFixedTypographySetting) {
  return `
    ${settings.fontFamily ? `font-family: ${settings.fontFamily};` : ''}
    ${settings.fontSize ? `font-size: ${settings.fontSize}px;` : ''}
    ${settings.fontWeight ? `font-weight: ${settings.fontWeight};` : ''}
    ${settings.letterSpacing ? `letter-spacing: ${settings.letterSpacing}em;` : ''}
    ${settings.lineHeight ? `line-height: ${settings.lineHeight};` : ''}
    ${settings.spacing ? `margin-bottom: ${settings.spacing}px;` : ''}
  `;
}

function boldFixedStyle(settings: IFixedTypographySetting) {
  return `
    ${settings.fontWeight ? `font-weight: ${settings.fontWeight}` : ''}
  `;
}

function labelStyle(settings: IFixedTypographySetting) {
  return `
    display: block;
    ${settings.textTransform ? `text-transform: ${settings.textTransform};` : ''}
    ${fixedStyle(settings)}
  `;
}

// headings
export const headingH1 = ({ theme }) => `
  ${headingStyle(theme.typography.headings.H1)}
  ${spacing({ theme, mb: 'micro2' })}
`;
export const headingH2 = ({ theme }) => `
  ${headingStyle(theme.typography.headings.H2)}
  ${spacing({ theme, mb: 'micro4' })}
`;
export const headingH3 = ({ theme }) => `
  ${headingStyle(theme.typography.headings.H3)}
  ${spacing({ theme, mb: 'micro4' })}
`;
export const headingH4 = ({ theme }) => `
  ${headingStyle(theme.typography.headings.H4)}
  ${spacing({ theme, mb: 'micro4' })}
`;
export const headingH5 = ({ theme }) => `
  ${headingStyle(theme.typography.headings.H5)}
  ${spacing({ theme, mb: 'micro4' })}
`;
export const headingH6 = ({ theme }) => `
  ${headingStyle(theme.typography.headings.H6)}
  ${spacing({ theme, mb: 'micro4' })}
`;

const dividerType = {
  default: {
    height: 6,
    marginBottom: {
      xs: 16,
      md: 20,
    },
    width: 50,
  },
  slim: {
    height: 4,
    marginBottom: {
      xs: 12,
      md: 12,
    },
    width: 60,
  },
};

export const headingWithDivider = (headingType = headingH2, type = 'default') => {
  return css`
    ${headingType}

    ::before {
      content: "";
      display: block;
      left: 0;
      top: 0;
      width: ${dividerType[type].width}px;
      height: ${dividerType[type].height}px;
      margin-bottom: ${dividerType[type].marginBottom.xs}px;
      background: ${({ theme }) => theme.colors.border['divider-1']};

      ${mq('md')} {
        margin-bottom: ${dividerType[type].marginBottom.md}px;
      }
   }
  `;
};
// body text
export const body0 = ({ theme }) => `${bodyStyle(theme.typography?.text?.body0)}`;
export const body1 = ({ theme }) => `${bodyStyle(theme.typography?.text?.body1)}`;
export const body2 = ({ theme }) => `${bodyStyle(theme.typography?.text?.body2)}`;
export const body3 = ({ theme }) => `${bodyStyle(theme.typography?.text?.body3)}`;
export const body4 = ({ theme }) => `${bodyStyle(theme.typography?.text?.body4)}`;
export const boldBody0 = ({ theme }) => {
  return `
  ${bodyStyle(theme.typography?.text?.body0)}
  ${boldBodyStyle(theme.typography?.text?.boldBody0)}
  `;
};
export const boldBody1 = ({ theme }) => {
  return `
  ${bodyStyle(theme.typography?.text?.body1)}
  ${boldBodyStyle(theme.typography?.text?.boldBody1)}
  `;
};
export const boldBody2 = ({ theme }) => {
  return `
  ${bodyStyle(theme.typography?.text?.body2)}
  ${boldBodyStyle(theme.typography?.text?.boldBody2)}
  `;
};
export const boldBody3 = ({ theme }) => {
  return `
  ${bodyStyle(theme.typography?.text?.body3)}
  ${boldBodyStyle(theme.typography?.text?.boldBody3)}
  `;
};
export const boldBody4 = ({ theme }) => {
  return `
  ${bodyStyle(theme.typography?.text?.body4)}
  ${boldBodyStyle(theme.typography?.text?.boldBody4)}
  `;
};
export const underlineBody1 = ({ theme }) => {
  return `
  ${bodyStyle(theme.typography.text.body1)}
  text-decoration: underline;
  `;
};
export const underlineBody2 = ({ theme }) => {
  return `
  ${bodyStyle(theme.typography.text.body2)}
  text-decoration: underline;
  `;
};
export const underlineBody3 = ({ theme }) => {
  return `
  ${bodyStyle(theme.typography.text.body3)}
  text-decoration: underline;
  `;
};
export const underlineBody4 = ({ theme }) => {
  return `
  ${bodyStyle(theme.typography.text.body4)}
  text-decoration: underline;
  `;
};
// fixed body text
export const fixedBody16 = ({ theme }) => `${fixedStyle(theme.typography.text.fixedBody16)}`;
export const fixedBody14 = ({ theme }) => `${fixedStyle(theme.typography.text.fixedBody14)}`;
export const fixedBody12 = ({ theme }) => `${fixedStyle(theme.typography.text.fixedBody12)}`;
export const fixedBody10 = ({ theme }) => `${fixedStyle(theme.typography.text.fixedBody10)}`;
export const fixedBody8 = ({ theme }) => `${fixedStyle(theme.typography.text.fixedBody8)}`;
export const boldFixedBody16 = ({ theme }) => {
  return `
  ${fixedStyle(theme.typography.text.fixedBody16)}
  ${boldFixedStyle(theme.typography?.text?.boldFixedBody16)}
  `;
};
export const boldFixedBody14 = ({ theme }) => {
  return `
  ${fixedStyle(theme.typography.text.fixedBody14)}
  ${boldFixedStyle(theme.typography?.text?.boldFixedBody14)}
  `;
};
export const boldFixedBody12 = ({ theme }) => {
  return `
  ${fixedStyle(theme.typography.text.fixedBody12)}
  ${boldFixedStyle(theme.typography?.text?.boldFixedBody12)}
  `;
};
export const boldFixedBody10 = ({ theme }) => {
  return `
  ${fixedStyle(theme.typography.text.fixedBody10)}
  ${boldFixedStyle(theme.typography?.text?.boldFixedBody10)}
  `;
};
export const boldFixedBody8 = ({ theme }) => {
  return `
  ${fixedStyle(theme.typography.text.fixedBody8)}
  ${boldFixedStyle(theme.typography?.text?.boldFixedBody8)}
  `;
};
export const underlineFixedBody16 = ({ theme }) => {
  return `
  ${fixedStyle(theme.typography.text.fixedBody16)}
  text-decoration: underline;
  `;
};
export const underlineFixedBody14 = ({ theme }) => {
  return `
  ${fixedStyle(theme.typography.text.fixedBody14)}
  text-decoration: underline;
  `;
};
export const underlineFixedBody12 = ({ theme }) => {
  return `
  ${fixedStyle(theme.typography.text.fixedBody12)}
  text-decoration: underline;
  `;
};
export const underlineFixedBody10 = ({ theme }) => {
  return `
  ${fixedStyle(theme.typography.text.fixedBody10)}
  text-decoration: underline;
  `;
};
export const underlineFixedBody8 = ({ theme }) => {
  return `
  ${fixedStyle(theme.typography.text.fixedBody8)}
  text-decoration: underline;
  `;
};
// label text
export const label1 = ({ theme }) => `${labelStyle(theme.typography.text.label1)}`;
export const label2 = ({ theme }) => `${labelStyle(theme.typography.text.label2)}`;
export const label3 = ({ theme }) => `${labelStyle(theme.typography.text.label3)}`;
