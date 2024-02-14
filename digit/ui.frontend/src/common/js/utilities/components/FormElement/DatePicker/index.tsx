import { useField, useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

import Icon from '@/utility/components/Icon';

import ErrorMessage from '../ErrorMessage';
// import './react-datepicker.css';
import { DatePickerProps } from './definitions';
import { IconWrapper, StyledDiv } from './StyledDatePicker';

function FormDatePicker(props: DatePickerProps) {
  const {
    readOnly,
    minDate,
    maxDate,
    placeholder,
    handleDateChange,
    alignLeft = false,
    isInFormik = true,
    value,
    disabled = false,
  } = props;
  const { setFieldValue = undefined } = isInFormik ? useFormikContext() : {};
  const [field, meta] = isInFormik ? useField(props?.name) : [];

  const hasError = isInFormik ? !meta?.error && (meta?.touched || meta?.initialTouched) : false;

  return (
    <>
      <StyledDiv alignLeft={alignLeft}>
        <IconWrapper>
          <Icon
            className="datePickerIcon"
            name={'pay-date'}
          />
        </IconWrapper>
        <DatePicker
          {...field}
          {...props}
          selected={isInFormik ? field?.value : value ? value : null}
          onChange={(val) => {
            setFieldValue && field && setFieldValue(field.name, val);
            handleDateChange && handleDateChange(val);
          }}
          dateFormat="dd/MM/yyyy"
          readOnly={readOnly || false}
          className="date-input"
          minDate={minDate ? minDate : undefined}
          maxDate={maxDate ? maxDate : undefined}
          popperClassName={'popperContainer'}
          placeholderText={placeholder}
          useWeekdaysShort={true}
          hasError={hasError}
          disabled={disabled}
        />
        {hasError && <ErrorMessage>{meta?.error}</ErrorMessage>}
      </StyledDiv>
    </>
  );
}

export default FormDatePicker;
