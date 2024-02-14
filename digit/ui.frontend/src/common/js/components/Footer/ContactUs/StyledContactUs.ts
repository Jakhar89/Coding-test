import styled from 'styled-components';

import { body2, body3 } from '@/utility/styles/text';
import { spacing } from '@/utility/props';
import { mq } from '@/utility/styles';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.span`
  ${body2}
  ${({ theme }) => spacing({ theme, mb: 'micro4' })}
`;

export const Context = styled.div`
  ${body3}
  ${({ theme }) => spacing({ theme, mr: { md: '30px' }, mb: { xs: 0, md: 0 } })}

  p {
    margin-top: 0;
    margin-bottom: 0;
  }
`;

export const ContextWrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${mq('md')} {
    flex-direction: row;
  }
`;
