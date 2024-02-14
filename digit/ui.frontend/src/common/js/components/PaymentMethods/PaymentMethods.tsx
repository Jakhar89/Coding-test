import React, { useEffect } from 'react';

import { userStore } from '@/context/User/User';
import { AEMProps } from '@/types/global/aem-definition';
import { HeadingWithDivider, SubHeading } from '@/utility/components/FormElement/StyledFormSection';
import Icon from '@/utility/components/Icon';
import RichText from '@/utility/components/RichText';
import { contractData, postCallAPI } from '@/utility/helpers/api';
import { API_PAYMENT_OPTIONS_DATA, API_REPAYMENT_DATA } from '@/utility/helpers/constants';

import { PaymentMethodsParsedProps } from './definitions';
import PaymentMethodsCard from './PaymentMethodsCard';
import {
  Container,
  HeadingAndDescriptionContainer,
  IconWrapper,
  NominatedPaymentMethodContainer,
  OtherPaymentMethodContainer,
  PaymentMethodsContainer,
} from './StyledPaymentMethods';

const PaymentMethods = ({ attributes, errorSuccessMap }: AEMProps) => {
  if (attributes === '{}') {
    return null;
  }

  const paymentMethodsJson: PaymentMethodsParsedProps = JSON.parse(attributes);
  const { apiResponse, addToAPIResponse, selectedContract, setSelectedContract } = userStore();
  const { contractsData, repaymentData, paymentOptionsData } = apiResponse || {};

  const questApiKey = localStorage?.getItem('apiKey') ?? paymentMethodsJson?.globalConfig?.questApiKey;
  const baseApiUrl = localStorage?.getItem('baseApiUrl') ?? paymentMethodsJson?.globalConfig?.baseApiUrl;

  const getPaymentsApiData = (contractId: string) => {
    const postData = contractData(contractId);

    postCallAPI('payment-options', `${baseApiUrl}`, `${questApiKey}`, postData, errorSuccessMap).then((response) => {
      const data = response?.data;

      if (data) {
        addToAPIResponse(API_PAYMENT_OPTIONS_DATA, data);
      }
    });
  };

  const getRepaymentsData = (contractId: string) => {
    const postData = contractData(contractId);

    postCallAPI('repayment', `${baseApiUrl}`, `${questApiKey}`, postData, errorSuccessMap).then((response) => {
      const data = response?.data;

      if (data) {
        addToAPIResponse(API_REPAYMENT_DATA, data);
      }
    });
  };

  useEffect(() => {
    if (contractsData && !selectedContract) {
      setSelectedContract(contractsData?.contracts?.[0]);
    }
    if (selectedContract) {
      const contractID: string = selectedContract?.customerDomain?.contract?.contractId ?? '';
      getRepaymentsData(contractID);
      getPaymentsApiData(contractID);
    }
  }, [contractsData, selectedContract]);

  const DirectDebitComponent = () => (
    <PaymentMethodsCard
      testAttribute={'direct-debit'}
      info={'Nominated Direct Debit account'}
      bsb={repaymentData?.customerDomain?.bankAccount?.bsbNumber
        ?.replace(/^.{3}/g, 'xxx')
        ?.match(/.{1,3}/g)
        ?.join(' ')}
      accountNumber={repaymentData?.customerDomain?.bankAccount?.bankAccountNumber
        ?.replace(/.(?=.{4})/g, 'x')
        ?.match(/.{1,3}/g)
        ?.join(' ')}
      description={paymentMethodsJson.directDebitDescriptionText}
      iconName={paymentMethodsJson.directDebitIcon}
      title={paymentMethodsJson.directDebitLabelText}
    />
  );

  const EftBpayComponent = () => (
    <>
      <PaymentMethodsCard
        testAttribute={'eft'}
        bsb={paymentOptionsData?.tfalOrgDomain?.tenancyAndBrandEntity?.brandEftTargetBsb}
        accountNumber={paymentOptionsData?.customerDomain?.financialTransactionAccount?.paymentMethod?.eftCustomerPaymentReferenceNumber
          ?.match(/.{1,4}/g)
          .join(' ')}
        description={paymentMethodsJson.eftDescriptionText}
        iconName={paymentMethodsJson.eftIcon}
        title={paymentMethodsJson.eftLabelText}
      />
      <PaymentMethodsCard
        testAttribute={'bpay'}
        billerCode={paymentOptionsData?.tfalOrgDomain?.tenancyAndBrandEntity?.postBillPayBillerCode}
        referenceNumber={paymentOptionsData?.customerDomain?.financialTransactionAccount?.paymentMethod?.bpayReferencenumber
          ?.match(/.{1,4}/g)
          .join(' ')}
        description={paymentMethodsJson.bpayDescriptionText}
        iconName={paymentMethodsJson.bpayIcon}
        title={paymentMethodsJson.bpayLabelText}
      />
    </>
  );

  return (
    <Container data-testid="payment-method-container">
      <HeadingAndDescriptionContainer>
        <HeadingWithDivider data-testid="payment-method-title">
          {paymentMethodsJson.paymentMethodsLabelText}
        </HeadingWithDivider>
        <SubHeading data-testid="payment-method-description">
          <RichText>{paymentMethodsJson.paymentMethodsDescriptionText}</RichText>
        </SubHeading>
      </HeadingAndDescriptionContainer>
      <PaymentMethodsContainer>
        {repaymentData?.customerDomain?.financeAccount?.nextPaymentType?.toLowerCase() !== 'direct debit' ? (
          <>
            <OtherPaymentMethodContainer config={{ col: { xl: 4 } }}>
              <DirectDebitComponent />
            </OtherPaymentMethodContainer>
            <NominatedPaymentMethodContainer
              data-testid="nominated-payment-method"
              flagText={paymentMethodsJson.nominatedFlagText}
              config={{ col: { xl: 8 } }}
            >
              {/* 
              // Removed for MVP
              <IconWrapper data-testid="nominated-payment-method-edit-icon">
                <Icon
                  name={paymentMethodsJson.editIcon}
                  isFunctional={true}
                />
              </IconWrapper> */}
              <EftBpayComponent />
            </NominatedPaymentMethodContainer>
          </>
        ) : (
          <>
            <NominatedPaymentMethodContainer
              data-testid="nominated-payment-method"
              flagText={paymentMethodsJson.nominatedFlagText}
              config={{ col: { xl: 4 } }}
            >
              {/* 
              // Removed for MVP
              <IconWrapper data-testid="nominated-payment-method-edit-icon">
                <Icon
                  name={paymentMethodsJson?.editIcon}
                  isFunctional={true}
                />
              </IconWrapper> */}
              <DirectDebitComponent />
            </NominatedPaymentMethodContainer>
            <OtherPaymentMethodContainer config={{ col: { xl: 8 } }}>
              <EftBpayComponent />
            </OtherPaymentMethodContainer>
          </>
        )}
      </PaymentMethodsContainer>
    </Container>
  );
};

export default PaymentMethods;
