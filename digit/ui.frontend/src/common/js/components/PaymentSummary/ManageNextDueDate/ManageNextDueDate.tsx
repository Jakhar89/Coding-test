import { Form, Formik, FormikErrors } from 'formik';
import React, { useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';

import MessageBoxElement from '@/components/MessageBox/MessageBox';
import { errorMessageStore } from '@/context/ErrorMessage/ErrorMessage';
import { userStore } from '@/context/User/User';
import EditableSectionActions from '@/utility/components/EditableSection/EditableSectionActions';
import FormDatePicker from '@/utility/components/FormElement/DatePicker';
import FormLabel from '@/utility/components/FormElement/Label';
import { Field } from '@/utility/components/FormElement/StyledFormSection';
import Icon from '@/utility/components/Icon';
import InPageAnnouncement from '@/utility/components/InPageAnnouncement';
import { emitTrackEvent } from '@/utility/helpers/analytics';
import { postCallAPI } from '@/utility/helpers/api';
import { addDaystoDate, formatDate } from '@/utility/helpers/dateTime';
import { currencyFormatter } from '@/utility/helpers/string';
import { getAEMErrorMessageByCode } from '@/utility/helpers/validation';

import { QuoteType } from '../ManagePaymentFrequency/definitions';
import {
  IconWrapper,
  IconWrapperInline,
  MessageBoxContent,
  MessageBoxHeader,
  MessageBoxSection,
} from '../StyledPaymentSummary';

const ManageNextDueDate: React.FC<any> = ({
  nextDueDateCalendarSubheading,
  nextDueDateCancelButtonText,
  nextDueDateSaveButtonText,
  nextDueDateQuoteTitle,
  nextDueDateChangeLabel,
  nextDueDateEndDateLabel,
  nextDueDateBalloonLabel,
  nextDueDateBalloonTooltip,
  handleOnClickCancel,
  errorSuccessMap,
  attributes,
  handleCloseEvent,
  setIsEditing,
  setShouldShowModal,
  getRepaymentsData,
}) => {
  // const { handleBlur, setFieldValue, values } = useFormikContext<MarketingAndCommunicationsValues>();

  const { apiResponse, selectedContract } = userStore();
  const { repaymentData } = apiResponse || {};
  const { nextPaymentDate } = repaymentData?.customerDomain?.financeAccount || {};
  const { repaymentBillingMode } = repaymentData?.customerDomain?.repaymentBilling || {};

  const [nextDueDate, setNextDueDate] = useState<Date | null>();
  const [quoteUpdateResponse, setQuoteUpdateResponse] = useState<QuoteType | null>(null);
  const [isLoading, setIsLoading] = useState<any>(false);

  const nextDueDateJason = JSON.parse(attributes);

  const contractId = selectedContract ? selectedContract?.customerDomain?.contract?.contractId : '';

  const questApiKey = localStorage?.getItem('apiKey') ?? nextDueDateJason?.globalConfig?.questApiKey;
  const baseApiUrl = localStorage?.getItem('baseApiUrl') ?? nextDueDateJason?.globalConfig?.baseApiUrl;

  const formattedNextPaymentDate = nextPaymentDate ? new Date(nextPaymentDate) : undefined;
  const { errorMessage, setErrorMessage } = errorMessageStore();

  /**Error Handling for Business Errors */
  const customErrorHandler = (apiError) => {
    setIsLoading(false);
    /**Get Error Message based upon Error Code */
    const errorToPresent = getAEMErrorMessageByCode(apiError?.response?.data?.sourceErrorCode, errorSuccessMap);
    setErrorMessage(errorToPresent);
  };

  const addMethod = { error: customErrorHandler, redirect: false };

  useEffect(() => {
    if (!nextDueDate || formatDate(nextDueDate) == formatDate(formattedNextPaymentDate)) {
      setQuoteUpdateResponse(null);
      return;
    }

    if (nextDueDate) {
      setIsLoading(true);
      const postData = {
        customerDomain: {
          contract: {
            contractId,
          },
          inLifeQuote: {
            proposedBillingDate: nextDueDate.getDate(),
          },
          customerInteractionCase: {
            caseId: quoteUpdateResponse?.customerDomain?.customerInteractionCase?.caseID ?? '',
          },
        },
      };

      postCallAPI(
        'manage-due-date',
        `${baseApiUrl}`,
        `${questApiKey}`,
        postData,
        errorSuccessMap,
        'post',
        addMethod,
      ).then((response) => {
        setIsLoading(false);
        if (response?.data) {
          setQuoteUpdateResponse(response?.data);
        }
      });
    }
  }, [nextDueDate]);

  /**Show Models after Submit */
  const saveNextDueDate = () => {
    const caseId = quoteUpdateResponse?.customerDomain?.customerInteractionCase?.caseID;

    const payload = {
      customerDomain: {
        customerInteractionCase: {
          caseId: caseId,
        },
      },
    };

    postCallAPI(
      'manage-due-date', // Update endpoint when available
      `${baseApiUrl}`,
      `${questApiKey}`,
      payload,
      errorSuccessMap,
      'put',
      addMethod,
    ).then((response) => {
      setIsLoading(false);
      if (response?.status === 200) {
        setErrorMessage(null);

        // update payment summary data
        getRepaymentsData(contractId);

        setIsEditing(false);
        setShouldShowModal(true);
      }
    });
  };

  // validation with error config from AEM
  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        nextDueDate: Yup.string().required('Please select a valid date.'),
      }),
    [],
  );

  const balloonTooltip = (
    <IconWrapperInline>
      <Icon
        name={'info-circle'}
        aria-label="hide navigation"
        isFunctional={true}
        fill="currentColor"
        title={nextDueDateBalloonTooltip ?? ''}
      />
    </IconWrapperInline>
  );

  const messageBoxAmountData = [
    {
      title: nextDueDateChangeLabel,
      value: quoteUpdateResponse?.customerDomain?.inLifeQuote?.proposedInvoiceDueDate
        ? `${formatDate(
            new Date(quoteUpdateResponse?.customerDomain?.inLifeQuote?.proposedInvoiceDueDate),
          )} (repeating ${quoteUpdateResponse?.customerDomain?.inLifeQuote?.proposedRepaymentFrequency})`
        : '',
    },
    {
      title: nextDueDateEndDateLabel,
      value: quoteUpdateResponse?.customerDomain?.inLifeQuote?.proposedContractEndDate
        ? formatDate(new Date(quoteUpdateResponse?.customerDomain?.inLifeQuote?.proposedContractEndDate))
        : '',
    },
  ];

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        nextDueDate: formattedNextPaymentDate,
      }}
      onSubmit={saveNextDueDate}
      validateOnBlur={true}
      validateOnChange={true}
      validateOnMount={true}
      validationSchema={validationSchema}
    >
      {({ errors, handleBlur, handleChange, resetForm, setFieldValue, values }) => {
        const isSelectedSame = formatDate(values?.nextDueDate) === formatDate(formattedNextPaymentDate);

        // TODO remove max date once data source is available
        const maxDate = addDaystoDate(formattedNextPaymentDate, 30);

        return (
          <Form>
            <Field>
              <FormLabel
                htmlFor={'nextDueDate'}
                optional={false}
              >
                {nextDueDateCalendarSubheading}
              </FormLabel>
              <FormDatePicker
                handleDateChange={setNextDueDate}
                name={'nextDueDate'}
                minDate={formattedNextPaymentDate}
                maxDate={maxDate}
                disabled={isLoading === true}
              />
            </Field>

            {quoteUpdateResponse && (
              <MessageBoxElement>
                <MessageBoxHeader>{nextDueDateQuoteTitle}</MessageBoxHeader>
                <MessageBoxSection>
                  {messageBoxAmountData.map((row, index) => {
                    return (
                      <MessageBoxContent key={index}>
                        {row?.title}
                        {row?.infoIcon && row?.infoIcon}: {row?.value}
                      </MessageBoxContent>
                    );
                  })}
                </MessageBoxSection>
              </MessageBoxElement>
            )}

            <EditableSectionActions
              cancelLabel={nextDueDateCancelButtonText ? nextDueDateCancelButtonText : 'Cancel'}
              saveLabel={nextDueDateSaveButtonText ? nextDueDateSaveButtonText : 'Save changes'}
              isLoading={isLoading}
              isSaveDisabled={isSelectedSame || !quoteUpdateResponse}
              handleOnClickCancel={(e) => {
                handleCloseEvent();
                resetForm();
                handleOnClickCancel(e);
                setErrorMessage(null);
              }}
              handleOnClickSave={() => {
                emitTrackEvent({
                  name: 'paymentNextDDateSaved',
                  data: {
                    paymentNextDDate: formatDate(nextDueDate),
                  },
                });
                setTimeout(() => {
                  setIsLoading(true);
                  setErrorMessage(null);
                }, 100);
              }}
            />

            {/* show timeout-type message */}
            {errorMessage && <InPageAnnouncement text={errorMessage} />}
          </Form>
        );
      }}
    </Formik>
  );
};

export default ManageNextDueDate;
