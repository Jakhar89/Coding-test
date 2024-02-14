import styled from 'styled-components';

import { underlineFixedBody12 } from '@/utility/styles/text';

export const ManualToggleContainer = styled.span`
   display: flex;
   justify-content: flex-end;
`;

export const ManualToggle = styled.span`
    ${underlineFixedBody12};
    cursor: pointer;
`;

export const TextInputPlaceholder = styled.div`
    padding: 6px;
`;
