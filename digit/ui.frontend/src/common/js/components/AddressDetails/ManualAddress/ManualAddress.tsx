import { useFormikContext } from 'formik';
import { noop, isEqual } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Select } from 'react-functional-select';

import { ManualToggle, ManualToggleContainer } from '@/components/AddressDetails/StreetAddress/StyledStreetAddress';

import DropdownWithFilter from '@/utility/components/FormElement/DropdownWithFilter/DropdownWithFilter';
import FormLabel from '@/utility/components/FormElement/Label';
import { Field } from '@/utility/components/FormElement/StyledFormSection';
import TextInput from '@/utility/components/FormElement/TextInput';

import { convertObjectValuesToLowercase } from '@/utility/helpers/string';

import { AddressDetailsFormValues, ManualAddressProps, StreetTypes, SuburbList } from '../definitions';

const fields = {
  propertyName: {
    label: 'Property Name',
  },
  unitNumber: {
    label: 'Unit Number',
  },
  streetNumber: {
    label: 'Street Number',
  },
  streetName: {
    label: 'Street Name',
  },
  streetType: {
    label: 'Street Type',
  },
  citySuburb: {
    label: 'Suburb',
  },
  postZipCode: {
    label: 'Postcode',
  },
  stateProvince: {
    label: 'State',
  },
  country: {
    label: 'Country',
  },
};

