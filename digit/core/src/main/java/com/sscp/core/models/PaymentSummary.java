package com.sscp.core.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.gson.GsonBuilder;
import com.sscp.core.services.GlobalConfigurationService;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;

/**
 * Payment Summary Component
 */
@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "sscp/components/paymentsummary")

@Exporter(name = "jackson", extensions = "json")
public class PaymentSummary {
	@OSGiService
	@Self
	private GlobalConfigurationService globalConfig;

	@ValueMapValue
	private String paymentSummaryLabelText;

	@ValueMapValue
	private String outstandingBalanceLabelText;

	@ValueMapValue
	private String outstandingBalanceDisclaimerLabelText;

	@ValueMapValue
	private String arrearsAmountLabelText;

	@ValueMapValue
	private String arrearsAmountDisclaimerLabelText;

	@ValueMapValue
	private String advanceAmountLabelText;

	@ValueMapValue
	private String advanceAmountDisclaimerLabelText;

	@ValueMapValue
	private String nominatedPaymentMethodLabelText;

	@ValueMapValue
	private String paymentFrequencyLabelText;

	@ValueMapValue
	private String paymentFrequencyDisclaimerText;

	@ValueMapValue
	private String paymentFrequencyDueDateLabelText;

	@ValueMapValue
	private String repaymentAmountLabelText;

	@ValueMapValue
	private String repaymentAmountDisclaimerLabelText;

	@ValueMapValue
	private String nextDueDateLabelText;

	@ValueMapValue
	private String nextRepaymentAmountLabelText;

	@ValueMapValue
	private String nextRepaymentAmountDisclaimerLabelText;

	@ValueMapValue
	private String addManageBankAccountButtonText;
	/** Manage Bank Account - section */

	@ValueMapValue
	private String manageBankAccountTitle;

	@ValueMapValue
	private String tableTitle1;

	@ValueMapValue
	private String tableTitle2;

	@ValueMapValue
	private String tableTitle3;

	@ValueMapValue
	private String tableTitle4;

	@ValueMapValue
	private String addBankAccountText;

	/** Payment Summary Next Due Date Component - start */

	@ValueMapValue
	private String nextDueDateTitle;

	@ValueMapValue
	private String nextDueDateDescriptionArrears;

	@ValueMapValue
	private String nextDueDateDescriptionAdvance;

	@ValueMapValue
	private String nextDueDateCalendarSubheading;

	@ValueMapValue
	private String nextDueDateCloseButtonText;

	@ValueMapValue
	private String nextDueDateCancelButtonText;

	@ValueMapValue
	private String nextDueDateSaveButtonText;

	@ValueMapValue
	private String nextDueDateQuoteTitle;

	@ValueMapValue
	private String nextDueDateChangeLabel;

	@ValueMapValue
	private String nextDueDateEndDateLabel;

	@ValueMapValue
	private String nextDueDateBalloonLabel;

	@ValueMapValue
	private String nextDueDateBalloonTooltip;

	/** Payment Summary Next Due Date Component - end */

	/** Add / Edit Bank Account Component - start */

	@ValueMapValue
	private String addBankAccountTitle;

	@ValueMapValue
	private String editBankAccountTitle;

	@ValueMapValue
	private String accountNameFieldLabel;

	@ValueMapValue
	private String bsbnumberFieldLabel;

	@ValueMapValue
	private String accountNumberFieldLabel;

	@ValueMapValue
	private String addEditSectionCancelButtonText;

	@ValueMapValue
	private String addBankAccountSaveButtonText;

	@ValueMapValue
	private String editBankAccountSaveButtonText;

	@ValueMapValue
	private String thankYouHeading;

	@ValueMapValue
	private String addBankAccountSuccessDescription;

	@ValueMapValue
	private String editBankAccountSuccessDescription;

	/** Add / Edit Bank Account Component - end */

	/** Delete Bank Account Component - start */

	@ValueMapValue
	private String deleteBankAccountTitle;

	@ValueMapValue
	private String deleteLinkedBankAccountDescription;

	@ValueMapValue
	private String deleteOtherBankAccountDescription;

	@ValueMapValue
	private String deleteBankAccountRemoveButtonText;

	@ValueMapValue
	private String deleteBankAccountCancelButtonText;

