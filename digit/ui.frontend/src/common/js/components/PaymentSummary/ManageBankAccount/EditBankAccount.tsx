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

const EditBankAccount: React.FC<any> = ({
  jsonData,
  data,
  manageModalDetails,
  setShowManageModal,
  setManageModalDetails,
  handleFormSubmit,
  errorSuccessMap,
  getBankAccounts,
}) => {
  const [editBankAccountState, setEditBankAccountState] = useState('start');
  const { errorMessage, setErrorMessage } = errorMessageStore();

  const questApiKey = localStorage?.getItem('apiKey') ?? jsonData?.globalConfig?.questApiKey;
  const baseApiUrl = localStorage?.getItem('baseApiUrl') ?? jsonData?.globalConfig?.baseApiUrl;
  const selectedBankAccount = manageModalDetails?.details;

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
    setEditBankAccountState('start');
  };
  const addMethod = { error: customErrorHandler, redirect: false };

  const editBankAccount = (updatedValues) => {
    setErrorMessage(null);
    const postData = {
      customerDomain: {
        addressDependentEntity: {
          addressSequenceNumber: data?.customerDomain?.addressDependentEntity?.addressSequenceNumber,
        },
        bankAccount: {
          accountName: `${updatedValues?.accountname}`,
          accountNumber: `${updatedValues?.accountnumber}`,
          bsbNumber: `${updatedValues?.bsbnumber}`,
          bankAccountSequenceNumber: `${selectedBankAccount?.bankAccountSequenceNumber}`,
          bankIdentifier: `${selectedBankAccount?.pegaQuestBankAccountIdentifier}`,
          bankAccountPegaSequenceNumber: `${selectedBankAccount?.bankAccountPegaSequenceNumber}`,
        },
      },
    };
    postCallAPI('bankAccounts', `${baseApiUrl}`, `${questApiKey}`, postData, errorSuccessMap, 'put', addMethod).then(
      (response) => {
        if (response?.status === 200) {
          setErrorMessage(null);
          setEditBankAccountState('edit success');
          getBankAccounts();
        }
      },
    );
  };

  const handleEditBankAccount = (values) => {
    setEditBankAccountState('updating');
    // Edit api call when api )is available
    editBankAccount(values?.values);
  };

  // Reset error message on unmount
  useEffect(() => {
    return () => {
      setErrorMessage(null);
    };
  }, []);

  useEffect(() => {
    if (editBankAccountState === 'edit success') {
      setTimeout(() => {
        setShowManageModal(false);
        setManageModalDetails(null);
      }, 3000);
    }
  }, [editBankAccountState]);

  /**Need to be chnaged when BED is ready for integration */
  const refundAccount = `Preffered refund account`;
  const optY = `YES`;
  const optN = `NO`;

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        accountname: manageModalDetails?.details?.bankAccountName,
        bsbnumber: manageModalDetails?.details?.bsbNumber,
        accountnumber: manageModalDetails?.details?.bankAccountNumber,
      }}
      onSubmit={handleFormSubmit}
      validateOnBlur={true}
      validateOnChange={true}
      validateOnMount={true}
      validationSchema={bankAccountValidationSchema}
    >
      {({ errors, handleBlur, handleChange, resetForm, setFieldValue, values }) => {
        const isSelectedSame =
          values?.accountname === manageModalDetails?.details?.bankAccountName &&
          values?.bsbnumber === manageModalDetails?.details?.bsbNumber &&
          values?.accountnumber === manageModalDetails?.details?.bankAccountNumber;

        return (
          <Form data-testid="edit-bank-account">
            {editBankAccountState === 'start' && (
              <>
                <HeadingWithButtonWrapper>
                  <HeadingWithDivider>{jsonData.editBankAccountTitle}</HeadingWithDivider>
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
                      name={'accountname'}
                      placeholder="Enter account name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      defaultValue={values.accountname}
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
                      name={'bsbnumber'}
                      placeholder="Enter bsb number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values?.bsbnumber}
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
                      name={'accountnumber'}
                      placeholder="Enter account number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      defaultValue={values?.accountnumber}
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
                    saveLabel={jsonData.editBankAccountSaveButtonText}
                    isSaveDisabled={
                      isSelectedSame || !!errors?.accountname || !!errors?.bsbnumber || !!errors?.accountnumber
                    }
                    handleOnClickCancel={(e) => {
                      setShowManageModal(false);
                      setManageModalDetails(null);
                      setErrorMessage(null);
                    }}
                    handleOnClickSave={() => {
                      handleEditBankAccount({ values });
                      emitTrackEvent({
                        name: 'bankAccountEdited',
                      });
                    }}
                  />

                  {errorMessage && <InPageAnnouncement text={errorMessage} />}
                </ManageBankAccountFormContainer>
              </>
            )}
            {editBankAccountState === 'updating' && (
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
            {editBankAccountState === 'edit success' && (
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
                      <Description>{jsonData.editBankAccountSuccessDescription}</Description>
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

export default EditBankAccount;
