import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';

import { MessageBoxElement } from '@/components/MessageBox/StyledMessageBox';
import { errorMessageStore } from '@/context/ErrorMessage/ErrorMessage';
import { userStore } from '@/context/User/User';
import EditableSectionActions from '@/utility/components/EditableSection/EditableSectionActions';
import DropdownWithFilter from '@/utility/components/FormElement/DropdownWithFilter/DropdownWithFilter';
import FormSection from '@/utility/components/FormElement/FormSection';
import FormLabel from '@/utility/components/FormElement/Label';
import RichText from '@/utility/components/RichText';
import {
  Field,
  HeadingWithButtonWrapper,
  HeadingWithDividerH3,
} from '@/utility/components/FormElement/StyledFormSection';
import Icon from '@/utility/components/Icon';
import InPageAnnouncement from '@/utility/components/InPageAnnouncement';
import { emitTrackEvent } from '@/utility/helpers/analytics';
import { postCallAPI } from '@/utility/helpers/api';
import { formatDate } from '@/utility/helpers/dateTime';
import { currencyFormatter } from '@/utility/helpers/string';
import { getAEMErrorMessageByCode } from '@/utility/helpers/validation';

import {
  ContentWrapper,
  Description,
  GridItemContainer,
  GridRowContainer,
  Heading,
  IconWrapperLoading,
} from '../ManageBankAccount/StyledManageBankAccount';
import {
  ButtonWrapper,
  CloseButton,
  DescriptionContainer,
  IconWrapper,
  IconWrapperInline,
  ManageBankAccountFormContainer,
  MessageBoxContent,
  MessageBoxContentLabel,
  MessageBoxHeader,
  MessageBoxSection,
  SuccessIconContainer,
} from '../StyledPaymentSummary';
import { paramsInterface, QuoteType } from './definitions';

