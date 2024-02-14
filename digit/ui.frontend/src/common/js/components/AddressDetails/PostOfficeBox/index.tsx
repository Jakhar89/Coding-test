import { useFormikContext } from 'formik';
import { isEqual } from 'lodash';
import { useCallback, useState, useRef, useEffect } from 'react';

import DropdownWithFilter from '@/utility/components/FormElement/DropdownWithFilter/DropdownWithFilter';
import FormLabel from '@/utility/components/FormElement/Label';
import { Field } from '@/utility/components/FormElement/StyledFormSection';
import TextInput from '@/utility/components/FormElement/TextInput';

import { convertObjectValuesToLowercase } from '@/utility/helpers/string';

import { AddressDetailsFormValues, SuburbList } from '../definitions';

const PostalAddress = ({ addressDetailsJson }) => {
  const { errors, initialValues, setFieldValue, handleBlur, handleChange, setFieldTouched, values } =
    useFormikContext<AddressDetailsFormValues>();

  const suburbRef = useRef();

  // set defaults in dropdowns
  // have to use `setValue` fn from react-functional-select as the 'selectedOption` prop not working
  useEffect(() => {
    const initialSuburb = {
      suburb: initialValues?.[`mailing-citySuburb`],
      postcode: initialValues?.[`mailing-postZipCode`],
      state: initialValues?.[`mailing-stateProvince`],
    };

    const initialSuburbToLowerCase = convertObjectValuesToLowercase(initialSuburb);

    const defaultSuburb = addressDetailsJson?.suburbList.find((option) =>
      isEqual(convertObjectValuesToLowercase(option), initialSuburbToLowerCase),
    );

    //@ts-ignore
    suburbRef?.current?.setValue(defaultSuburb);
  }, []);

  const fields = {
    addressLine1: {
      name: 'mailing-addressLine1',
      label: 'Post office box or locked bag number',
    },
    citySuburb: {
      name: 'mailing-citySuburb',
      label: 'Suburb',
    },
    stateProvince: {
      name: 'mailing-stateProvince',
      label: 'State',
    },
    postZipCode: {
      name: 'mailing-postZipCode',
      label: 'Postcode',
    },
    country: {
      name: 'mailing-country',
      label: 'Country',
    },
    addressPurposeType: {
      name: 'mailing-addressPurposeType',
      value: 'Mailing',
    },
  };

  /* PO Box Suburb filter function */
  // selectedSuburbOption return suburb, postcode, state can be use for sending data back to api in the future sprint
  const [selectedSuburbOption, setSelectedSuburbOption] = useState<SuburbList>({});
  const getSuburbOptionValue = useCallback(
    (option): string => `${option.suburb} ${option.state} ${option.postcode} `,
    [],
  );
  const getSuburbOptionLabel = useCallback(
    (option): string => `${option.suburb} ${option.state} ${option.postcode} `,
    [],
  );
  const onSuburbOptionChange = useCallback((option): void => {
    setSelectedSuburbOption(option);
    setFieldValue(`mailing-stateProvince`, option?.state);
    setFieldValue(`mailing-citySuburb`, option?.suburb);
    setFieldValue(`mailing-postZipCode`, option?.postcode);
    setFieldTouched(`mailing-citySuburb`, true);
  }, []);
  return (
    <>
      {/* PO Box */}
      <Field>
        <FormLabel htmlFor={fields?.addressLine1?.name}>{fields?.addressLine1?.label}</FormLabel>
        <TextInput
          hasError={!!errors?.[fields?.addressLine1?.name]}
          name={fields?.addressLine1?.name}
          type="text"
          onBlur={handleBlur}
          onChange={handleChange}
          defaultValue={initialValues?.[fields?.addressLine1?.name]}
        />
      </Field>

      {/* Suburb */}
      <Field>
        <FormLabel htmlFor={fields?.citySuburb?.name}>{fields?.citySuburb?.label}</FormLabel>
        <DropdownWithFilter
          getFilterOptionString={(option) => `${option.label}`}
          getOptionLabel={getSuburbOptionLabel}
          getOptionValue={getSuburbOptionValue}
          isClearable={true}
          isLoading={false}
          isSearchable={true}
          name={fields?.citySuburb?.name}
          onInputBlur={handleBlur}
          onOptionChange={onSuburbOptionChange}
          options={addressDetailsJson?.suburbList}
          placeholder={''}
          ref={suburbRef}
          selectedOption={selectedSuburbOption}
        />
      </Field>

      {/* Postcode */}
      <Field>
        <FormLabel htmlFor={fields?.postZipCode?.name}>{fields?.postZipCode?.label}</FormLabel>
        <TextInput
          disabled
          name={fields?.postZipCode?.name}
          type="text"
          value={values[fields?.postZipCode?.name] ?? ''}
        />
      </Field>

      {/* State */}
      <Field>
        <FormLabel htmlFor={fields?.stateProvince?.name}>{fields?.stateProvince?.label}</FormLabel>
        <TextInput
          disabled
          name={fields?.stateProvince?.name}
          type="text"
          value={values[fields?.stateProvince?.name] ?? ''}
        />
      </Field>

      {/* Country */}
      <Field>
        <FormLabel htmlFor={fields?.country?.name}>{fields?.country?.label}</FormLabel>
        <TextInput
          disabled
          name={fields?.country?.name}
          type="text"
          value={values[fields?.country?.name] ?? 'Australia'}
        />
      </Field>
    </>
  );
};

export default PostalAddress;