	@ValueMapValue
	private String deleteBankAccountSuccessTitle;

	@ValueMapValue
	private String deleteBankAccountSuccessDescription;

	/** Delete Bank Account Component - end */
	/** Payment Method */
	@ValueMapValue
	private String paymentMethodTitle;

	@ValueMapValue
	private String paymentMethodDescription;

	@ValueMapValue
	private String leftToggle;
	@ValueMapValue
	private String rightToggle;

	@ValueMapValue
	private String eftTitle;

	@ValueMapValue
	private String bsbNumber;
	@ValueMapValue
	private String accountNumber;
	@ValueMapValue
	private String bpayTitle;
	@ValueMapValue
	private String billerCode;
	@ValueMapValue
	private String refNumber;
	@ValueMapValue
	private String directDebitSelect;
	@ValueMapValue
	private String paymentMethodDirectDebitPlaceholderText;
	@ValueMapValue
	private String paymentMethodAddManageBAButtonText;
	@ValueMapValue
	private String submitButtonText;
	@ValueMapValue
	private String paymentMethodCancelButtonText;
	@ValueMapValue
	private String successModalHeading;
	@ValueMapValue
	private String successModalDescription;
	@ValueMapValue
	private String paymentMethodDiscalimer;

	/** Payment Method End */

	/** Manage Payment Frequency Component - start */

	@ValueMapValue
	private String paymentFrequencyTitle;

	@ValueMapValue
	private String paymentFrequencyDescription;
	
	@ValueMapValue
	private String paymentFrequencyAdvancedDescription;

	@ValueMapValue
	private String paymentFrequencySubHeading;

	@ValueMapValue
	private String paymentFrequencyCancelButtonText;

	@ValueMapValue
	private String paymentFrequencySaveButtonText;

	@ValueMapValue
	private String managePaymentFrequencythankYouHeading;

	@ValueMapValue
	private String managePaymentFrequencythankYouHeadingSuccessDescription;

	@ValueMapValue
	private String managePFQuoteTitle;

	@ValueMapValue
	private String managePFNextDueDate;

	@ValueMapValue
	private String managePFRepaymentAmount;

	@ValueMapValue
	private String managePFLoanEndDate;

	@ValueMapValue
	private String managePFBalloonLabel;

	@ValueMapValue
	private String managePFBalloonAmountTooltip;

	@ValueMapValue
	private String managePFAdminFee;

	/** Manage Payment Frequency Component - end */

	/** Manage Repayment Amount Component - start */

	@ValueMapValue
	private String manageRepaymentTitle;

	@ValueMapValue
	private String manageRepaymentDescription;

	@ValueMapValue
	private String manageRepaymentSubHeading;

	@ValueMapValue
	private String manageRepaymentInputPlaceholder;

	@ValueMapValue
	private String manageRepaymentCancelButtonText;

	@ValueMapValue
	private String manageRepaymentSaveButtonText;

	@ValueMapValue
	private String manageRepaymentSuccessTitle;

	@ValueMapValue
	private String manageRepaymentSuccessDescription;

	/** Manage Repayment Amount Component - end */

	@JsonIgnore
	private String json;

	@PostConstruct
	protected void init() {
		this.json = new GsonBuilder().create().toJson(this);
	}

	public String getPaymentSummaryLabelText() {
		return paymentSummaryLabelText;
	}

	public String getOutstandingBalanceLabelText() {
		return outstandingBalanceLabelText;
	}

	public String getOutstandingBalanceDisclaimerLabelText() {
		return outstandingBalanceDisclaimerLabelText;
	}

	public String getArrearsAmountLabelText() {
		return arrearsAmountLabelText;
	}

	public String getArrearsAmountDisclaimerLabelText() {
		return arrearsAmountDisclaimerLabelText;
	}

	public String getAdvanceAmountLabelText() {
		return advanceAmountLabelText;
	}

	public String getAdvanceAmountDisclaimerLabelText() {
		return advanceAmountDisclaimerLabelText;
	}

	public String getNominatedPaymentMethodLabelText() {
		return nominatedPaymentMethodLabelText;
	}

	public String getPaymentFrequencyLabelText() {
		return paymentFrequencyLabelText;
	}

	public String getPaymentFrequencyDisclaimerText() {
		return paymentFrequencyDisclaimerText;
	}