const ManagePaymentFrequency: React.FC<any> = ({
  jsonData,
  handleOnClickCancel,
  errorSuccessMap,
  selectedFrequency,
  setIsEditing,
  handleCloseEvent,
  getRepaymentsData,
}: paramsInterface) => {
  const [isSelectedSame, setIsSelectedSame] = useState<any>(true);
  const [isDisabled, setIsDisabled] = useState<any>(false);
  const [isLoading, setIsLoading] = useState<any>(false);
  const { errorMessage, setErrorMessage } = errorMessageStore();
  const { apiResponse, selectedContract } = userStore();
  const [selectedOption, setSelectedOption] = useState<any>();
  const [nextDueDate, setNextDueDate] = useState<Date | null>();
  const [quoteUpdateResponse, setQuoteUpdateResponse] = useState<QuoteType | null>();
  const [isSelectedFrequency, setIsSelectedFrequency] = useState<any>(selectedFrequency);
  const [managePaymentFrequencyState, setManagePaymentFrequencyState] = useState('edit');

  const {
    paymentFrequencyTitle,
    paymentFrequencySubHeading,
    paymentFrequencyDescription,
    paymentFrequencyAdvancedDescription,
    paymentFrequencyCancelButtonText,
    paymentFrequencySaveButtonText,
    managePFQuoteTitle,
    managePFNextDueDate,
    managePFRepaymentAmount,
    managePFLoanEndDate,
    managePFBalloonLabel,
    managePFBalloonAmountTooltip,
    managePFAdminFee,
    globalConfig,
  } = jsonData || {};

  const questApiKey = localStorage?.getItem('apiKey') ?? globalConfig?.questApiKey;
  const baseApiUrl = localStorage?.getItem('baseApiUrl') ?? globalConfig?.baseApiUrl;

  const contractId = selectedContract ? selectedContract?.customerDomain?.contract?.contractId : '';

  const BILLING_MODE_ADVANCE = 'advance';
  const { repaymentBillingMode } = apiResponse?.repaymentData?.customerDomain?.repaymentBilling || {};
  const { nextPaymentDate } = apiResponse?.repaymentData?.customerDomain?.financeAccount || {};
  
  
  const getPaymentFrequencyDescription = () => {
    if(repaymentBillingMode?.toLowerCase() === BILLING_MODE_ADVANCE) {
      return paymentFrequencyAdvancedDescription;
    }
    const formattedDueDate = nextPaymentDate ? formatDate(new Date(nextPaymentDate)) : '';
    return paymentFrequencyDescription?.replace('{Next due date}', formattedDueDate);
  }

  useEffect(() => {
    /**Initiate the Update/Generate Quote call*/
    if (selectedOption && isSelectedFrequency) {
      updateFrequency();
    }
  }, [selectedOption]);

  /**Error Handling for Business Errors */
  const customErrorHandler = (apiError) => {
    setIsLoading(false);
    setManagePaymentFrequencyState('edit');
    /**Get Error Message based upon Error Code */
    const errorToPresent = getAEMErrorMessageByCode(apiError?.response?.data?.sourceErrorCode, errorSuccessMap);
    setErrorMessage(errorToPresent);
  };

  const addMethod = { error: customErrorHandler, redirect: false };

  const updateFrequency = () => {
    /**Resetting Quote and Error Message
     * Remove display boxes
     */
    setQuoteUpdateResponse(null);
    setErrorMessage(null);

    setIsLoading(true);

    const postData = {
      customerDomain: {
        contract: {
          contractId,
        },
        inLifeQuote: {
          proposedRepaymentFrequency: isSelectedFrequency,
        },
        customerInteractionCase: {
          caseId: quoteUpdateResponse?.customerDomain?.customerInteractionCase?.caseID ?? '',
        },
      },
    };

    postCallAPI(
      'change-payment-frequency',
      `${baseApiUrl}`,
      `${questApiKey}`,
      postData,
      errorSuccessMap,
      'post',
      addMethod,
    ).then((response) => {
      if (response?.data) {
        setIsLoading(false);
        setIsDisabled(false);
        /**Save the Quote to State
         * Case ID will be retrieved from here for re-generate call
         */
        setQuoteUpdateResponse(response?.data);
      }
    });
  };

  /**Show Models after Submit */
  const savePaymentFrequency = () => {
    const caseId = quoteUpdateResponse?.customerDomain?.customerInteractionCase?.caseID;

    const payload = {
      customerDomain: {
        customerInteractionCase: {
          caseId: caseId,
        },
      },
    };

    setManagePaymentFrequencyState('updating');

    postCallAPI(
      'submit-payment-frequency',
      `${baseApiUrl}`,
      `${questApiKey}`,
      payload,
      errorSuccessMap,
      'put',
      addMethod,
    ).then((response) => {
      setIsLoading(false);
      if (response?.status === 200) {
        setManagePaymentFrequencyState('success');
        setErrorMessage(null);

        // update payment summary data
        getRepaymentsData(contractId);

        setTimeout(() => {
          setIsEditing(false);
        }, 3000);
      }
    });
  };

  const balloonTooltip = (
    <IconWrapperInline>
      <Icon
        name={'info-circle'}
        aria-label="hide navigation"
        isFunctional={true}
        fill="currentColor"
        title={managePFBalloonAmountTooltip ?? ''}
      />
    </IconWrapperInline>
  );

  const messageBoxAmountData = [
    {
      title: managePFNextDueDate ?? '',
      value: quoteUpdateResponse?.customerDomain?.inLifeQuote?.proposedInvoiceDueDate
        ? formatDate(new Date(quoteUpdateResponse?.customerDomain?.inLifeQuote?.proposedInvoiceDueDate))
        : '',
    },
    {
      title: managePFRepaymentAmount ?? '',
      value: quoteUpdateResponse?.customerDomain?.inLifeQuote?.proposedInstalmentAmount
        ? currencyFormatter(quoteUpdateResponse?.customerDomain?.inLifeQuote?.proposedInstalmentAmount)
        : '',
    },
    {
      title: managePFLoanEndDate ?? '',
      value: quoteUpdateResponse?.customerDomain?.inLifeQuote?.proposedContractEndDate
        ? formatDate(new Date(quoteUpdateResponse?.customerDomain?.inLifeQuote?.proposedContractEndDate))
        : '',
    },
    {
      title: managePFBalloonLabel ?? '',
      infoIcon: balloonTooltip,
      value: quoteUpdateResponse?.customerDomain?.inLifeQuote?.proposedBalloonAmount
        ? currencyFormatter(quoteUpdateResponse?.customerDomain?.inLifeQuote?.proposedBalloonAmount)
        : '',
    },
    {
      title: managePFAdminFee ?? '',
      value: quoteUpdateResponse?.customerDomain?.inLifeQuote?.proposedAdminFee
        ? currencyFormatter(quoteUpdateResponse?.customerDomain?.inLifeQuote?.proposedAdminFee)
        : '',
    },
  ];

  const ButtonWrapperInner = () => (
    <>
      <CloseButton
        aria-label="close"
        onClick={() => {
          {
            /**Use for Analytics Event Trigger */
          }
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

  const onChange = (option): void => {
    setSelectedOption(option);
    if (option?.label === selectedFrequency || option === null) {
      setIsSelectedSame(true);
      setIsSelectedFrequency(option?.label);
    } else {
      setIsSelectedFrequency(option?.label);
      setIsSelectedSame(false);
    }
  };

  const paymentFrequency = {
    frequency: [
      {
        label: 'Weekly',
        value: 'Weekly',
      },
      {
        label: 'Fortnightly',
        value: 'Fortnightly',
      },
      {
        label: 'Monthly',
        value: 'Monthly',
      },
    ],
  };

  const getPaymentFrequency = () => {
    return paymentFrequency?.frequency?.map((frequency, index) => {
      const label = frequency?.label;
      const value = frequency?.value;

      const optionLabel = `${label}`;
      const optionValue = `${value}`;
      /**Attaching Icon only for the already selected option */
      const optionIcon =
        optionLabel === isSelectedFrequency ? (
          <Icon
            name={'check'}
            isFunctional={true}
          />
        ) : null;

      return {
        label: optionLabel,
        value: optionValue,
        icon: optionIcon,
      };
    });
  };

  const getOptionLabel = (e) => (
    <IconWrapper>
      <span className="icon">{e.icon}</span>
      <span className="label">{e.label}</span>
      {e.isSelected && <span className="subText">{e.subText}</span>}
    </IconWrapper>
  );

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        paymentFrequency: '',
      }}
      onSubmit={savePaymentFrequency}
      validateOnBlur={true}
      validateOnChange={true}
      validateOnMount={true}
    >
      {({ errors, handleBlur, handleChange, resetForm, setFieldValue, values }) => {
        return (
          <Form>
            {managePaymentFrequencyState === 'edit' && (
              <>
                <HeadingWithButtonWrapper>
                  <HeadingWithDividerH3>{paymentFrequencyTitle}</HeadingWithDividerH3>
                  <ButtonWrapper>
                    <ButtonWrapperInner />
                  </ButtonWrapper>
                </HeadingWithButtonWrapper>
                <ManageBankAccountFormContainer>
                  <DescriptionContainer>
                    <RichText>{getPaymentFrequencyDescription()}</RichText>
                  </DescriptionContainer>
                  <Field>
                    <FormLabel
                      htmlFor={'paymentFrequency'}
                      optional={false}
                    >
                      {paymentFrequencySubHeading}
                    </FormLabel>
                    <DropdownWithFilter
                      isClearable={true}
                      isLoading={false}
                      name={'paymentfrequency'}
                      onOptionChange={onChange}
                      options={getPaymentFrequency()}
                      getOptionLabel={getOptionLabel}
                      placeholder={'Select Frequency'}
                      selectedOption={selectedOption}
                    />
                  </Field>

                  {quoteUpdateResponse && (
                    <MessageBoxElement>
                      <MessageBoxHeader>{managePFQuoteTitle ?? ''}</MessageBoxHeader>
                      <MessageBoxSection>
                        {messageBoxAmountData.map((row, index) => {
                          return (
                            <MessageBoxContent key={index}>
                              <MessageBoxContentLabel>{row?.title}</MessageBoxContentLabel>
                              {row?.infoIcon && row?.infoIcon}: {row?.value}
                            </MessageBoxContent>
                          );
                        })}
                      </MessageBoxSection>
                    </MessageBoxElement>
                  )}

                  <EditableSectionActions
                    cancelLabel={paymentFrequencyCancelButtonText ? paymentFrequencyCancelButtonText : 'Cancel'}
                    saveLabel={paymentFrequencySaveButtonText ? paymentFrequencySaveButtonText : 'Save changes'}
                    isLoading={isLoading}
                    isSaveDisabled={isSelectedSame || isDisabled}
                    handleOnClickCancel={(e) => {
                      handleCloseEvent();
                      resetForm();
                      handleOnClickCancel(e);
                      setErrorMessage(null);
                    }}
                    handleOnClickSave={() => {
                      // handleClientValidationErrors({ errors, journeyFlow, modalTitle });
                      emitTrackEvent({
                        name: 'paymentFrequencySaved',
                        data: {
                          paymentPeriod: selectedOption?.value,
                        },
                      });
                      setTimeout(() => {
                        setIsLoading(true);
                        setErrorMessage(null);
                      }, 100);
                    }}
                  />
                </ManageBankAccountFormContainer>
              </>
            )}
            {managePaymentFrequencyState === 'updating' && (
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

            {managePaymentFrequencyState === 'success' && (
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
                      <Heading>{jsonData.managePaymentFrequencythankYouHeading}</Heading>
                      <Description>{jsonData.managePaymentFrequencythankYouHeadingSuccessDescription}</Description>
                    </GridItemContainer>
                  </GridRowContainer>
                </ContentWrapper>
              </>
            )}

            {/* show timeout-type message */}
            {errorMessage && <InPageAnnouncement text={errorMessage} />}
          </Form>
        );
      }}
    </Formik>
  );
};

export default ManagePaymentFrequency;
