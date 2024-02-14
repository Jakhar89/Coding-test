package com.sscp.core.models;

import static org.junit.jupiter.api.Assertions.*;

import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import com.sscp.core.impl.models.TransactionHistoryImpl;

import io.wcm.testing.mock.aem.builder.ContentBuilder;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class AccountDetailsTest {
	
	@InjectMocks
	private AccountDetails accDetails;
	
	private final AemContext context = new AemContext(ResourceResolverType.JCR_MOCK);
	
	@BeforeEach
	public void setup() throws Exception {
		context.addModelsForClasses(AccountDetails.class);
		ContentBuilder cntBuilder = context.create();
		context.load().json("/com/sscp/core/impl/models/accountDetails.json",
				"/content/component");
		context.currentResource("/content/component/accountDetails");
	}

	@Test
	void test() {
		accDetails = context.request().adaptTo(AccountDetails.class);
		assertEquals("Balance as of yesterday.", accDetails.getAccountCurrentBalanceCaptionText());
		assertEquals("Outstanding balance", accDetails.getAccountCurrentBalanceLabelText());
		assertEquals("Account details", accDetails.getAccountDetailsLabelText());
		assertEquals("Loan end date", accDetails.getAccountEndDateLabelText());
		assertEquals("The total amount we financed", accDetails.getAccountFinancedAmountCaptionText());
		assertEquals("Financed amount", accDetails.getAccountFinancedAmountLabelText());
		assertEquals("The minimum value of your vehicle at the end of your contract loan", accDetails.getAccountGuaranteedFutureValCaptionText());
		assertEquals("Guaranteed Future Value", accDetails.getAccountGuaranteedFutureValLabelText());
		assertEquals("Interest rate", accDetails.getAccountInterestRateLabelText());
		assertEquals("NOT NEEDED FOR MVP", accDetails.getAccountMaturityOptionLabelText());
		assertEquals("Account Months Caption", accDetails.getAccountMonthsRunCaptionText());
		assertEquals("{frequencyInterval} remaining", accDetails.getAccountMonthsRunLabelText());
		assertEquals("Borrower Name/s", accDetails.getAccountNameLabelText());
		assertEquals("Account number", accDetails.getAccountNumberLabelText());
		assertEquals("Product type", accDetails.getAccountProductTypeLabelText());
		assertEquals("Loan start date", accDetails.getAccountStartDateLabelText());
		assertEquals("Status Caption", accDetails.getAccountStatusCaptionText());
		assertEquals("Account status", accDetails.getAccountStatusLabelText());
		assertEquals("The duration of your loan in {frequencyInterval}", accDetails.getAccountTermCaptionText());
		assertEquals("Term", accDetails.getAccountTermLabelText());
		assertEquals("The expected kilometres we agreed at the start of your loan", accDetails.getAccountVehEndOdoCaptionText());
		assertEquals("Agreed end odometer", accDetails.getAccountVehEndOdoLabelText());
		assertEquals("Annual Balence Text", accDetails.getAnnualBalanceLabelText());
		assertEquals("Balloon payment", accDetails.getBalloonPaymentAmountLabelText());
		assertEquals("The amount that is due at the end of the contract", accDetails.getBalloonPaymentAmountCaptionText());
		assertEquals("Dealership name caption", accDetails.getDealershipNameCaptionText());
		assertEquals("Dealership", accDetails.getDealershipNameLabelText());
		assertEquals("View repayments", accDetails.getViewRepaymentsButtonText());
		assertNotEquals(null, accDetails.getJson());
	}

}
