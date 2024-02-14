import { Form, Formik, FormikErrors, useFormikContext } from 'formik';
import React, { useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';

import { errorMessageStore } from '@/context/ErrorMessage/ErrorMessage';
import { userStore } from '@/context/User/User';
import { AEMProps } from '@/types/global/aem-definition';
import EditableSectionActions from '@/utility/components/EditableSection/EditableSectionActions';
import ErrorMessage from '@/utility/components/FormElement/ErrorMessage';
import FormLabel from '@/utility/components/FormElement/Label';
import { HeadingWithDividerH3 } from '@/utility/components/FormElement/StyledFormSection';
import Icon from '@/utility/components/Icon';
import InPageAnnouncement from '@/utility/components/InPageAnnouncement';
import RichText from '@/utility/components/RichText';
import { emitTrackEvent } from '@/utility/helpers/analytics';
import { postCallAPI } from '@/utility/helpers/api';
import { currencyFormatter, decodeHTML } from '@/utility/helpers/string';
import { getAEMErrorMessageByCode } from '@/utility/helpers/validation';

import { RepaymentAmountAttributes } from '../definitions';
import {
  CurrencyIndicator,
  DescriptionContainer,
  GridItemContainer,
  Heading,
  IconWrapperLoading,
  InputContainer,
  ManageRepaymentContainer,
  RepaymentAmountField,
  RepaymentAmountFormLabel,
  RepaymentAmountTextInput,
} from './StyledManageRepaymentAmount';

type ManageRepaymentAmountProps = AEMProps & {
  handleOnClickCancel: (values) => void;
  repaymentFrequency: string | undefined;
  minimumRepaymentAmount: number | null;
  setIsEditing: Function;
  setEditComponent: Function;
  setShouldShowModal: Function;
  setModalOverlayContent: Function;
  setIsUpdating: Function;
  handleCloseEvent: Function;
};

const ManageRepaymentAmount: React.FC<ManageRepaymentAmountProps> = ({
  attributes,
  errorSuccessMap,
  repaymentFrequency,
  minimumRepaymentAmount,
  handleOnClickCancel,
  setIsEditing,
  setIsUpdating,
  setEditComponent,
  setShouldShowModal,
  setModalOverlayContent,
  handleCloseEvent,
}) => {
  const {
    manageRepaymentTitle = 'Manage Repayment Amount',
    manageRepaymentDescription,
    manageRepaymentSubHeading = 'New monthly repayment',
    manageRepaymentInputPlaceholder = 'New monthly repayment',
    manageRepaymentCancelButtonText = 'Cancel',
    manageRepaymentSaveButtonText = 'Save changes',
  }: RepaymentAmountAttributes = JSON.parse(attributes);

  const { manageRepaymentSuccessTitle, manageRepaymentSuccessDescription, globalConfig } = JSON.parse(attributes);

  const { apiResponse, selectedContract } = userStore();
  const [isLoading, setIsLoading] = useState<any>(false);
  const { errorMessage, setErrorMessage } = errorMessageStore();

  const questApiKey = localStorage?.getItem('apiKey') ?? globalConfig?.questApiKey;
  const baseApiUrl = localStorage?.getItem('baseApiUrl') ?? globalConfig?.baseApiUrl;

  const contractId = selectedContract ? selectedContract?.customerDomain?.contract?.contractId : '';
  const errorMapping = globalThis?.errorJson ? JSON.parse(globalThis.errorJson)?.errorMap : '';

  const repayBillMode = apiResponse?.repaymentData?.customerDomain?.repaymentBilling?.repaymentBillingMode;
  const advanceAmount: number = apiResponse?.repaymentData?.customerDomain?.financeAccount?.creditAmount ?? 0;

  const minRepayAmount: number =
    minimumRepaymentAmount && repayBillMode === 'ARREARS'
      ? minimumRepaymentAmount
      : minimumRepaymentAmount && minimumRepaymentAmount - advanceAmount > 0
      ? minimumRepaymentAmount - advanceAmount
      : 0.01;

  const maxAmount: number = apiResponse?.repaymentData?.customerDomain?.financeAccount?.currentBalanceOutstanding ?? 0;

  if (Number.isNaN(minimumRepaymentAmount) || minimumRepaymentAmount === null || !repaymentFrequency) return null;

  const populatedRepaymentDescription = manageRepaymentDescription
    ? decodeHTML(manageRepaymentDescription)
        ?.replace(/<minimumRepaymentAmount>/g, `<strong>${currencyFormatter(minimumRepaymentAmount)}</strong>`)
        ?.replace(/<currentRepaymentAmount>/g, `<strong>${currencyFormatter(minimumRepaymentAmount)}</strong>`)
        ?.replace(/<repaymentFrequency>/g, repaymentFrequency)
    : '';

  const modifiedRepaymentInputLabel = manageRepaymentSubHeading.replace(/<repaymentFrequency>/g, repaymentFrequency);
  const modifiedRepaymentInputPlaceholder = manageRepaymentInputPlaceholder.replace(
    /<repaymentFrequency>/g,
    repaymentFrequency,
  );

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        newRepaymentAmount: Yup.number()
          .typeError(
            errorMapping
              ? getAEMErrorMessageByCode('E36', errorMapping)
              : 'Please ensure you have entered a valid repayment amount.',
          )
          .min(
            minRepayAmount,
            errorMapping
              ? getAEMErrorMessageByCode('E40', errorMapping)
              : 'The minimum repayment amount is ' + currencyFormatter(minRepayAmount),
          )
          .max(
            maxAmount,
            maxAmount === 0
              ? 'Unknown Error'
              : errorMapping
              ? getAEMErrorMessageByCode('E41', errorMapping)
              : 'The maximum repayment amount is ' + currencyFormatter(maxAmount),
          )
          .required('Please ensure you have entered a valid repayment amount.'),
      }),
    [],
  );

  /**Error Handling for Business Errors */
  const customErrorHandler = (apiError) => {
    setIsLoading(true);
    setIsUpdating(true);
    /**Get Error Message based upon Error Code */
    const errorToPresent = getAEMErrorMessageByCode(
      apiError?.response?.data?.sourceErrorCode,
      errorSuccessMap ? errorSuccessMap : globalThis.errorJson,
    );
    setErrorMessage(errorToPresent);
  };

  const addMethod = { error: customErrorHandler, redirect: false };

  const handleFormSubmit = (values) => {
    setIsLoading(true);
    if (!values || !contractId) {
      return;
    }

    const postData = {
      customerDomain: {
        contract: {
          contractId: contractId,
        },
        payment: {
          ddOverrideAmount: values?.[`newRepaymentAmount`],
        },
      },
    };

    postCallAPI(
      'override-amount',
      `${baseApiUrl}`,
      `${questApiKey}`,
      postData,
      errorSuccessMap,
      'post',
      addMethod,
    ).then((response) => {
      if (response?.status === 204 || response?.status === 200) {
        setIsLoading(false);
        setIsUpdating(false);
        setIsEditing(false);
        setEditComponent(null);
        setShouldShowModal(true);
        setModalOverlayContent({
          title: manageRepaymentSuccessTitle,
          description: manageRepaymentSuccessDescription,
        });
      }
    });
  };

  if (isLoading) {
    return (
      <ManageRepaymentContainer
        data-testid="manage-repayment-container"
        width="100%"
      >
        <GridItemContainer>
          <IconWrapperLoading>
            <Icon
              aria-label="presentation"
              name={'stopwatch'}
            />
          </IconWrapperLoading>
          <Heading>Updating...</Heading>
        </GridItemContainer>
      </ManageRepaymentContainer>
    );
  }

  return (
    <ManageRepaymentContainer
      data-testid="manage-repayment-container"
      containerWidth={isLoading && '100%'}
    >
      {isLoading && (
        <GridItemContainer>
          <IconWrapperLoading>
            <Icon
              aria-label="presentation"
              name={'stopwatch'}
            />
          </IconWrapperLoading>
          <Heading>Updating...</Heading>
        </GridItemContainer>
      )}

      {!isLoading && (
        <>
          <HeadingWithDividerH3>{manageRepaymentTitle}</HeadingWithDividerH3>
          <DescriptionContainer>
            <RichText>{populatedRepaymentDescription}</RichText>
          </DescriptionContainer>

          <Formik
            enableReinitialize={true}
            initialValues={{
              newRepaymentAmount: minimumRepaymentAmount,
            }}
            onSubmit={handleFormSubmit}
            validateOnBlur={true}
            validateOnChange={true}
            validateOnMount={true}
            validationSchema={validationSchema}
          >
            {({ errors, handleBlur, handleChange, resetForm, setFieldValue, values }) => {
              const hasError = errors?.[`newRepaymentAmount`] ? true : false;

              return (
                <Form>
                  <RepaymentAmountField errors={hasError}>
                    <RepaymentAmountFormLabel htmlFor={'newRepaymentAmount'}>
                      {modifiedRepaymentInputLabel}
                    </RepaymentAmountFormLabel>
                    <InputContainer>
                      <CurrencyIndicator>$</CurrencyIndicator>
                      <RepaymentAmountTextInput
                        {...(hasError === true && { hasError })}
                        maxLength={11}
                        name={'newRepaymentAmount'}
                        type="text"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.[`newRepaymentAmount`]}
                        placeholder={modifiedRepaymentInputPlaceholder}
                      />
                    </InputContainer>
                  </RepaymentAmountField>
                  {errors && <ErrorMessage>{errors?.newRepaymentAmount}</ErrorMessage>}
                  {errorMessage && <InPageAnnouncement text={errorMessage} />}

                  <EditableSectionActions
                    cancelLabel={manageRepaymentCancelButtonText ? manageRepaymentCancelButtonText : 'Cancel'}
                    saveLabel={manageRepaymentSaveButtonText ? manageRepaymentSaveButtonText : 'Save changes'}
                    isLoading={isLoading}
                    isSaveDisabled={hasError ? true : false}
                    handleOnClickCancel={(e) => {
                      handleCloseEvent();
                      resetForm();
                      handleOnClickCancel(e);
                    }}
                    handleOnClickSave={() => {
                      setTimeout(() => {
                        setIsLoading(true);
                        setIsUpdating(true);
                      }, 100);
                      emitTrackEvent({
                        name: 'paymentRepaymentSaved',
                        data: {
                          rePaymentAmount: values?.[`newRepaymentAmount`].toString(),
                        },
                      });
                    }}
                  />
                </Form>
              );
            }}
          </Formik>
        </>
      )}
    </ManageRepaymentContainer>
  );
};

export default ManageRepaymentAmount;
