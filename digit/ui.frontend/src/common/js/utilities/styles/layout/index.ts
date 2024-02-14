import { css } from 'styled-components';

export const aspect = (width, height) => css`
  position: relative;

  &:before {
    content: '';
    display: block;
    padding-top: ${(height / width) * 100}%; // this works because padding in percentages is based on width
    width: 100%;
  }
`;
