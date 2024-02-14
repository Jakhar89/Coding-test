import styled, { css } from 'styled-components';

import { spacing } from '@/utility/props';
import { fixedBody16 } from '@/utility/styles/text';

export const SearchContainer = styled.div`
  position: relative;
`;

export const TextBoxInput = styled.input`
  ${fixedBody16}
  ${({ theme }) =>
    // prettier ignore
    spacing({
      theme,
      m: 0,
      px: '24px',
      py: '18px',
    })};
  padding-right: 53px;
  background-color: ${({ theme }) => theme.colors.background['light-1']};
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border['border-1']};
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.text.body['dark-1']};
  line-height: 24px;
  outline-offset: 0px;
  width: 100%;
  word-break: break-all;
  word-wrap: break-word;

  &:hover {
    border-color: ${({ theme }) => theme.colors.border['border-2']};
  }

  &:focus {
    outline-color: ${({ theme }) => theme.colors.global['info-1']};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.background['light-2']};
    pointer-events: none;
  }

  &::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: ${({ theme }) => theme.colors.text.body['dark-2']};;
}

  &:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: ${({ theme }) => theme.colors.text.body['dark-2']};;
  }

  &:-ms-input-placeholder { /* Microsoft Edge */
    color: ${({ theme }) => theme.colors.text.body['dark-2']};;
  }
`;

export const IconContainer = styled.div<{ isClose: boolean }>`
  position: absolute;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  right: 0;
  ${({ isClose }) => (isClose ? `cursor: pointer` : '')};

  svg {
    ${({ isClose }) =>
      isClose
        ? `
      width: 24px;
      padding: 18px 19px 18px 10px;
    `
        : `
      width: 30px;
      padding: 15px 23px 15px 10px;
    `};
  }
`;
