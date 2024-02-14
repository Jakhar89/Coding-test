import styled from 'styled-components';

import Grid from '@/utility/components/Grid';
import { spacing } from '@/utility/props';
import { mq, svg } from '@/utility/styles';
import { button } from '@/utility/styles/button';
import { fixedBody14, headingH5, headingH6, headingWithDivider } from '@/utility/styles/text';

export const AcceptTermsOfUseWrapper = styled.div`
  ${({ theme }) => spacing({ theme, px: 'micro1', py: 'micro2', mt: { xs: '40px' } })};
  background-color: ${({ theme }) => theme.colors.background['light-2']};
  border-bottom: 2px solid ${({ theme }) => theme.colors.border['border-1']};
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  ${mq('md')} {
    flex-direction: row;
  }

  button {
    ${({ theme }) =>
      spacing({
        theme,
        //@ts-ignore
        ml: { xs: 0, md: 'auto' },
        mb: { xs: 0, md: 'auto' },
        mt: { xs: 'micro4', md: 0 },
        mr: { xs: 'auto', md: 0 },
      })};
    order: 3;

    ${mq('md')} {
      order: 2;
    }
  }

  label {
    order: 2;

    ${mq('md')} {
      order: 3;
    }
  }
`;

export const LoginContainer = styled.div`
  ${mq.lessThan('md')} {
    margin-bottom: 60px;
  }
`;

export const AcceptTermsOfUseTitle = styled.h6`
  ${headingH6}
  order: 1;
`;

export const ButtonWrapper = styled.div`
  display: inline-block;
  margin-top: 4px;
`;

export const IconContainer = styled.div`
  ${svg(64, 64)};
  display: flex;
  justify-content: center;
  width: 64px;
`;

export const HeadingWithSlimDividerH5 = styled.h5`
  ${headingWithDivider(headingH5, 'slim')};
  ${({ theme }) => spacing({ theme, mt: 'micro5' })};
`;

export const RegisterSectionMobile = styled.div`
  display: flex;

  p, a {
    ${fixedBody14};
    margin-top: 0;
  }


`;

export const RegisterSectionDesktop = styled(Grid.Item)`
  align-items: flex-start;
  flex-direction: column;

  ${mq.lessThan('md')} {
    display: none;
  }
`;

export const RegisterButtonDesktop = styled.a`
  ${button('secondary', 'secondary')};
  ${({ theme }) => spacing({ theme, mb: { xs: 'macro2', md: '15px' } })};
`;

export const RegisterButtonMobile = styled.a`
  ${fixedBody14};
  color: initial;
  display: inline-block;
  margin-left: 4px;
  text-decoration: underline;
  text-underline-position: under;

  &:hover {
    cursor: pointer;
  }
`;

export const ForgotPasswordLink = styled(RegisterButtonMobile)`
  margin-left: 0;
`;

export const AgreeTermsHeader = styled.div`
  ${({ theme }) => spacing({ theme, mb: 'macro2' })};
`;
