import { GlobalConfigProps } from '@/types/global/aem-definition';

export type PaymentSummaryParsedProps = {
  advanceAmountDisclaimerLabelText?: string;
  advanceAmountLabelText?: string;
  arrearsAmountDisclaimerLabelText?: string;
  arrearsAmountLabelText?: string;
  outstandingBalanceDisclaimerLabelText?: string;
  outstandingBalanceLabelText?: string;
  nextDueDateLabelText?: string;
  nextRepaymentAmountDisclaimerLabelText?: string;
  nextRepaymentAmountLabelText?: string;
  nominatedPaymentMethodLabelText?: string;
  paymentFrequencyDueDateLabelText?: string;
  paymentFrequencyLabelText?: string;
  paymentFrequencyDisclaimerText?: string;
  paymentSummaryLabelText?: string;
  repaymentAmountDisclaimerLabelText?: string;
  repaymentAmountLabelText?: string;
  arrearsAmount?: string; //STUB Attribute ONLY
  advanceAmount?: string; //STUB Attribute ONLY
  globalConfig: GlobalConfigProps;
  addManageBankAccountButtonText?: string;

  // Next Due date modal
  nextDueDateTitle: string;
  nextDueDateDescription?: string;
  nextDueDateCalendarSubheading?: string;
  nextDueDateCloseButtonText?: string;
  nextDueDateCancelButtonText?: string;
  nextDueDateSaveButtonText?: string;

  // Add/Edit Bank Account modal
  addBankAccountTitle?: string;
  editBankAccountTitle?: string;
  accountNameFieldLabel?: string;
  bsbnumberFieldLabel?: string;
  accountNumberFieldLabel?: string;
  addEditSectionCancelButtonText?: string;
  addBankAccountSaveButtonText?: string;
  editBankAccountSaveButtonText?: string;
  thankYouHeading?: string;
  addBankAccountSuccessDescription?: string;
  editBankAccountSuccessDescription?: string;

  // ManagePayment Frequency modal
  paymentFrequencyTitle: string;
  paymentFrequencyDescription: string;
  paymentFrequencySubHeading: string;
  paymentFrequencyCancelButtonText: string;
  paymentFrequencySaveButtonText: string;
  managePFQuoteTitle: string;
  managePFNextDueDate: string;
  managePFRepaymentAmount: string;
  managePFLoanEndDate: string;
  managePFBalloonLabel: string;
  managePFBalloonAmountTooltip: string;
  managePFAdminFee: string;

  // Delete account authoring
  deleteBankAccountTitle?: string;
  deleteLinkedBankAccountDescription?: string;
  deleteOtherBankAccountDescription?: string;
  deleteBankAccountRemoveButtonText?: string;
  deleteBankAccountCancelButtonText?: string;
  deleteBankAccountSuccessTitle?: string;
  deleteBankAccountSuccessDescription?: string;

  // Quote Authoring
  quoteHeading: string;
  quoteText1: string;
  quoteText2: string;
  quoteText3: string;
  quoteText4: string;
  quoteText5: string;

  managePaymentFrequencythankYouHeading: string;
  managePaymentFrequencythankYouHeadingSuccessDescription: string;
};

export type NextDueDateAttributes = {
  nextDueDateTitle: string;
  nextDueDateDescriptionArrears: string;
  nextDueDateDescriptionAdvance: string;
  nextDueDateQuoteTitle: string;
  nextDueDateChangeLabel: string;
  nextDueDateEndDateLabel: string;
  nextDueDateBalloonLabel: string;
  nextDueDateBalloonTooltip;
  nextDueDateCalendarSubheading?: string;
  nextDueDateCloseButtonText?: string;
  nextDueDateCancelButtonText?: string;
  manageRepaymentSaveButtonText?: string;
  nextDueDateSaveButtonText?: string;
};

export type RepaymentAmountAttributes = {
  manageRepaymentTitle: string;
  manageRepaymentDescription?: string;
  manageRepaymentSubHeading?: string;
  manageRepaymentInputPlaceholder?: string;
  manageRepaymentCancelButtonText?: string;
  manageRepaymentSaveButtonText?: string;
  manageRepaymentSuccessTitle?: string;
  manageRepaymentSuccessDescription?: string;
};

export type QuoteAttributes = {
  quoteHeading: string;
  quoteText1: string;
  quoteText2: string;
  quoteText3: string;
  quoteText4: string;
  quoteText5: string;
};
