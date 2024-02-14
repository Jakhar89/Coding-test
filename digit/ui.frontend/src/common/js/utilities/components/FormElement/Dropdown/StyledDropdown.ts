import styled, { css } from 'styled-components';

import { spacing } from '../../../props';
import { fixedBody16 } from '../../../styles/text';

interface Props {
  shouldShowDropdown?: boolean;
  isSelected?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const DropdownButton = styled.span<{
  shouldShowDropdown?: boolean;
}>`
  ${fixedBody16}
  ${({ theme }) => spacing({ theme, py: '18px', px: '24px', mb: 0 })};
  align-items: center;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border['border-1']};
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  &::after {
    ${({ theme }) => spacing({ theme, ml: '8px' })};
    background: transparent url("data:image/svg+xml,%3Csvg focusable='false' enable-background='new 0 0 10 6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Expand' class='coveo-category-facet-collapse-children-svg'%3E%3Ctitle%3EExpand%3C/title%3E%3Cg fill='%23fffff'%3E%3Cpath d='m5 5.932c-.222 0-.443-.084-.612-.253l-4.134-4.134c-.338-.338-.338-.886 0-1.224s.886-.338 1.224 0l3.522 3.521 3.523-3.521c.336-.338.886-.338 1.224 0s .337.886-.001 1.224l-4.135 4.134c-.168.169-.39.253-.611.253z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E") no-repeat right 50%;
    content: "";
    display: inline-block;
    height: 8px;
    transform: ${({ shouldShowDropdown }) => (!shouldShowDropdown ? 'rotate(0deg)' : 'rotate(-180deg)')};
    width: 10px;
  }

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.border['border-2']};
  }

  &:focus{
    border: 2px solid ${({ theme }) => theme.colors.global['info-1']};
  }
`;

export const DropdownMenu = styled.ul<Props>`
  ${({ theme }) => spacing({ theme, py: '20px', px: '16px', m: 0 })};
  background-color: ${({ theme }) => theme.colors.background['light-1']};
  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.colors.border['border-1']};
  display: ${({ shouldShowDropdown }) => (!shouldShowDropdown ? 'none' : 'block')};
  position: absolute;
  top: 100%;
  z-index: 2;
  width:-webkit-fill-available;
`;

export const DropdownList = styled.li`
  ${({ theme }) => spacing({ theme, p: '12px' })};
  border-radius: 4px;
  border: 2px solid transparent;
  list-style: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background['light-2']};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.global['info-1']};
  }
`;

export const DropdownListLabel = styled.span<Props>`
  ${({ theme }) => spacing({ theme, pl: '0px' })};
  ${fixedBody16}
  position: relative;

  ${({ isSelected }) =>
    isSelected &&
    css`
    &:before {
     border-radius: unset;
     border-width: 0 2px 2px 0 !important;
     border: solid ${({ theme }) => theme.colors.icon['dark-1']};
     content: '';
     height: 11px;
     left: 12px;
     position: absolute;
     top: 0;
     transform: rotate(45deg);
     width: 5px;
    }
  `}
`;
