import { Form, Formik } from 'formik';
import React, { useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';

import { Tab, TabList, TabPanel, Tabs } from '@/components/Tabs/StyledTabList';
import { errorMessageStore } from '@/context/ErrorMessage/ErrorMessage';
import EditableSectionActions from '@/utility/components/EditableSection/EditableSectionActions';
import FormLabel from '@/utility/components/FormElement/Label';
import {
    Field,
    HeadingWithButtonWrapper,
    HeadingWithDivider
} from '@/utility/components/FormElement/StyledFormSection';
import TextInput from '@/utility/components/FormElement/TextInput';
import Icon from '@/utility/components/Icon';
import InPageAnnouncement from '@/utility/components/InPageAnnouncement';
import { emitTrackEvent } from '@/utility/helpers/analytics';
import { postCallAPI } from '@/utility/helpers/api';
import { getAEMErrorMessageByCode } from '@/utility/helpers/validation';

import {
    ButtonWrapper,
    CloseButton,
    ManageBankAccountFormContainer,
    RefundToggleHeader
} from '../StyledPaymentSummary';
import { bankAccountValidationSchema } from './bankAccountValidationSchema';
import {
    ContentWrapper,
    Description,
    GridItemContainer,
    GridRowContainer,
    Heading,
    IconWrapper,
    IconWrapperLoading
} from './StyledManageBankAccount';

const AddBankAccount: React.FC<any> = ({
  jsonData,
  manageModalDetails,
  setShowManageModal,
  setManageModalDetails,
  handleFormSubmit,
  errorPagePath,
  errorSuccessMap,
  getBankAccounts,
}) => {
  console.log('manageModalDetails', manageModalDetails);
  const [addBankAccountState, setAddBankAccountState] = useState('start');
  const { errorMessage, setErrorMessage } = errorMessageStore();

  const questApiKey = localStorage?.getItem('apiKey') ?? jsonData?.globalConfig?.questApiKey;
  const baseApiUrl = localStorage?.getItem('baseApiUrl') ?? jsonData?.globalConfig?.baseApiUrl;

  const ButtonWrapperInner = () => (
    <>
      <CloseButton
        aria-label="close"
        onClick={() => {
          setShowManageModal(false);
          setManageModalDetails(null);
        }}
        type="reset"
      >
        close
      </CloseButton>
      <span
        onClick={() => {
          setShowManageModal(false);
          setManageModalDetails(null);
        }}
      >
        <Icon
          name={'close'}
          isFunctional={true}
        />
      </span>
    </>
  );

  /**Error Handling for Business Errors */
  const customErrorHandler = (apiError) => {
    /**Get Error Message based upon Error Code */
    const errorToPresent = getAEMErrorMessageByCode(
      apiError?.response?.data?.sourceErrorCode,
      errorSuccessMap ? errorSuccessMap : globalThis.errorJson,
    );
    setErrorMessage(errorToPresent);
    setAddBankAccountState('start');
  };
  const addMethod = { error: customErrorHandler, redirect: false };

  const addBankAccount = (updatedValues) => {
    setErrorMessage(null);
    const postData = {
      customerDomain: {
        bankAccount: {
          accountName: `${updatedValues?.accountname}`,
          accountNumber: `${updatedValues?.accountnumber}`,
          bsbNumber: `${updatedValues?.bsbnumber}`,
        },
      },
    };
    postCallAPI('bankAccounts', `${baseApiUrl}`, `${questApiKey}`, postData, errorSuccessMap, 'post', addMethod).then(
      (response) => {
        if (response?.status === 200) {
          setErrorMessage(null);
          setAddBankAccountState('add success');
          getBankAccounts();
        }
      },
    );
  };

  const handleAddBankAccount = (values) => {
    setAddBankAccountState('updating');
    addBankAccount(values?.values);
  };

  // Reset error message on unmount
  useEffect(() => {
    return () => {
      setErrorMessage(null);
    };
  }, []);

  useEffect(() => {
    if (addBankAccountState === 'add success') {
      setTimeout(() => {
        setShowManageModal(false);
        setManageModalDetails(null);
      }, 3000);
    }
  }, [addBankAccountState]);

  /**Need to be chnaged when BED is ready for integration */
  const refundAccount = `Preffered refund account`;
  const optY = `YES`;
  const optN = `NO`;

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        accountname: '',
        bsbnumber: '',
        accountnumber: '',
      }}
      onSubmit={handleFormSubmit}
      validateOnBlur={true}
      validateOnChange={true}
      validateOnMount={true}
      validationSchema={bankAccountValidationSchema}
    >
      {({ errors, handleBlur, handleChange, resetForm, setFieldValue, values }) => {
        return (
          <Form data-testid="add-bank-account">
            {addBankAccountState === 'start' && (
              <>
                <HeadingWithButtonWrapper>
                  <HeadingWithDivider>{jsonData.addBankAccountTitle}</HeadingWithDivider>
                  <ButtonWrapper>
                    <ButtonWrapperInner />
                  </ButtonWrapper>
                </HeadingWithButtonWrapper>
                <ManageBankAccountFormContainer>
                  <Field>
                    <FormLabel
                      htmlFor={'accountname'}
                      optional={false}
                    >
                      {jsonData.accountNameFieldLabel}
                    </FormLabel>

                    <TextInput
                      type="text"
                      name="accountname"
                      placeholder="Enter account name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values?.[`accountname`]}
                    ></TextInput>
                  </Field>
                  <Field>
                    <FormLabel
                      htmlFor={'bsbnumber'}
                      optional={false}
                    >
                      {jsonData.bsbnumberFieldLabel}
                    </FormLabel>

                    <TextInput
                      type="text"
                      name="bsbnumber"
                      placeholder="Enter bsb number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    ></TextInput>
                  </Field>
                  <Field>
                    <FormLabel
                      htmlFor={'accountumber'}
                      optional={false}
                    >
                      {jsonData.accountNumberFieldLabel}
                    </FormLabel>

                    <TextInput
                      type="text"
                      name="accountnumber"
                      placeholder="Enter account number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    ></TextInput>
                  </Field>

                  <RefundToggleHeader>{refundAccount}</RefundToggleHeader>
                  <Tabs
                    defaultIndex={0}
                    selectedTabClassName="is-selected"
                    selectedTabPanelClassName="is-selected"
                  >
                    <TabList>
                      <Tab onClick={() => {}}>{optY}</Tab>
                      <Tab onClick={() => {}}>{optN}</Tab>
                    </TabList>
                  </Tabs>

                  <EditableSectionActions
                    cancelLabel={jsonData.addEditSectionCancelButtonText}
                    saveLabel={jsonData.addBankAccountSaveButtonText}
                    isSaveDisabled={!!errors?.accountname || !!errors?.bsbnumber || !!errors?.accountnumber}
                    handleOnClickCancel={(e) => {
                      setShowManageModal(false);
                      setManageModalDetails(null);
                      setErrorMessage(null);
                    }}
                    handleOnClickSave={() => {
                      handleAddBankAccount({ values });
                      emitTrackEvent({
                        name: 'bankAccountAdd',
                      });
                    }}
                  />

                  {errorMessage && <InPageAnnouncement text={errorMessage} />}
                </ManageBankAccountFormContainer>
              </>
            )}
            {addBankAccountState === 'updating' && (
              <>
                <ContentWrapper className="content-wrapper">
                  <GridRowContainer>
                    <GridItemContainer config={{ col: { md: 12 } }}>
                      {' '}
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
            {addBankAccountState === 'add success' && (
              <>
                <ContentWrapper className="content-wrapper">
                  <GridRowContainer>
                    <GridItemContainer config={{ col: { md: 12 } }}>
                      {' '}
                      <IconWrapper>
                        <Icon
                          aria-label="presentation"
                          name={'receipt-approved'}
                        />
                      </IconWrapper>
                      <Heading>{jsonData.thankYouHeading}</Heading>
                      <Description>{jsonData.addBankAccountSuccessDescription}</Description>
                    </GridItemContainer>
                  </GridRowContainer>
                </ContentWrapper>
              </>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddBankAccount;
