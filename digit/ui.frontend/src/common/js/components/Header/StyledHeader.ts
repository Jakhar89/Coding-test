import styled from 'styled-components';

import { spacing } from '@/utility/props';
import { mq } from '@/utility/styles';

export const HeaderWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background['light-1']};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
  // add gap bw logo and nav items only when they wrap underneath
  row-gap: 12px;

  &.darkTheme{
    background-color: ${({ theme }) => theme.colors.background['dark-1']};

    span{
      color: ${({ theme }) => theme.colors.background['light-1']};
    }
  }

  ${mq.lessThan('md')} {
    justify-content: space-between;
  }

  ${mq('md')} {
    align-items: center;
  }

  ${({ theme }) =>
    spacing({
      theme,
      pl: {
        xs: '24px',
        md: '30px',
      },
      py: { xs: '20px', md: '26px', xl: '31px' },
    })};

`;
