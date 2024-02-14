import ReactSelect from 'react-select';
import styled from 'styled-components';

import { spacing } from '@/utility/props';
import { fixedBody16 } from '@/utility/styles/text';

export const ReactSelectElement = styled(ReactSelect)`
  .react-select__control {
    ${fixedBody16}
    ${({ theme }) => spacing({ theme, py: '18px', px: '24px', mb: 0 })};
    align-items: center;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.colors.border['border-1']};
    display: flex;
    justify-content: space-between;

    &::after {
      ${({ theme }) => spacing({ theme, ml: '8px' })};
      background: transparent url("data:image/svg+xml,%3Csvg focusable='false' enable-background='new 0 0 10 6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Expand' class='coveo-category-facet-collapse-children-svg'%3E%3Ctitle%3EExpand%3C/title%3E%3Cg fill='%23fffff'%3E%3Cpath d='m5 5.932c-.222 0-.443-.084-.612-.253l-4.134-4.134c-.338-.338-.338-.886 0-1.224s.886-.338 1.224 0l3.522 3.521 3.523-3.521c.336-.338.886-.338 1.224 0s .337.886-.001 1.224l-4.135 4.134c-.168.169-.39.253-.611.253z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E") no-repeat right 50%;
      content: "";
      display: inline-block;
      height: 8px;
      transform: rotate(0deg);
      width: 10px;
    }

    &.react-select__control--menu-is-open::after {
      transform: rotate(-180deg);
    }

    .react-select__value-container {
      padding: 0;
    }

    .react-select__single-value,
    .react-select__placeholder {
      margin-left: 0;
    }

    &:hover {
      border: 1px solid ${({ theme }) => theme.colors.border['border-2']};
    }

    &:focus{
      border: 2px solid ${({ theme }) => theme.colors.global['info-1']};
    }
  }

  .react-select__menu {
    ${({ theme }) => spacing({ theme, p: '12px' })};
    border-radius: 4px;
    border: 2px solid transparent;
    list-style: none;

    .react-select__option {
      ${({ theme }) => spacing({ theme, p: '12px 16px' })};
      margin-bottom: 0 !important;
      ${fixedBody16}
      position: relative;
      background-color: transparent;

      &:hover {
        background-color: ${({ theme }) => theme.colors.background['light-2']};
      }
  
      &:focus {
        border-color: ${({ theme }) => theme.colors.global['info-1']};
      }

      &.react-select__option--is-focused, 
      &.react-select__option--is-selected {
        color: inherit;
        background-color: ${({ theme }) => theme.colors.background['light-2']};
      }

    }
  }

  .react-select__indicators {
    display: none;
  }
`;
