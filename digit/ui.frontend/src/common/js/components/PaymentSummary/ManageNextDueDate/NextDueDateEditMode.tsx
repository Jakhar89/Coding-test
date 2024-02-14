import { useFormikContext } from 'formik';
import React from 'react';

import { userStore } from '@/context/User/User';
import { AEMProps } from '@/types/global/aem-definition';
import FormDatePicker from '@/utility/components/FormElement/DatePicker';
import FormLabel from '@/utility/components/FormElement/Label';
import {
  ContentLabel,
  Field,
  HeadingWithDividerH3,
  SubHeadingText,
  SubTitle,
} from '@/utility/components/FormElement/StyledFormSection';
import InPageAnnouncement from '@/utility/components/InPageAnnouncement';
import RichText from '@/utility/components/RichText';
import { formatDate } from '@/utility/helpers/dateTime';

import { NextDueDateAttributes } from '../definitions';
import { DescriptionContainer, NextDueDateContainer } from '../StyledPaymentSummary';
import ManageNextDueDate from './ManageNextDueDate';

type NextDueDateEditModeProps = AEMProps & {
  handleOnClickCancel: (values) => void;
  handleFormSubmit: (values) => void;
  handleCloseEvent: (values) => void;
  setIsEditing: (values) => void;
  getRepaymentsData: (values) => void;
  setShouldShowModal: (values) => void;
};

const BILLING_MODE_ARREARS = 'ARREARS';
const BILLING_MODE_ADVANCE = 'ADVANCE';

const NextDueDateEditMode: React.FC<NextDueDateEditModeProps> = ({
  attributes,
  errorSuccessMap,
  handleOnClickCancel,
  handleFormSubmit,
  handleCloseEvent,
  setIsEditing,
  getRepaymentsData,
  setShouldShowModal,
}) => {
  const {
    nextDueDateTitle = 'Next due date',
    nextDueDateDescriptionArrears,
    nextDueDateDescriptionAdvance,
    nextDueDateQuoteTitle = 'Proposed changes',
    nextDueDateCalendarSubheading = 'NEXT DUE DATE',
    nextDueDateChangeLabel = 'Due date change',
    nextDueDateEndDateLabel = 'Loan end date',
    nextDueDateBalloonLabel = 'Balloon amount',
    nextDueDateBalloonTooltip,
    nextDueDateCancelButtonText = 'Cancel',
    nextDueDateSaveButtonText = 'Save changes',
  }: NextDueDateAttributes = JSON.parse(attributes);

  const { apiResponse } = userStore();
  const { repaymentData } = apiResponse || {};
  const { repaymentBillingMode } = repaymentData?.customerDomain?.repaymentBilling || {};
  const { nextPaymentDate } = repaymentData?.customerDomain?.financeAccount || {};

  const getNextDueDateDescription = () => {
    if (repaymentBillingMode?.toLowerCase() === BILLING_MODE_ADVANCE.toLowerCase()) {
      return nextDueDateDescriptionAdvance;
    }
    // If billing mode is arrears, return formatted arrears description
    const formattedNextPaymentDate = nextPaymentDate ? formatDate(new Date(nextPaymentDate)) : '';

    return nextDueDateDescriptionArrears?.replace('{nextDueDate}', formattedNextPaymentDate);
  };

  return (
    <NextDueDateContainer>
      <HeadingWithDividerH3>{nextDueDateTitle}</HeadingWithDividerH3>
      <DescriptionContainer>
        <RichText>{getNextDueDateDescription()}</RichText>
      </DescriptionContainer>

      <ManageNextDueDate
        attributes={attributes}
        setIsEditing={setIsEditing}
        getRepaymentsData={getRepaymentsData}
        nextDueDateQuoteTitle={nextDueDateQuoteTitle}
        nextDueDateChangeLabel={nextDueDateChangeLabel}
        nextDueDateEndDateLabel={nextDueDateEndDateLabel}
        nextDueDateBalloonLabel={nextDueDateBalloonLabel}
        nextDueDateBalloonTooltip={nextDueDateBalloonTooltip}
        nextDueDateCalendarSubheading={nextDueDateCalendarSubheading}
        nextDueDateCancelButtonText={nextDueDateCancelButtonText}
        nextDueDateSaveButtonText={nextDueDateSaveButtonText}
        handleOnClickCancel={handleOnClickCancel}
        errorSuccessMap={errorSuccessMap}
        handleFormSubmit={handleFormSubmit}
        handleCloseEvent={handleCloseEvent}
        setShouldShowModal={setShouldShowModal}
      />
    </NextDueDateContainer>
  );
};

export default NextDueDateEditMode;
