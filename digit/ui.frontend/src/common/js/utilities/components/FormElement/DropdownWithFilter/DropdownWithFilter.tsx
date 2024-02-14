import { useField, useFormikContext } from 'formik';
import * as React from 'react';
import { Select } from 'react-functional-select';

import ErrorMessage from '@/utility/components/FormElement/ErrorMessage';
import { DescriptionMessage } from '@/utility/components/FormElement/StyledFormSection';

import { useBreakpoint } from '@/utility/hooks/useBreakpoint';

import { DropdownWithFilterProps } from './definitions';
import { CustomClearSvg, IconWrapper, SelectContainer, StyledDropdownConfig } from './StyledDropdownWithFilter';

// Replace existing clear svg icon from react-function-select
const customClearSvgIcon = () =>
  React.createElement(
    CustomClearSvg,
    { 'aria-hidden': true, width: '14', height: '14', viewBox: '0 0 14 14' },
    React.createElement('path', {
      d: 'M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z',
      fill: 'black',
    }),
  );

// Read more at: https://github.com/based-ghost/react-functional-select/blob/master/src/globals.d.ts
// Interactive Storybook Example: https://master--625676b6922472003af898b4.chromatic.com/?path=/story/react-functional-select-demos--filtering
const DropdownWithFilter = React.forwardRef<any, DropdownWithFilterProps>(
  (
    {
      closeMenuOnSelect,
      description,
      getOptionLabel,
      getOptionValue,
      isDisabled = false,
      isInvalid = false,
      isLoading = false,
      isSearchable = false,
      onInputChange,
      onOptionChange,
      options,
      placeholder,
      selectedOption,
      getIsOptionDisabled,
      name,
      ...props
    },
    ref,
  ) => {
    const bp = useBreakpoint();
    const { setFieldValue } = useFormikContext();
    const [, meta] = useField(name);
    const hasError = !!(name && meta?.error && (meta?.touched || meta?.initialTouched));
    const handleOnChange = (value: string | undefined) => {
      setFieldValue(name, value);
    };

    return (
      <>
        <SelectContainer
          hasError={hasError}
          hasOptions={!!(options && Object.keys(options)?.length)}
          isLoading={isLoading}
          isSearchable={isSearchable}
          /* Check object length is not empty to hide magnifying lens icon or chevron icon */
          isSelected={!!(selectedOption && Object.keys(selectedOption)?.length)}
        >
          <Select
            backspaceClearsValue={true}
            blurInputOnSelect={true}
            clearIcon={customClearSvgIcon}
            closeMenuOnSelect={true}
            loadingMsg={'Loading...'}
            menuItemSize={48}
            menuMaxHeight={['xs', 'sm', 'md'].includes(bp) ? 286 : 198}
            menuOverscanCount={options?.length}
            menuPosition={'auto'}
            noOptionsMsg={'No options matched your search'}
            onInputChange={onInputChange ?? handleOnChange}
            scrollMenuIntoView={true}
            themeConfig={StyledDropdownConfig}
            // Authorable passed in props
            getOptionValue={getOptionValue}
            isDisabled={isDisabled}
            isInvalid={isInvalid}
            isLoading={isLoading}
            isSearchable={isSearchable}
            onOptionChange={onOptionChange}
            options={options}
            getIsOptionDisabled={getIsOptionDisabled}
            placeholder={placeholder}
            getOptionLabel={getOptionLabel}
            {...props}
            ref={ref}
          />
          {hasError && <ErrorMessage>{meta?.error}</ErrorMessage>}
          {description && <DescriptionMessage>{description}</DescriptionMessage>}
        </SelectContainer>
      </>
    );
  },
);

export default DropdownWithFilter;