	public String getPaymentFrequencyDueDateLabelText() {
		return paymentFrequencyDueDateLabelText;
	}

	public String getRepaymentAmountLabelText() {
		return repaymentAmountLabelText;
	}

	public String getRepaymentAmountDisclaimerLabelText() {
		return repaymentAmountDisclaimerLabelText;
	}

	public String getNextDueDateLabelText() {
		return nextDueDateLabelText;
	}

	public String getNextRepaymentAmountLabelText() {
		return nextRepaymentAmountLabelText;
	}

	public String getNextRepaymentAmountDisclaimerLabelText() {
		return nextRepaymentAmountDisclaimerLabelText;
	}

	public String getAddManageBankAccountButtonText() {
		return addManageBankAccountButtonText;
	}

	public String getManageBankAccountTitle() {
		return manageBankAccountTitle;
	}

	public String getTableTitle1() {
		return tableTitle1;
	}

	public String getTableTitle2() {
		return tableTitle2;
	}

	public String getTableTitle3() {
		return tableTitle3;
	}

	public String getTableTitle4() {
		return tableTitle4;
	}

	public String getAddBankAccountText() {
		return addBankAccountText;
	}

	/** Payment Summary Next Due Date Component - start */

	public String getNextDueDateTitle() {
		return nextDueDateTitle;
	}

	public String getNextDueDateDescriptionArrears() {
		return nextDueDateDescriptionArrears;
	}

	public String getNextDueDateDescriptionAdvance() {
		return nextDueDateDescriptionAdvance;
	}

	public String getNextDueDateCalendarSubheading() {
		return nextDueDateCalendarSubheading;
	}

	public String getNextDueDateCloseButtonText() {
		return nextDueDateCloseButtonText;
	}

	public String getNextDueDateCancelButtonText() {
		return nextDueDateCancelButtonText;
	}

	public String getNextDueDateSaveButtonText() {
		return nextDueDateSaveButtonText;
	}

	public String getNextDueDateQuoteTitle() {
		return nextDueDateQuoteTitle;
	}

	public String getNextDueDateChangeLabel() {
		return nextDueDateChangeLabel;
	}

	public String getNextDueDateEndDateLabel() {
		return nextDueDateEndDateLabel;
	}

	public String getNextDueDateBalloonLabel() {
		return nextDueDateBalloonLabel;
	}

	public String getNextDueDateBalloonTooltip() {
		return nextDueDateBalloonTooltip;
	}

	/** Payment Summary Next Due Date Component - end */

	/** Add / Edit Bank Account Component - start */

	public String getAddBankAccountTitle() {
		return addBankAccountTitle;
	}

	public String getEditBankAccountTitle() {
		return editBankAccountTitle;
	}

	public String getAccountNameFieldLabel() {
		return accountNameFieldLabel;
	}

	public String getBsbNumberFieldLabel() {
		return bsbnumberFieldLabel;
	}

	public String getAccountNumberFieldLabel() {
		return accountNameFieldLabel;
	}

	public String getAddEditSectionCancelButtonText() {
		return addEditSectionCancelButtonText;
	}

	public String getAddBankAccountSaveButtonText() {
		return addBankAccountSaveButtonText;
	}

	public String getEditBankAccountSaveButtonText() {
		return editBankAccountSaveButtonText;
	}

	public String getThankYouHeading() {
		return thankYouHeading;
	}

	public String getAddBankAccountSuccessDescription() {
		return addBankAccountSuccessDescription;
	}

	public String getEditBankAccountSuccessDescription() {
		return editBankAccountSuccessDescription;
	}

	/** Add / Edit Bank Account Component - end */

	/** Delete Bank Account Component - start */

	public String getDeleteBankAccountTitle() {
		return deleteBankAccountTitle;
	}

	public String getDeleteLinkedBankAccountDescription() {
		return deleteLinkedBankAccountDescription;
	}

	public String getDeleteOtherBankAccountDescription() {
		return deleteOtherBankAccountDescription;
	}

	public String getDeleteBankAccountRemoveButtonText() {
		return deleteBankAccountRemoveButtonText;
	}

	public String getDeleteBankAccountCancelButtonText() {
		return deleteBankAccountCancelButtonText;
	}

