import axios from 'axios';
import { useFormikContext } from 'formik';
import { intersection, keys, noop, upperFirst } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

import { ManualToggle, ManualToggleContainer } from '@/components/AddressDetails/StreetAddress/StyledStreetAddress';
import DropdownWithFilter from '@/utility/components/FormElement/DropdownWithFilter/DropdownWithFilter';
import ErrorMessage from '@/utility/components/FormElement/ErrorMessage';
import { Field } from '@/utility/components/FormElement/StyledFormSection';
import { getRequestHeaders } from '@/utility/helpers/api';
import { apiErrorRedirect } from '@/utility/helpers/error-handling';
import { useBreakpoint } from '@/utility/hooks/useBreakpoint';

import { AddressDetailsFormValues, AddressTypeFormFields } from '../definitions';
import { ErrorContainer } from './StyledAPIAddressLookup';

type Option = {
  value: string;
  label: string;
  postcode: number;
  resultId: string;
};

const fallbackOfflineDescription = 'Address lookup service not available';

const APIAddressLookup = ({
  addressDetailsJson,
  addressType = 'residential',
  errorPagePath,
  questApiKey,
  setShowManualAddress,
  initialData,
}) => {
  const fieldName = `${addressType}-api-address`;
  const validationMsg = `Please enter a ${addressType} address`;

  const bp = useBreakpoint();
  const [description, setDescription] = useState<string | undefined>(undefined);

  const streetTypes = addressDetailsJson?.streetTypes;
  const addressSearchUrl =
    localStorage.getItem('addressSearchAPIUrl') ?? `${addressDetailsJson?.globalConfig?.baseApiUrl}/sscp/v1/address`;

  const currentFullAddress = initialData?.[`${addressType}-fullAddress`];

  //prettier-ignore
  const {
    errors,
    isValidating,
    setFieldError,
    setFieldTouched,
    setFieldValue,
    setValues,
    touched,
    values,
   } = useFormikContext<AddressDetailsFormValues>();

  const delay = 200;
  const [isLoading, setIsLoading] = useState(false);
  const [isValidatingAddress, setIsValidatingAddress] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedOption, setSelectedOption] = useState<
    Omit<AddressTypeFormFields, 'addressPurposeType'> | null | undefined
  >();

  const getCallableAPI = (inputValue) => {
    setIsLoading(true);
    setSelectedOption(null);

    axios
      .get(`${addressSearchUrl}?country=AU&formatted_address=${inputValue}`, {
        headers: getRequestHeaders(questApiKey),
        withCredentials: true,
      })
      .then((response) => {
        if (response?.data?.status !== 'OK') {
          console.error(`Address lookup failed: ${response?.data?.response_message}`);
          setDescription(fallbackOfflineDescription);
          setOptions([]);
          setIsLoading(false);
        }

        // trim response to only what is needed
        const res = response?.data?.results?.map((item) => {
          const value = item.formatted_address.replace(/\s[0-9]{4}$/, '');
          return {
            value: value,
            label: item.formatted_address,
            postcode: item.postcode,
            resultId: item.search_result_id,
          };
        });

        setOptions(res);
        setDescription(undefined);
        setIsLoading(false);
      })
      .catch((error) => {
        setDescription(fallbackOfflineDescription);
        console.error(`Address lookup failed: ${error}`);
        setOptions([]);
        setIsLoading(false);
        // apiErrorRedirect(`${errorPagePath}.html`);
      });
  };

  async function validateAddressResult(
    resultId,
  ): Promise<Omit<AddressTypeFormFields, 'addressPurposeType'> | null | undefined> {
    setIsValidatingAddress(true);
    try {
      const response = await axios.get(`${addressSearchUrl}/${resultId}`, {
        headers: getRequestHeaders(questApiKey),
        withCredentials: true,
      });
      const {
        data: { status, result },
      } = response;

      if (status === 'OK') {
        const {
          subpremise,
          street_name,
          street_number,
          street_type,
          suburb,
          state,
          postcode,
          formatted_address,
          sa1_7dig_code,
        } = result;

        const streetTypeDescription = streetTypes.find((item) => item?.code === street_type.toUpperCase());

        const validatedAddressData = {
          [`${addressType}-citySuburb`]: suburb,
          [`${addressType}-country`]: 'Australia',
          [`${addressType}-postZipCode`]: postcode,
          [`${addressType}-stateProvince`]: state,
          [`${addressType}-streetName`]: street_name,
          [`${addressType}-streetNumber`]: street_number,
          [`${addressType}-streetType`]: street_type.toUpperCase(),
          [`${addressType}-unitNumber`]: subpremise,
          [`${addressType}-addressPurposeType`]: upperFirst(addressType),
          [`${addressType}-fullAddress`]: formatted_address, // TODO - might become concat fields - Manish to advise
          [`${addressType}-sA1SevenDigitCode`]: sa1_7dig_code,
        };

        setDescription(undefined);
        setFieldValue(fieldName, true);
        setIsValidatingAddress(false);
        return validatedAddressData;
      }
    } catch (err) {
      console.error('validateAddressResult error ', err);
      setFieldValue(fieldName, false);
      setIsValidatingAddress(false);
      throw new Error();
    }
  }

  const onSearchChange = (inputValue) => {
    setFieldTouched(fieldName, true);

    const search = async () => {
      try {
        getCallableAPI(inputValue);
        setDescription(undefined);
      } catch (e) {
        console.error(e);
        setDescription(fallbackOfflineDescription);
        setIsLoading(false);
      }
    };

    return search();
  };

  const onOptionChange = useCallback((option): void => {
    if (!option) {
      setFieldError(fieldName, validationMsg);
      // nullify all values for address
      setValues({
        ...values,
        ...{
          [`${addressType}-citySuburb`]: '',
          [`${addressType}-country`]: 'Australia',
          [`${addressType}-postZipCode`]: '',
          [`${addressType}-stateProvince`]: '',
          [`${addressType}-streetName`]: '',
          [`${addressType}-streetNumber`]: '',
          [`${addressType}-streetType`]: '',
          [`${addressType}-unitNumber`]: '',
          [`${addressType}-addressPurposeType`]: upperFirst(addressType),
          [`${addressType}-fullAddress`]: '',
        },
      });
      setSelectedOption(null);
      return;
    }
    setIsLoading(true);

    validateAddressResult(option?.resultId)
      .then((result) => {
        setValues({ ...values, ...result });
        setSelectedOption(result);
        setDescription(undefined);
      })
      .catch((err) => {
        // address from Sensis cannot be used
        // validation rules for missing address parts will handle this
        setDescription(fallbackOfflineDescription);
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const onInputBlur = useCallback((): void => {
    setOptions([]);

    // throw validation error if user has input value but no selection
    if (touched?.[fieldName] && !selectedOption) {
      setFieldError(fieldName, validationMsg);
    }
  }, [values]);

  const onInputChange = useCallback(
    (e): void => {
      setFieldValue(fieldName, e);
      setFieldTouched(fieldName, true);

      setValues({
        ...values,
        ...{
          [`${addressType}-citySuburb`]: '',
          [`${addressType}-country`]: 'Australia',
          [`${addressType}-postZipCode`]: '',
          [`${addressType}-stateProvince`]: '',
          [`${addressType}-streetName`]: '',
          [`${addressType}-streetNumber`]: '',
          [`${addressType}-streetType`]: '',
          [`${addressType}-unitNumber`]: '',
          [`${addressType}-addressPurposeType`]: upperFirst(addressType),
          [`${addressType}-fullAddress`]: '',
        },
      });
    },
    [values],
  );

  useEffect(() => {
    if (isValidatingAddress || isLoading) {
      return;
    }

    const errorKeyArray = [
      `${addressType}-citySuburb`,
      `${addressType}-postZipCode`,
      `${addressType}-stateProvince`,
      `${addressType}-streetType`,
      `${addressType}-streetName`,
    ];
    const errorKeyMatch = intersection(keys(errors), errorKeyArray);

    if (errorKeyMatch?.length) {
      setFieldError(fieldName, validationMsg);
    }
  }, [selectedOption, errors, isValidating]);

  return (
    <>
      <Field style={{ position: 'relative' }}>
        <ManualToggleContainer>
          <ManualToggle onClick={() => setShowManualAddress(true)}>My address is not listed</ManualToggle>
        </ManualToggleContainer>

        {description && (
          <ErrorContainer>
            <ErrorMessage>{description}</ErrorMessage>
          </ErrorContainer>
        )}

        <DropdownWithFilter
          async
          inputDelay={delay}
          isClearable={true}
          isInvalid={((!isLoading || !isValidatingAddress) && !selectedOption) || errors?.[fieldName]}
          isLoading={isLoading}
          isSearchable={true}
          name={fieldName}
          menuItemSize={['xs', 'sm', 'md'].includes(bp) ? 60 : 48}
          onInputBlur={onInputBlur}
          onInputChange={onInputChange}
          onInputFocus={() => noop}
          onSearchChange={onSearchChange}
          onOptionChange={onOptionChange}
          placeholder={currentFullAddress ? currentFullAddress : 'Search for address...'}
          options={options}
          selectedOption={selectedOption}
        />
      </Field>
    </>
  );
};

export default APIAddressLookup;
