package com.sscp.core.models;

import static org.junit.jupiter.api.Assertions.*;

import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
class PaymentSummaryTest {

	@InjectMocks
	private PaymentSummary paySumm;

	private final AemContext context = new AemContext(ResourceResolverType.JCR_MOCK);

	@BeforeEach
	void setUp() throws Exception {
		context.addModelsForClasses(PageNotification.class);
		context.load().json("/com/sscp/core/impl/models/paymentsummary.json",
				"/content/component");
		context.currentResource("/content/component/paymentSummary");
	}

	@Test
	void test() {
		paySumm = context.request().adaptTo(PaymentSummary.class);
		assertEquals("ACCOUNT NAME", paySumm.getAccountNameFieldLabel());
		assertEquals("Account", paySumm.getAccountNumber());
		assertEquals("ACCOUNT NAME", paySumm.getAccountNumberFieldLabel());
		assertEquals("ADD BANK ACCOUNT", paySumm.getAddBankAccountSaveButtonText());
		assertEquals("You have successfully added ", paySumm.getAddBankAccountSuccessDescription());
		assertEquals("Add Bank Account +", paySumm.getAddBankAccountText());
		assertEquals("Add bank account", paySumm.getAddBankAccountTitle());
		assertEquals("Cancel", paySumm.getAddEditSectionCancelButtonText());
		assertEquals("Add & Manage Bank Accounts", paySumm.getAddManageBankAccountButtonText());
		assertEquals("The amount you are ahead of", paySumm.getAdvanceAmountDisclaimerLabelText());
		assertEquals("Amount in advance", paySumm.getAdvanceAmountLabelText());
		assertEquals("The amount you are behind your repayment", paySumm.getArrearsAmountDisclaimerLabelText());
		assertEquals("Amount in arrears", paySumm.getArrearsAmountLabelText());
		assertEquals("Biller Code", paySumm.getBillerCode());
		assertEquals("BPAY", paySumm.getBpayTitle());
		assertEquals("Bsb", paySumm.getBsbNumber());
		assertEquals("BSB NUMBER", paySumm.getBsbNumberFieldLabel());
		assertEquals("NO, CANCEL", paySumm.getDeleteBankAccountCancelButtonText());
		assertEquals("YES, REMOVE", paySumm.getDeleteBankAccountRemoveButtonText());
		assertEquals("Your bank acccount has been successfully removed", paySumm.getDeleteBankAccountSuccessDescription());
		assertEquals("Thank you!", paySumm.getDeleteBankAccountSuccessTitle());
		assertEquals("Are you sure?", paySumm.getDeleteBankAccountTitle());
		assertEquals("This bank account is linked", paySumm.getDeleteLinkedBankAccountDescription());
		assertEquals("You are about to remove your bank account.", paySumm.getDeleteOtherBankAccountDescription());
		assertEquals("EDIT BANK ACCOUNT", paySumm.getEditBankAccountSaveButtonText());
		assertEquals("Your bank account have been successfully updated", paySumm.getEditBankAccountSuccessDescription());
		assertEquals("Edit bank account", paySumm.getEditBankAccountTitle());
		assertEquals("EFT", paySumm.getEftTitle());
		String json = paySumm.getJson();
		assertEquals(json, paySumm.getJson());
		assertEquals("EFT or BPAY", paySumm.getLeftToggle());
		assertEquals("Manage Bank Accounts", paySumm.getManageBankAccountTitle());
		assertEquals("Thank you!", paySumm.getManagePaymentFrequencythankYouHeading());
		assertEquals("You have successfully updated your payment frequency.",
				paySumm.getManagePaymentFrequencythankYouHeadingSuccessDescription());
		assertEquals("Payment Frequency Quote Title", paySumm.getManagePFQuoteTitle());
		assertEquals("Payment Frequency Next Due Date", paySumm.getManagePFNextDueDate());
		assertEquals("Payment Frequency Repayment Amount", paySumm.getManagePFRepaymentAmount());
		assertEquals("Payment Frequency Loan End Date", paySumm.getManagePFLoanEndDate());
		assertEquals("Payment Frequency Balloon Amount", paySumm.getManagePFBalloonLabel());
		assertEquals("Payment Frequency Balloon Amount Tooltip", paySumm.getManagePFBalloonAmountTooltip());
		assertEquals("Payment Frequency Admin Fee", paySumm.getManagePFAdminFee());
		assertEquals("Cancel", paySumm.getManageRepaymentCancelButtonText());
		assertEquals("You can increase your Direct Debit", paySumm.getManageRepaymentDescription());
		assertEquals("Repayment Amount Placeholder", paySumm.getManageRepaymentInputPlaceholder());
		assertEquals("Save Changes", paySumm.getManageRepaymentSaveButtonText());
		assertEquals("New <repaymentFrequency> repayment", paySumm.getManageRepaymentSubHeading());
		assertEquals("Your repayment amount has been successfully updated", paySumm.getManageRepaymentSuccessDescription());
		assertEquals("Thank you!", paySumm.getManageRepaymentSuccessTitle());
		assertEquals("Repayment Amount", paySumm.getManageRepaymentTitle());
		assertEquals("NEXT DUE DATE", paySumm.getNextDueDateCalendarSubheading());
		assertEquals("Cancel", paySumm.getNextDueDateCancelButtonText());
		assertEquals("Close", paySumm.getNextDueDateCloseButtonText());
		assertEquals("Next due date", paySumm.getNextDueDateLabelText());
		assertEquals("Save", paySumm.getNextDueDateSaveButtonText());
		assertEquals("Next due date", paySumm.getNextDueDateTitle());
		assertEquals("Next Due Date Quote Title", paySumm.getNextDueDateQuoteTitle());
		assertEquals("Next Due Date Description Arrears", paySumm.getNextDueDateDescriptionArrears());
		assertEquals("Next Due Date Description Advance", paySumm.getNextDueDateDescriptionAdvance());
		assertEquals("Next Due Date Change Label", paySumm.getNextDueDateChangeLabel());
		assertEquals("Next Due Date End Date Label", paySumm.getNextDueDateEndDateLabel());
		assertEquals("Next Due Date Balloon Label", paySumm.getNextDueDateBalloonLabel());
		assertEquals("Next Due Date Balloon Tooltip", paySumm.getNextDueDateBalloonTooltip());
		assertEquals("Your next repayment amount", paySumm.getNextRepaymentAmountDisclaimerLabelText());
		assertEquals("Next repayment amount", paySumm.getNextRepaymentAmountLabelText());
		assertEquals("Nominated payment method", paySumm.getNominatedPaymentMethodLabelText());
		assertEquals("Balance as of yesterday.", paySumm.getOutstandingBalanceDisclaimerLabelText());
		assertEquals("Outstanding balance", paySumm.getOutstandingBalanceLabelText());
		assertEquals("Cancel", paySumm.getPaymentFrequencyCancelButtonText());
		assertEquals("You can change the payment frequency", paySumm.getPaymentFrequencyDescription());
		assertEquals("Payment frequency due date", paySumm.getPaymentFrequencyDueDateLabelText());
		assertEquals("Payment frequency", paySumm.getPaymentFrequencyLabelText());
		assertEquals("Payment frequency disclaimer", paySumm.getPaymentFrequencyDisclaimerText());
		assertEquals("Save Changes", paySumm.getPaymentFrequencySaveButtonText());
		assertEquals("Select Frequency", paySumm.getPaymentFrequencySubHeading());
		assertEquals("Payment frequency", paySumm.getPaymentFrequencyTitle());
		assertEquals("Add & Manage Bank Accounts", paySumm.getPaymentMethodAddManageBAButtonText());
		assertEquals("Cancel", paySumm.getPaymentMethodCancelButtonText());
		assertEquals("Your method of payment is by EFT", paySumm.getPaymentMethodDescription());
		assertEquals("Select bank account", paySumm.getPaymentMethodDirectDebitPlaceholderText());
		assertEquals("Payment Method", paySumm.getPaymentMethodTitle());
		assertEquals("Payment summary", paySumm.getPaymentSummaryLabelText());
		assertEquals("Ref", paySumm.getRefNumber());
		assertEquals("The total repayment schedule amount", paySumm.getRepaymentAmountDisclaimerLabelText());
		assertEquals("Repayment amount", paySumm.getRepaymentAmountLabelText());
		assertEquals("Direct Debit", paySumm.getRightToggle());
		assertEquals("Direct Debit Account", paySumm.getSirectDebitSelect());
		assertEquals("Save Changes", paySumm.getSubmitButtonText());
		assertEquals("You have successfully updated the payment method.", paySumm.getSuccessModalDescription());
		assertEquals("Payment method discalimer.", paySumm.getPaymentMethodDiscalimer());
		assertEquals("Thank you!", paySumm.getSuccessModalHeading());
		assertEquals("Account Name", paySumm.getTableTitle1());
		assertEquals("BSB & Account Number", paySumm.getTableTitle2());
		assertEquals("Direct Debit", paySumm.getTableTitle3());
		assertEquals("Edit/Delete", paySumm.getTableTitle4());
		assertEquals("Thank you!", paySumm.getThankYouHeading());
	}

}
