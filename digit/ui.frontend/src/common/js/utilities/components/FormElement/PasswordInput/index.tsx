import { useField } from 'formik';
import React, { useState } from 'react';

import { analyticsStore } from '@/context/Analytics/Analytics';

import ErrorMessage from '@/utility/components/FormElement/ErrorMessage';
import FormLabel from '@/utility/components/FormElement/Label';

import Icon from '@/utility/components/Icon';
import { ANALYTICS_NOT_APPLICABLE_URL, getFormattedPageName, handleAnalyticsClick } from '@/utility/helpers/analytics';

import { IconWrapper, InputContainer, PasswordInputField } from './StyledPasswordInput';
import { PasswordInputProps } from './definitions';

// prettier-ignore
const PasswordInput: React.FC<PasswordInputProps> = ({
  handleBlur,
  handleChange,
  label,
  name,
  ...props
}) => {
  const [isVisible, setVisibility] = useState(false);
  const { journeyFlow } = analyticsStore();

  const toggleVisibility = () => {
    setVisibility(!isVisible);
    handleAnalyticsClick('keyLinkInteraction', {
      keyLink: {
        linkDestinationURL: ANALYTICS_NOT_APPLICABLE_URL,
        linkOriginationPage: getFormattedPageName(),
        linkPosition: journeyFlow,
        linkTitle: 'Show password',
      },
    });
  };

  const [, meta] = useField(name);
  const hasError =  !!(name && meta?.error && (meta?.touched || meta?.initialTouched));

  return (
    <>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <InputContainer>
        {/* @ts-ignore */}
        <PasswordInputField
          hasError={hasError}
          name={name}
          onBlur={handleBlur}
          onChange={handleChange}
          type={isVisible ? 'text' : 'password'}
          {...props}
        />
        <IconWrapper
          onClick={toggleVisibility}
          type="button"
          aria-label={`${isVisible ? 'Hide ' : 'Show'} Password`}>
          <Icon
            isFunctional={true}
            name={isVisible ? 'show' : 'hide'}
          />
        </IconWrapper>
      </InputContainer>
      {hasError && <ErrorMessage>{meta?.error}</ErrorMessage>}
    </>
  );
};

export default PasswordInput;
