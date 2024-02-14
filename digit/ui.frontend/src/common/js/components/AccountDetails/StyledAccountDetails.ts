import styled from 'styled-components';

import { spacing } from '@/utility/props';

export const ButtonContainer = styled.div`
    display: flex;
    ${({ theme }) => spacing({ theme, mt: '30px' })};
`;
