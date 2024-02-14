import styled from 'styled-components';

import { FormElementLabel } from '@/utility/components/FormElement/Label/StyledLabel';
import { Field } from '@/utility/components/FormElement/StyledFormSection';
import { TextBoxInput } from '@/utility/components/FormElement/TextInput/StyledTextInput';
import Grid from '@/utility/components/Grid';
import { spacing } from '@/utility/props';
import { mq } from '@/utility/styles';
import { button } from '@/utility/styles/button';
import { body1, headingH1 } from '@/utility/styles/text';
import { globalColors } from '@/utility/theme/global/colors';

export const ManageRepaymentContainer = styled.div<any>`
  ${mq('lg')}{
    max-width: 564px;
  }

  ${(props) => props.containerWidth === '100%' && 'max-width: 100% !important'};
`;

export const DescriptionContainer = styled.div`
  ${body1};
`;

export const RepaymentAmountField = styled(Field)<any>`
  display: flex;
  gap: 20px;
  ${(props) => props.errors && 'margin-bottom: 8px !important'};
`;

export const RepaymentAmountFormLabel = styled(FormElementLabel)`
  ${body1};
  display: flex;
  align-items: center;
  margin-bottom: 0 !important;
  text-transform: unset;
  letter-spacing: normal;
  margin-right: 0;
`;

export const RepaymentAmountTextInput = styled(TextBoxInput)`
  width: 100%;
  padding-left: 39px;
`;

export const InputContainer = styled.div`
  position: relative;

  ${mq('lg')}{
    flex: 1;
  }
`;

export const CurrencyIndicator = styled.span`
  ${body1}
  margin-bottom: 0 !important;
  position: absolute;
  display: flex;
  height: 100%;
  align-items: center;
  padding-left: 24px;
`;

export const Heading = styled.h1`
  ${headingH1}
  max-width: 760px;
`;

export const GridItemContainer = styled(Grid.Item)`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

export const IconWrapperLoading = styled.div`
  ${({ theme }) => spacing({ theme, p: { xs: '25px', md: '50px' }, mb: { xs: 'macro2', md: 'micro2' } })};
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;

  svg {
    height: 50px;
    width: 50px;

    ${mq('md')} {
      height: 100px;
      width: 100px;
    }
  }

  &::before {
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-name: spinning;
    animation-timing-function: linear;
    border-radius: 50%;
    border: 4px solid ${({ theme }) => theme.colors.border['border-1']};
    border-left-color: ${({ theme }) => theme.colors.border['divider-1']};
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;

    ${mq('md')} {
      border-width: 8px;
    }

    @keyframes spinning {
      from { transform: rotate(0deg) }
      to { transform: rotate(360deg) }
    }
  }
`;
