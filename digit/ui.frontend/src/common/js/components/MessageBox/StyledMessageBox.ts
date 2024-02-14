import styled from 'styled-components';

import { mq } from '@/utility/styles';

export const MessageBoxElement = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 38px;
    gap: 20px;
    width: 100%;
    min-height: 200px;
    background: ${({ theme }) => theme.colors.global['info-2']};
    border: 2px solid ${({ theme }) => theme.colors.global['info-1']};
    border-radius: 6px;
    flex: none;
    order: 0;
    flex-grow: 0;
`;
