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
class AccountSummaryTest {
	
	@InjectMocks
	private AccountSummary accSummary;
	
private final AemContext context = new AemContext(ResourceResolverType.JCR_MOCK);
	
	@BeforeEach
	public void setup() throws Exception {
		context.addModelsForClasses(AccountSummary.class);
		ContentBuilder cntBuilder = context.create();
		context.load().json("/com/sscp/core/impl/models/accountsummary.json",
				"/content/component");
		context.currentResource("/content/component/accountSummary");
	}

	@Test
	void test() {
		accSummary = context.request().adaptTo(AccountSummary.class);
		assertEquals("Balance", accSummary.getBalance());
		assertEquals("SEE ALL TRANSACTIONS", accSummary.getButtonLabel());
		assertEquals("/content/sscp/blueprint/homepage/transaction-history", accSummary.getButtonLink());
		assertEquals("Date", accSummary.getDate());
		assertNotEquals(null, accSummary.getJson());
		assertEquals("Term progress", accSummary.getLoanProgressTitle());
		assertEquals("Next repayment due", accSummary.getNextRepaymentDueTitle());
		assertEquals("No transaction details", accSummary.getNoTransactionsText());
		assertEquals("Outstanding balance", accSummary.getOutstandingBalanceTitle());
		assertEquals("Balance as of yesterday, which does not include future interest", accSummary.getOutstandingBalanceTooltip());
		assertEquals("Paid to date", accSummary.getPaidToDateTitle());
		assertEquals("Paid to date, as of yesterday", accSummary.getPaidToDateTooltip());
		assertEquals("Payment Amount", accSummary.getPaymentAmount());
		assertEquals("Recent transactions", accSummary.getRecentTransactionsTitle());
		assertEquals("Recent transactions are shown as of yesterday.", accSummary.getRecentTransactionsTooltip());
		assertEquals(null, accSummary.getActionMenuList());
	}

}
