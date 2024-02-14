import styled from 'styled-components';

import Grid from '@/utility/components/Grid';
import { RICH_TEXT_CLASSNAME } from '@/utility/components/RichText/StyledRichText';
import { spacing } from '@/utility/props';
import { mq } from '@/utility/styles';
import {
  body1,
  body3,
  headingH3,
  headingH4,
  headingH5,
  headingH6,
  headingWithDivider,
  label1,
} from '@/utility/styles/text';

import { AddressSectionProps, FormFieldProps, FormSectionStyleProps } from './definitions';
import { InvalidMessage } from './ErrorMessage/StyledErrorMessage';

export const FormSectionWrapper = styled(Grid.Row)<FormSectionStyleProps>`
  ${({ size, theme }) => spacing({ theme, mb: size || 0 })};
`;

export const AddressSection = styled.div<AddressSectionProps>`
  ${({ isAddressSame, theme }) => spacing({ theme, mb: isAddressSame ? 0 : 'macro1' })};
`;

export const HeadingWithDivider = styled.h2<FormFieldProps>`
  ${({ isSmallTitle }) => (isSmallTitle ? headingWithDivider(headingH5) : headingWithDivider())};
  ${mq.lessThan('md')} {
    ${({ hasLink }) => hasLink && `margin-bottom: 10px !important;`}
  }

  // override default H2 bottom margin
  ${({ marginBottomSize = 'micro2', theme }) => spacing({ theme, mb: marginBottomSize })}
  word-break: break-word;
`;

export const HeadingWithDividerH3 = styled.h3<FormFieldProps>`
  ${headingWithDivider(headingH3)}
  word-break: break-word;
  ${({ marginBottomSize, theme }) => spacing({ theme, mb: marginBottomSize })}
`;

export const SubHeading = styled.p`
  ${body1}
`;

export const SubHeadingSection = styled.div`
  ${body1}
`;

export const HeadingWithButtonWrapper = styled.div`
  display: flex;
`;

export const ContentLabel = styled.div`
  ${body1}
  ${({ theme }) => spacing({ theme, mb: '20px' })}
`;

export const RadioSection = styled.div`
  ${({ theme }) => spacing({ theme, pb: 'micro2' })}
`;

export const SubTitle = styled.h6`
  ${headingH6}
  ${({ theme }) => spacing({ theme, mb: 'micro4' })}
`;

export const SubHeadingText = styled.p`
  ${body1}
  ${({ theme }) => spacing({ theme, mb: 'micro4' })}
`;

export const Field = styled.div<FormFieldProps>`
  ${({ marginBottomSize = 'micro2', theme }) => spacing({ theme, mb: marginBottomSize })}
`;

export const JourneyStepLabel = styled.span`
  ${label1}
  ${({ theme }) => spacing({ theme, mb: 'micro2' })}
`;

export const TermsOfUseWrapper = styled.div`
  .${RICH_TEXT_CLASSNAME} {
    h2 {
      ${headingWithDivider(headingH4)};
    }

    p {
      ${body3}
      ${({ theme }) => spacing({ theme, mb: 'macro2' })}
    }

    ol, ul {
      ${body3}
      ${({ theme }) => spacing({ theme, pl: '24px' })}
    }
  }
`;

export const ConfirmationCallbackWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  button {
    ${({ theme }) => spacing({ theme, mt: 0, mb: 0, ml: { xs: 0 } })};

    &:last-child {
      ${({ theme }) => spacing({ theme, ml: { md: 'micro3' }, mt: { xs: 'micro4', md: 0 } })};
    }
  }

  ${mq('md')} {
    flex-direction: row;
  }
`;

export const DescriptionMessage = styled(InvalidMessage)`
  color: ${({ theme }) => theme.colors.text.body['dark-2']};
  cursor: default;
`;
