import { Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';

import { Tab, TabList, TabPanel, Tabs } from '@/components/Tabs/StyledTabList';
import { errorMessageStore } from '@/context/ErrorMessage/ErrorMessage';
import EditableSectionActions from '@/utility/components/EditableSection/EditableSectionActions';
import { HeadingWithButtonWrapper, HeadingWithDividerH3 } from '@/utility/components/FormElement/StyledFormSection';
import Icon from '@/utility/components/Icon';
import InPageAnnouncement from '@/utility/components/InPageAnnouncement';
import { emitTrackEvent } from '@/utility/helpers/analytics';
import { postCallAPI } from '@/utility/helpers/api';
import { getAEMErrorMessageByCode } from '@/utility/helpers/validation';

import { ContentWrapper, Description, Heading, IconWrapperLoading } from '../ManageBankAccount/StyledManageBankAccount';
import {
  ButtonWrapper,
  CloseButton,
  DescriptionContainer,
  GridItemContainer,
  GridRowContainer,
  IconWrapper,
  PaymentMethodWrapper,
  SuccessIconContainer,
} from '../StyledPaymentSummary';
import DirectDebitContainer from './DirectDebitContainer';
import EftBpayContainer from './EftBpayContainer';

const DIRECT_DEBIT = 'Direct Debit';
const EFT = 'Customer Initiated';

const paymentTypeValidationSchema = Yup.object().shape({
  formPaymentType: Yup.string().required(),
  directDebitTerms: Yup.bool().when('formPaymentType', {
    is: DIRECT_DEBIT,
    then: Yup.bool().test('termsAcceptanceTest', '', (value) => value === true),
  }),
  directDebitAccount: Yup.object().when('formPaymentType', {
    is: (paymentType: string) => {
      return paymentType === DIRECT_DEBIT;
    },
    then: Yup.object().required(''),
  }),
});

const ManagePaymentMethod: React.FC<any> = ({
  paymentOptionsData,
  bankAccountsData,
  jsonData,
  handleOnClickCancel,
  errorSuccessMap,
  selectedPaymentType,
  selectedContract,
  attributes,
  setIsEditing,
  handleCloseEvent,
  manageBankAccountsClick,
  reopenComponent,
  setReopenComponent,
  baseApiUrl,
  questApiKey,
  getRepaymentsData,
  currentBankAccount,
}) => {
  const [paymentType, setPaymentType] = useState(selectedPaymentType ?? '');
  const [isSelectedSame, setIsSelectedSame] = useState<any>(true);
  const [isLoading, setIsLoading] = useState<any>(false);
  const { errorMessage, setErrorMessage } = errorMessageStore();
  const [managePaymentTypeState, setManagePaymentTypeState] = useState('edit');

  const isDirectDebit = useRef(
    selectedPaymentType === DIRECT_DEBIT || reopenComponent === 'managePaymentMethod' ? true : false,
  );

  useEffect(() => {
    setReopenComponent('');
  }, []);

  const ButtonWrapperInner = () => (
    <>
      <CloseButton
        aria-label="close"
        onClick={() => {
          {
            /**Use for Analytics Event Trigger */
          }
          setErrorMessage(null);
          handleCloseEvent();
          setIsEditing(false);
        }}
        type="reset"
      >
        close
      </CloseButton>
      <span
        onClick={() => {
          {
            /**Use for Analytics Event Trigger */
          }
          setErrorMessage(null);
          handleCloseEvent();
          setIsEditing(false);
        }}
      >
        <Icon
          name={'close'}
          isFunctional={true}
        />
      </span>
    </>
  );

  const selectPaymentType = (type) => {
    if (type === selectedPaymentType && type != DIRECT_DEBIT) {
      setIsSelectedSame(true);
    } else {
      setIsSelectedSame(false);
    }
  };

  useEffect(() => {
    if (selectedPaymentType === DIRECT_DEBIT) {
      setPaymentType(DIRECT_DEBIT);
      selectPaymentType(DIRECT_DEBIT);
    }
  }, []);

  /**Error Handling for Business Errors */
  const customErrorHandler = (apiError) => {
    setIsLoading(false);
    setManagePaymentTypeState('edit');
    /**Get Error Message based upon Error Code */
    const errorToPresent = getAEMErrorMessageByCode(
      apiError?.response?.data?.sourceErrorCode,
      errorSuccessMap ? errorSuccessMap : globalThis.errorJson,
    );
    setErrorMessage(errorToPresent);
  };
  const addMethod = { error: customErrorHandler, redirect: false };

  const savePaymentType = (values) => {
    setErrorMessage(null);

    const { bankAccountSequenceNumber, bsbNumber, bankAccountNumber, bankAccountName, pegaQuestBankAccountIdentifier } =
      values?.directDebitAccount?.value || {};
    const contractId = selectedContract?.customerDomain?.contract?.contractId;

    const directDebitDetails =
      values?.formPaymentType === DIRECT_DEBIT
        ? {
            addressDependentEntity: {
              addressSequenceNumber: bankAccountsData?.customerDomain?.addressDependentEntity?.addressSequenceNumber,
            },
            bankAccount: {
              bankAccountSequenceNumber,
              bsbNumber,
              bankAccountNumber,
              bankAccountName,
              pegaQuestBankAccountIdentifier,
            },
          }
        : {};

    const payload = {
      customerDomain: {
        contract: {
          contractId: contractId,
        },
        paymentMethod: {
          paymentMethod: values?.formPaymentType,
        },
        ...directDebitDetails,
      },
    };

    setIsLoading(true);
    setManagePaymentTypeState('updating');
    postCallAPI(
      'payment-method-update',
      `${baseApiUrl}`,
      `${questApiKey}`,
      payload,
      errorSuccessMap,
      'put',
      addMethod,
    ).then((response) => {
      setIsLoading(false);
      if (response?.status === 200) {
        setManagePaymentTypeState('success');

        // update payment summary data
        getRepaymentsData(contractId);

        setErrorMessage(null);
        setTimeout(() => {
          setIsEditing(false);
        }, 3000);
      }
    });
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        formPaymentType: paymentType,
        directDebitAccount: '',
        directDebitTerms: false,
      }}
      onSubmit={savePaymentType}
      validateOnBlur={true}
      validateOnChange={true}
      validateOnMount={true}
      validationSchema={paymentTypeValidationSchema}
    >
      {({ errors, handleBlur, handleChange, resetForm, setFieldValue, values }) => {
        //TODO : Update with selected bank account logic
        console.log('errors', errors);

        return (
          <Form data-testid="manage-payment-method-container">
            {managePaymentTypeState === 'edit' && (
              <>
                <HeadingWithButtonWrapper>
                  <HeadingWithDividerH3>{jsonData.paymentMethodTitle}</HeadingWithDividerH3>
                  <ButtonWrapper>
                    <ButtonWrapperInner />
                  </ButtonWrapper>
                </HeadingWithButtonWrapper>
                <PaymentMethodWrapper>
                  <DescriptionContainer>{jsonData.paymentMethodDescription}</DescriptionContainer>
                  <Tabs
                    defaultIndex={isDirectDebit.current === true ? 1 : 0}
                    selectedTabClassName="is-selected"
                    selectedTabPanelClassName="is-selected"
                  >
                    <TabList>
                      <Tab
                        onClick={() => {
                          setPaymentType(EFT);
                          selectPaymentType(EFT);
                          isDirectDebit.current = false;
                        }}
                      >
                        {jsonData.leftToggle}
                      </Tab>
                      <Tab
                        onClick={() => {
                          setPaymentType(DIRECT_DEBIT);
                          selectPaymentType(DIRECT_DEBIT);
                          isDirectDebit.current = true;
                        }}
                      >
                        {jsonData.rightToggle}
                      </Tab>
                    </TabList>
                    <TabPanel>
                      <EftBpayContainer
                        data={paymentOptionsData}
                        jsonData={jsonData}
                        attributes={attributes}
                        errorSuccessMap={errorSuccessMap}
                      ></EftBpayContainer>
                    </TabPanel>
                    <TabPanel>
                      <DirectDebitContainer
                        data={bankAccountsData}
                        jsonData={jsonData}
                        attributes={attributes}
                        errorSuccessMap={errorSuccessMap}
                        selectedPaymentType={selectedPaymentType}
                        manageBankAccountsClick={manageBankAccountsClick}
                        setFieldValue={setFieldValue}
                        currentBankAccount={currentBankAccount}
                      ></DirectDebitContainer>
                    </TabPanel>
                  </Tabs>
                  <EditableSectionActions
                    cancelLabel={jsonData.paymentMethodCancelButtonText}
                    saveLabel={jsonData.submitButtonText}
                    isLoading={isLoading}
                    isSaveDisabled={Object.keys(errors)?.length > 0 || isSelectedSame}
                    handleOnClickCancel={(e) => {
                      handleCloseEvent();
                      resetForm();
                      handleOnClickCancel(e);
                      setErrorMessage(null);
                    }}
                    handleOnClickSave={() => {
                      console.log('form errors', errors);
                      emitTrackEvent({
                        name: 'paymentMethodSaved',
                        data: {
                          paymentMethod: paymentType,
                        },
                      });
                    }}
                  />

                  {errorMessage && <InPageAnnouncement text={errorMessage} />}
                </PaymentMethodWrapper>
              </>
            )}
            {managePaymentTypeState === 'updating' && (
              <>
                <ContentWrapper className="content-wrapper">
                  <GridRowContainer>
                    <GridItemContainer config={{ col: { md: 12 } }}>
                      <IconWrapperLoading>
                        <Icon
                          aria-label="presentation"
                          name={'stopwatch'}
                        />
                      </IconWrapperLoading>
                      <Heading>Updating...</Heading>
                    </GridItemContainer>
                  </GridRowContainer>
                </ContentWrapper>
              </>
            )}

            {managePaymentTypeState === 'success' && (
              <>
                <ContentWrapper className="content-wrapper">
                  <GridRowContainer>
                    <GridItemContainer config={{ col: { md: 12 } }}>
                      <SuccessIconContainer>
                        <IconWrapper>
                          <Icon
                            aria-label="presentation"
                            name={'receipt-approved'}
                          />
                        </IconWrapper>
                      </SuccessIconContainer>
                      <Heading>{jsonData.successModalHeading}</Heading>
                      <Description>{jsonData.successModalDescription}</Description>
                    </GridItemContainer>
                  </GridRowContainer>
                </ContentWrapper>
              </>
            )}
            <input
              type="hidden"
              name="formPaymentType"
              id="formPaymentType"
              value={paymentType}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default ManagePaymentMethod;
