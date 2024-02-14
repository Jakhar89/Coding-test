import React from 'react';

import { PaymentFrequencyContainer } from '../StyledPaymentSummary';
import ManagePaymentFrequency from './ManagePaymentFrequency';

const PaymentFrequencyEditMode: React.FC<any> = ({
  jsonData,
  attributes,
  errorSuccessMap,
  handleOnClickCancel,
  handleFormSubmit,
  selectedFrequency,
  setIsEditing,
  handleCloseEvent,
  getRepaymentsData,
}) => {
  return (
    <PaymentFrequencyContainer>
      <ManagePaymentFrequency
        jsonData={jsonData}
        handleOnClickCancel={handleOnClickCancel}
        errorSuccessMap={errorSuccessMap}
        handleFormSubmit={handleFormSubmit}
        selectedFrequency={selectedFrequency}
        setIsEditing={setIsEditing}
        handleCloseEvent={handleCloseEvent}
        getRepaymentsData={getRepaymentsData}
      />
    </PaymentFrequencyContainer>
  );
};

export default PaymentFrequencyEditMode;
