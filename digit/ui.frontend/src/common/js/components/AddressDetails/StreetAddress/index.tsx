import React, { useState, useEffect } from 'react';
import { Field } from '@/utility/components/FormElement/StyledFormSection';

import ManualAddress from '../ManualAddress/ManualAddress';
import APIAddressLookup from '../APIAddressLookup';

import { StreetAddressProps } from './definitions';

const StreetAddress: React.FC<StreetAddressProps> = ({
  addressDetailsJson,
  initialData,
  addressType,
  errorPagePath,
  questApiKey,
  setShowManualMailingAddress,
  setShowManualResidentialAddress,
}) => {
  const [showManualAddress, setShowManualAddress] = useState(false);

  useEffect(() => {
    addressType === 'residential'
      ? setShowManualResidentialAddress(showManualAddress)
      : setShowManualMailingAddress(showManualAddress);
  }, [showManualAddress]);
  return (
    <>
      <Field>
        {!showManualAddress && (
          <>
            <APIAddressLookup
              addressDetailsJson={addressDetailsJson}
              initialData={initialData}
              addressType={addressType}
              errorPagePath={errorPagePath}
              questApiKey={questApiKey}
              setShowManualAddress={setShowManualAddress}
            />
          </>
        )}
        {showManualAddress && (
          <ManualAddress
            addressDetailsJson={addressDetailsJson}
            setShowManualAddress={setShowManualAddress}
            addressType={addressType}
          />
        )}
      </Field>
    </>
  );
};

export default StreetAddress;