const ManualResidentialAddress: React.FC<ManualAddressProps> = ({
  addressDetailsJson,
  addressType,
  setShowManualAddress,
}) => {
  //prettier-ignore
  const {
    errors,
    handleBlur,
    handleChange,
    initialValues,
    setFieldTouched,
    setFieldValue,
    values,
   } = useFormikContext<AddressDetailsFormValues>();

  const suburbRef = useRef<typeof Select | null>(null);
  const streetTypeRef = useRef<typeof Select | null>(null);

  /* Residential Street Type filter function */
  // selectedStreetTypeOption return street type and code can be use for sending data back to api in the future sprint
  const [selectedStreetTypeOption, setSelectedStreetTypeOption] = useState<StreetTypes | null>();
  const getStreetTypeOptionValue = useCallback((option): string => `${option?.code ?? ''}`, []);
  const getStreetTypeOptionLabel = useCallback((option): string => `${option?.label ?? ''}`, []);
  const onStreetTypeOptionChange = (option): void => {
    setSelectedStreetTypeOption(option);
    setFieldValue(`${addressType}-streetType`, getStreetTypeOptionValue(option));
    setFieldTouched(`${addressType}-streetType`, true);
  };

  /* Residential Suburb filter function */
  // selectedSuburbOption return suburb, postcode, state can be use for sending data back to api in the future sprint
  const [selectedSuburbOption, setSelectedSuburbOption] = useState<SuburbList | null>(null);

  // set defaults in dropdowns
  // have to use `setValue` fn from react-functional-select as the 'selectedOption` prop not working
  useEffect(() => {
    const initialSuburb = {
      suburb: initialValues?.[`${addressType}-citySuburb`],
      postcode: initialValues?.[`${addressType}-postZipCode`],
      state: initialValues?.[`${addressType}-stateProvince`],
    };

    const initialSuburbToLowerCase = convertObjectValuesToLowercase(initialSuburb);

    const defaultSuburb = addressDetailsJson?.suburbList?.find((option) =>
      isEqual(convertObjectValuesToLowercase(option), initialSuburbToLowerCase),
    );

    const defaultStreetType = addressDetailsJson?.streetTypes?.find(
      (option) => option?.code?.toLowerCase() === initialValues?.[`${addressType}-streetType`]?.toLowerCase(),
    );

    //@ts-ignore
    suburbRef?.current?.setValue(defaultSuburb);
    //@ts-ignore
    streetTypeRef?.current?.setValue(defaultStreetType);
  }, []);

  const getSuburbOptionValue = useCallback(
    (option): string => `${option.suburb} ${option.state} ${option.postcode}`,
    [],
  );
  const getSuburbOptionLabel = useCallback(
    (option): string => `${option.suburb} ${option.state} ${option.postcode}`,
    [],
  );

  const onSuburbOptionChange = useCallback((option): void => {
    setSelectedSuburbOption(option);
    setFieldValue(`${addressType}-stateProvince`, option?.state ?? '');
    setFieldValue(`${addressType}-citySuburb`, option?.suburb ?? '');
    setFieldValue(`${addressType}-postZipCode`, option?.postcode ?? '');
  }, []);

  return (
    <>
      {/* Residential Property Name (Optional) */}
      <Field>
        <ManualToggleContainer>
          <ManualToggle onClick={() => setShowManualAddress(false)}>Search for an address</ManualToggle>
        </ManualToggleContainer>
        <FormLabel
          htmlFor={`${addressType}-propertyName`}
          optional={true}
        >
          {fields?.propertyName?.label}
        </FormLabel>
        <TextInput
          hasError={!!errors?.[`${addressType}-propertyName`]}
          name={`${addressType}-propertyName`}
          type="text"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values?.[`${addressType}-propertyName`]}
        />
      </Field>

      {/* Residential Unit Number (Optional) */}
      <Field>
        <FormLabel
          htmlFor={`${addressType}-unitNumber`}
          optional={true}
        >
          {fields?.unitNumber?.label}
        </FormLabel>
        <TextInput
          hasError={!!errors?.[`${addressType}-unitNumber`]}
          name={`${addressType}-unitNumber`}
          type="text"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values?.[`${addressType}-unitNumber`]}
        />
      </Field>

      {/* Residential Street Number */}
      <Field>
        <FormLabel htmlFor={`${addressType}-streetNumber`}>{fields?.streetNumber?.label}</FormLabel>
        <TextInput
          hasError={!!errors?.[`${addressType}-streetNumber`]}
          name={`${addressType}-streetNumber`}
          type="text"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values?.[`${addressType}-streetNumber`]}
        />
      </Field>

      {/* Residential Street Name */}
      <Field>
        <FormLabel htmlFor={`${addressType}-streetName`}>{fields?.streetName?.label}</FormLabel>
        <TextInput
          hasError={!!errors?.[`${addressType}-streetName`]}
          name={`${addressType}-streetName`}
          type="text"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values?.[`${addressType}-streetName`]}
        />
      </Field>

      {/* Residential Street Type, street type list are sorted by label value */}
      <Field>
        <FormLabel htmlFor={`${addressType}-streetType`}>{fields?.streetType?.label}</FormLabel>
        <DropdownWithFilter
          getOptionLabel={getStreetTypeOptionLabel}
          getOptionValue={getStreetTypeOptionValue}
          isClearable={true}
          isLoading={false}
          isSearchable={true}
          name={`${addressType}-streetType`}
          onInputBlur={handleBlur}
          onOptionChange={onStreetTypeOptionChange}
          onInputChange={() => noop}
          options={addressDetailsJson?.streetTypes?.sort((a: any, b: any) => +(a?.label > b?.label) * 2 - 1)}
          ref={streetTypeRef}
          placeholder={''}
          selectedOption={selectedStreetTypeOption}
        />
      </Field>

      {/* Residential Suburb, suburb list is sorted by suburb value */}
      <Field>
        <FormLabel htmlFor={`${addressType}-citySuburb`}>{fields?.citySuburb?.label}</FormLabel>
        <DropdownWithFilter
          getFilterOptionString={(option) => `${option.label}`}
          getOptionLabel={getSuburbOptionLabel}
          getOptionValue={getSuburbOptionValue}
          isClearable={true}
          isLoading={false}
          isSearchable={true}
          name={`${addressType}-citySuburb`}
          onInputBlur={handleBlur}
          onOptionChange={onSuburbOptionChange}
          options={addressDetailsJson?.suburbList?.sort((a: any, b: any) => +(a?.suburb > b?.suburb) * 2 - 1)}
          ref={suburbRef}
          placeholder={''}
          selectedOption={selectedSuburbOption}
        />
      </Field>

      {/* Residential Postcode*/}
      <Field>
        <FormLabel htmlFor={`${addressType}-postZipCode`}>{fields?.postZipCode?.label}</FormLabel>
        <TextInput
          disabled
          name={`${addressType}-postZipCode`}
          type="text"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values?.[`${addressType}-postZipCode`]}
        />
      </Field>

      {/* Residential State*/}
      <Field>
        <FormLabel htmlFor={`${addressType}-stateProvince`}>{fields?.stateProvince?.label}</FormLabel>
        <TextInput
          disabled
          name={`${addressType}-stateProvince`}
          type="text"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values?.[`${addressType}-stateProvince`]}
        />
      </Field>

      {/* Residential Country */}
      <Field>
        <FormLabel htmlFor={`${addressType}-country`}>{fields?.country?.label}</FormLabel>
        <TextInput
          disabled
          name={`${addressType}-country`}
          type="text"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values?.[`${addressType}-country`] ?? 'Australia'}
        />{' '}
      </Field>
    </>
  );
};

export default ManualResidentialAddress;
