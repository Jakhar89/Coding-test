import React, { useRef, useState } from 'react';

import Icon from '@/utility/components/Icon';

import { SearchFieldProps } from './definitions';
import { IconContainer, SearchContainer, TextBoxInput } from './StyledSearchField';

const SearchField: React.FC<SearchFieldProps> = ({ name, value, setFieldValue, placeholder, ...props }) => {
  const [isClose, setIsClose] = useState(false);

  const inputRef = useRef<any>();

  const handleClick = () => {
    if (isClose) {
      setFieldValue(name, '');
    }
    if (inputRef?.current) {
      inputRef.current.focus();
    }
  };

  const handleBlur = () => {
    if (value?.length < 1) {
      setIsClose(false);
    }
  };

  return (
    <SearchContainer>
      <TextBoxInput
        name={name}
        type="text"
        value={value}
        ref={inputRef}
        placeholder={placeholder}
        onFocus={() => setIsClose(true)}
        onBlur={() => handleBlur()}
        onChange={(e) => setFieldValue(name, e.target.value)}
        {...props}
      />
      <IconContainer
        isClose={isClose}
        onClick={handleClick}
      >
        <Icon
          name={isClose ? 'close' : 'search'}
          isFunctional={true}
          ariaLabelledBy={isClose ? 'Close' : 'Search'}
        />
      </IconContainer>
    </SearchContainer>
  );
};

export default SearchField;
