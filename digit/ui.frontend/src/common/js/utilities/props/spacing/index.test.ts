import spacing, { applyValue } from '../spacing';

import { IPropList } from '../types';
import { BREAKPOINTS, getZeroMediaQuery } from '../../styles/mq';

const BREAKPOINT_KEYS = Object.keys(BREAKPOINTS);
const XS = BREAKPOINT_KEYS[0];
const SM = BREAKPOINT_KEYS[1];
const MQ_XS = BREAKPOINTS[XS];
const MQ_SM = BREAKPOINTS[SM];

const theme = {
  spacing: {
    [XS]: {
      micro1: 26,
      micro2: 24,
      micro3: 18,
    },
    [SM]: {
      micro1: 26,
      micro2: 24,
      micro3: 18,
    },
  },
};

const spacing_xs_micro1 = theme.spacing[XS]['micro1'];
const spacing_sm_micro1 = theme.spacing[SM]['micro1'];
const spacing_xs_micro2 = theme.spacing[XS]['micro2'];
const spacing_sm_micro2 = theme.spacing[SM]['micro2'];

// ${spacing({ theme, mt: 5, mb: 2 })}

describe('utils/props/spacing', () => {
  it('generates ouput single property', () => {
    const output = `${spacing({ theme, mt: 'micro2' })}`;

    expect(output).toEqual(
      `margin-top: ${spacing_xs_micro2}px; ` + `@media (min-width: ${MQ_SM}px) { margin-top: ${spacing_sm_micro2}px; }`,
    );
  });

  it('handles multiple properties', () => {
    const output = `${spacing({ theme, mt: 'micro2', mb: 'micro1' })}`;
    expect(output).toEqual(
      `margin-top: ${spacing_xs_micro2}px; ` +
        `@media (min-width: ${MQ_SM}px) { margin-top: ${spacing_sm_micro2}px; } ` +
        `margin-bottom: ${spacing_xs_micro1}px; ` +
        `@media (min-width: ${MQ_SM}px) { margin-bottom: ${spacing_sm_micro1}px; }`,
    );
  });

  it('handles pixel values', () => {
    const output = `${spacing({ theme, mt: { xs: '9px' }, mb: { xs: '5px', sm: '7px' } })}`;
    expect(output).toEqual(
      `margin-top: 9px; ` + `margin-bottom: 5px; ` + `@media (min-width: ${MQ_SM}px) { margin-bottom: 7px; }`,
    );
  });

  it('handles auto values', () => {
    const output = `${spacing({ theme, mt: 'auto' })}`;
    expect(output).toEqual('margin-top: auto;');
  });

  it('supports mixing breakpoints and values', () => {
    const output = `${spacing({ theme, p: 'micro2', pl: { xs: '17px', sm: '29px' } })}`;
    expect(output).toEqual(
      `padding: ${spacing_xs_micro2}px; ` +
        `@media (min-width: ${MQ_SM}px) { padding: ${spacing_sm_micro2}px; } ` +
        `padding-left: 17px; ` +
        `@media (min-width: ${MQ_SM}px) { padding-left: 29px; }`,
    );
  });

  it('falls back to earlier breakpoint value if none defined', () => {
    const output = `${spacing({ theme, p: { xs: 'micro1', lg: 'micro2' } })}`;
    expect(output).toEqual(
      `padding: ${spacing_xs_micro1}px; @media (min-width: 992px) { padding: ${spacing_sm_micro2}px; }`,
    );
  });

  it('handles any non-numeric value', () => {
    const output = `${spacing({
      theme,
      mt: { xs: 'calc(100% - 7px)', sm: 'calc(50% + 3rem)' },
    })}`;

    expect(output).toEqual(
      `margin-top: calc(100% - 7px); ` + `@media (min-width: ${MQ_SM}px) { margin-top: calc(50% + 3rem); }`,
    );
  });

  it('handles negative numbers', () => {
    const output = `${spacing({ theme, mt: '-micro2', mb: '-micro1' })}`;
    expect(output).toEqual(
      `margin-top: ${-spacing_xs_micro2}px; ` +
        `@media (min-width: ${MQ_SM}px) { margin-top: ${-spacing_sm_micro2}px; } ` +
        `margin-bottom: ${-spacing_xs_micro1}px; ` +
        `@media (min-width: ${MQ_SM}px) { margin-bottom: ${-spacing_sm_micro1}px; }`,
    );
  });

  it('handles factors', () => {
    const output = `${spacing({ theme, mt: 'micro2', mb: 'micro1', config: { factor: 0.5 } })}`;
    expect(output).toEqual(
      `margin-top: ${0.5 * spacing_xs_micro2}px; ` +
        `@media (min-width: ${MQ_SM}px) { margin-top: ${0.5 * spacing_sm_micro2}px; } ` +
        `margin-bottom: ${0.5 * spacing_xs_micro1}px; ` +
        `@media (min-width: ${MQ_SM}px) { margin-bottom: ${0.5 * spacing_sm_micro1}px; }`,
    );
  });
});

describe('utils/props/spacing.applyValue', () => {
  it('spacing helper generates ouput single property', () => {
    const props = {
      mb: ['margin-bottom'],
    };

    const output = applyValue(props, theme, 'mb', 'micro2', XS);

    expect(output).toEqual([`margin-bottom: ${spacing_xs_micro2}px;`]);
  });
});
