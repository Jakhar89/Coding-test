import styled from 'styled-components';

import { spacing } from '@/utility/props';
import { mq } from '@/utility/styles';
import { body1 } from '@/utility/styles/text';

export const ButtonContainer = styled.div`
    display: flex;

    &>button {
        margin-left: 0;
    }
`;

export const PaginationContainer = styled.div<{ isActive: boolean }>`
    ${({ isActive }) => !isActive && `display: none;`}
`;

export const TblHeader = styled.div`
    display: flex;
    align-items: end;
    min-height: 36px;

    &.sortIcon {
        cursor: pointer;
    }
`;

export const IconContainer = styled.div`
    display: inline-block;
    line-height: 100%;
    
    svg {
        width: 28px;

        ${mq('md')}{
            width: 36px;
        }
    }
`;

export const DateFilterContainer = styled.div`
    ${mq('md')}{
        display: flex;
        column-gap: 56px;

        &> div {
            flex-grow: 1;
        }
    }
`;

export const NoDataText = styled.div`
    ${body1}
    color: ${({ theme }) => theme.colors.text.body['dark-2']};
`;

export const TableWrapper = styled.div`

    // Override existing last-child style for spacing
    tr td:last-child span {
        ${body1};
    }
    ${mq('lg')}{
        thead tr th:first-child {
            min-width: 106px;
            padding-right: 35px;
        }
    }

    .tableData {
        &.file,
        &.file a,
        &.date {
            ${body1}
            color: ${({ theme }) => theme.colors.text.body['dark-2']};
        }
    }
`;
