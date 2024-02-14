import React from 'react';
import { PaymentMethodContainer } from '../StyledPaymentSummary';
import ManagePaymentMethod from './ManagePaymentMethod';

const PaymentMethodEditMode: React.FC<any> = ({
  jsonData,
  attributes,
  errorSuccessMap,
  handleOnClickCancel,
  handleFormSubmit,
  selectedPaymentType,
  setIsEditing,
}) => {
  return (
    <PaymentMethodContainer>
      <ManagePaymentMethod
        jsonData={jsonData}
        attributes={attributes}
        handleOnClickCancel={handleOnClickCancel}
        errorSuccessMap={errorSuccessMap}
        handleFormSubmit={handleFormSubmit}
        selectedPaymentType={selectedPaymentType}
        setIsEditing={setIsEditing}
      />
    </PaymentMethodContainer>
  );
};

export default PaymentMethodEditMode;
