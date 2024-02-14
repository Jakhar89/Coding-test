import React, { useEffect, useState } from 'react';

import ErrorMessage from '../ErrorMessage';
import { DropdownProps } from './definitions';
import {
    Container,
    DropdownButton,
    DropdownList,
    DropdownListLabel,
    DropdownMenu
} from './StyledDropdown';

const DropdownItem = ({ label, ...props }) => {
  const [isSelected, setIsSelected] = useState(false);
  const handleOnChange = () => {
    setIsSelected((isSelected) => !isSelected);
  };

  return (
    <DropdownList
      onClick={handleOnChange}
      {...props}
    >
      <DropdownListLabel isSelected={isSelected}>{label}</DropdownListLabel>
    </DropdownList>
  );
};

const Dropdown: React.FC<DropdownProps> = (props) => {
  const hasError = props?.hasError ?? false;
  const items = props?.items;
  const canSelectItem = props?.canSelectItem;
  const [shouldShowDropdown, setShouldShowDropdown] = useState(false);

  const [selectedItem, setSelectedItem] = useState('');

  useEffect(() => {
    items?.map((item) => {
      if (item?.default) {
        setSelectedItem(item?.label);
      }
    });
  }, []);

  const onClick = () => {
    setShouldShowDropdown((shouldShowDropdown) => !shouldShowDropdown);
  };

  return (
    <Container className={props.className}>
      <DropdownButton
        onClick={onClick}
        data-toggle="dropdown"
        shouldShowDropdown={shouldShowDropdown}
      >
        {selectedItem ? selectedItem : 'Select Dropdown'}
      </DropdownButton>
      <DropdownMenu
        className="dropdownContent"
        shouldShowDropdown={shouldShowDropdown}
        onClick={onClick}
      >
        {items?.map((item, index) => {
          const label = item?.label;
          return (
            <DropdownItem
              key={index}
              label={label}
              onClick={() => {
                if (item?.onClick) {
                  item?.onClick(item);
                }
                if (canSelectItem) {
                  setSelectedItem(label);
                }
              }}
            >
              {label}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
      {hasError && <ErrorMessage>Error message</ErrorMessage>}
    </Container>
  );
};

export default Dropdown;