	public String getDeleteBankAccountSuccessTitle() {
		return deleteBankAccountSuccessTitle;
	}

	public String getDeleteBankAccountSuccessDescription() {
		return deleteBankAccountSuccessDescription;
	}

	/** Delete Bank Account Component - end */

	/** Payment Method */
	public String getPaymentMethodTitle() {
		return paymentMethodTitle;
	}

	public String getPaymentMethodDescription() {
		return paymentMethodDescription;
	}

	public String getLeftToggle() {
		return leftToggle;
	}

	public String getRightToggle() {
		return rightToggle;
	}

	public String getEftTitle() {
		return eftTitle;
	}

	public String getBsbNumber() {
		return bsbNumber;
	}

	public String getAccountNumber() {
		return accountNumber;
	}

	public String getBpayTitle() {
		return bpayTitle;
	}

	public String getBillerCode() {
		return billerCode;
	}

	public String getRefNumber() {
		return refNumber;
	}

	public String getSirectDebitSelect() {
		return directDebitSelect;
	}

	public String getPaymentMethodDirectDebitPlaceholderText() {
		return paymentMethodDirectDebitPlaceholderText;
	}

	public String getPaymentMethodAddManageBAButtonText() {
		return paymentMethodAddManageBAButtonText;
	}

	public String getSubmitButtonText() {
		return submitButtonText;
	}

	public String getPaymentMethodCancelButtonText() {
		return paymentMethodCancelButtonText;
	}

	public String getSuccessModalHeading() {
		return successModalHeading;
	}

	public String getSuccessModalDescription() {
		return successModalDescription;
	}

	public String getPaymentMethodDiscalimer() {
		return paymentMethodDiscalimer;
	}

	/** Payment Method End */

	/** Manage Payment Frequency Component - start */

	public String getPaymentFrequencyTitle() {
		return paymentFrequencyTitle;
	}

	public String getPaymentFrequencyDescription() {
		return paymentFrequencyDescription;
	}
	
	public String getPaymentFrequencyAdvancedDescription() {
		return paymentFrequencyAdvancedDescription;
	}

	public String getPaymentFrequencySubHeading() {
		return paymentFrequencySubHeading;
	}

	public String getPaymentFrequencyCancelButtonText() {
		return paymentFrequencyCancelButtonText;
	}

	public String getPaymentFrequencySaveButtonText() {
		return paymentFrequencySaveButtonText;
	}

	public String getManagePaymentFrequencythankYouHeading() {
		return managePaymentFrequencythankYouHeading;
	}

	public String getManagePaymentFrequencythankYouHeadingSuccessDescription() {
		return managePaymentFrequencythankYouHeadingSuccessDescription;
	}

	public String getManagePFQuoteTitle() {
		return managePFQuoteTitle;
	}

	public String getManagePFNextDueDate() {
		return managePFNextDueDate;
	}

	public String getManagePFRepaymentAmount() {
		return managePFRepaymentAmount;
	}

	public String getManagePFLoanEndDate() {
		return managePFLoanEndDate;
	}

	public String getManagePFBalloonLabel() {
		return managePFBalloonLabel;
	}

	public String getManagePFBalloonAmountTooltip() {
		return managePFBalloonAmountTooltip;
	}

	public String getManagePFAdminFee() {
		return managePFAdminFee;
	}

	/** Manage Payment Frequency Component - end */

	/** Manage Repayment Amount Component - start */

	public String getManageRepaymentTitle() {
		return manageRepaymentTitle;
	}

	public String getManageRepaymentDescription() {
		return manageRepaymentDescription;
	}

	public String getManageRepaymentSubHeading() {
		return manageRepaymentSubHeading;
	}

	public String getManageRepaymentInputPlaceholder() {
		return manageRepaymentInputPlaceholder;
	}

	public String getManageRepaymentCancelButtonText() {
		return manageRepaymentCancelButtonText;
	}

	public String getManageRepaymentSaveButtonText() {
		return manageRepaymentSaveButtonText;
	}

	public String getManageRepaymentSuccessTitle() {
		return manageRepaymentSuccessTitle;
	}

	public String getManageRepaymentSuccessDescription() {
		return manageRepaymentSuccessDescription;
	}

	/** Manage Repayment Amount Component - end */

	public String getJson() {
		return json;
	}
}
