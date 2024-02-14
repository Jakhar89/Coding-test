import styled, { css } from 'styled-components';

import Grid from '@/utility/components/Grid2';
import { mq } from '@/utility/styles';

type ChildContainerProps = { maxHeight: number; collapsed: boolean };

export const AccordionContainer = styled.div<{ collapsed: boolean }>`
    .collapseLabel span {
        display: flex;
        align-items: center;

        ${mq('md')}{
            display: none;
        }
    }

    ${mq.lessThan('md')}{
        ${({ collapsed }) => collapsed && `margin-bottom: 20px`};
        
        .hideXS {
            display: none;
        }
    }
`;

export const ChildContainer = styled.div<ChildContainerProps>`
    ${mq.lessThan('md')}{
        max-height: 0;
        ${({ collapsed }) => collapsed && `overflow: hidden`};
        ${({ collapsed, maxHeight }) => `max-height: ${collapsed ? 0 : maxHeight}px`};
        transition: max-height 0.3s ease-in-out;
    }
`;

export const IconWrapper = styled.div`
    display: inline-block;
    padding-left: 10px;
`;

export const GridItem = styled(Grid.Item)`
    > div {
        width: 100%;
    }
`;
