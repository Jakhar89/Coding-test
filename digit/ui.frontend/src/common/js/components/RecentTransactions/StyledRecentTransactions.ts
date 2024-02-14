import styled from 'styled-components';

import { mq, svg } from '@/utility/styles';
import { headingH6 } from '@/utility/styles/text';

export const InnerContainer = styled.div<any>`
  display:flex;
  flex-direction:column;
  
  ${mq('xl')}{
    &:last-child{
      padding-left:5px;
    }
  }

  ${mq('lg')}{
    ${({ isMulti }) => !isMulti && `padding-right: 20px;`};
  }

  ${mq('xl')}{
    ${({ isMulti }) => !isMulti && `padding-right: 50px;`};
  }
`;

export const Title = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.border['border-1']};

  ${mq('md')}{
    padding-top: 10px;
    padding-left: 12px;
    padding-bottom: 5px;
    margin-bottom: 30px;
    border-bottom: 2px solid ${({ theme }) => theme.colors.background['light-2']};
  }

  ${mq('lg')}{
    padding-left: 20px;
  }
  
  ${mq('xl')}{
    padding-left: 40px;
  }
`;

export const CardTitle = styled.div`
  ${headingH6}
  color: ${({ theme }) => theme.colors.text.body['dark-1']};
  &:before{
    margin-top: -20px;
  }
`;

export const TransactionsContainer = styled.div<any>`
  ${mq('md')}{
    padding-left: 12px;
  }

  ${mq('lg')}{
    padding-left: 20px;
  }
  
  ${mq('xl')}{
    padding-left: 40px;
  }
`;

export const ButtonContainer = styled.div`
  margin-bottom: 0;
  margin-top: auto;
  padding-top: 40px;

  button {
    margin-bottom:0;
    padding: 4px 10px;
    margin-left: 0;

    ${mq('md')}{
      padding: 10px;
    }
  }

  ${mq('md')}{
    padding-top: 30px;
    padding-left: 12px;
  }
  
  ${mq('lg')}{
    padding-left: 20px;
  }

  ${mq('xl')}{
    padding-left: 40px;
  }
`;

export const IconWrapper = styled.div`
  ${svg(20, 20)}
  min-width: 20px;
  cursor: pointer;
  margin-left: 12px;
  margin-top: -12px;

  ${mq.lessThan('md')} {
    padding-top: 0px;
  }
`;

export const TextPositive = styled.span<{ isGreen: boolean }>`
  ${({ isGreen, theme }) => isGreen && `color: ${theme.colors.global['text-green']};`}
`;
