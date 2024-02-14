package com.sscp.core.impl.models;

import static org.junit.jupiter.api.Assertions.*;

import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import com.sscp.core.services.impl.BrandvariablesValueMappingImpl;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class TransactionHistoryImplTest {
	
	@InjectMocks
	private TransactionHistoryImpl transHistoryImpl;
	
	private final AemContext context = new AemContext(ResourceResolverType.JCR_MOCK);
	
	@BeforeEach
	public void setup() throws Exception {
		context.addModelsForClasses(TransactionHistoryImpl.class);
		context.registerService(new BrandvariablesValueMappingImpl());
		context.load().json("/com/sscp/core/impl/models/transactionHistory.json",
				"/content/component");
		context.currentResource("/content/component/transactionHistory");
	}

	@Test
	void test() {
		transHistoryImpl = context.request().adaptTo(TransactionHistoryImpl.class);
		assertEquals("Export PDF/Print",transHistoryImpl.getExportButtonLabel());
		
		assertEquals("sscp/components/transactionhistory",transHistoryImpl.getExportedType());
		assertEquals("Search",transHistoryImpl.getFilter1());
		assertEquals("search",transHistoryImpl.getFilter1Icon());
		assertEquals("Search by description",transHistoryImpl.getFilter1Placeholder());
		assertEquals("Date From",transHistoryImpl.getFilter2());
		assertEquals("Date To",transHistoryImpl.getFilter3());
		assertEquals("Transaction Type",transHistoryImpl.getFilter4());
		assertEquals("Select Transaction Type",transHistoryImpl.getFilter4Placeholder());
		assertEquals("Filters",transHistoryImpl.getFiltersText());
		assertEquals("No Transaction Details",transHistoryImpl.getNoTransactions());
		assertEquals("Date",transHistoryImpl.getTableHeader1());
		assertEquals("Description",transHistoryImpl.getTableHeader2());
		assertEquals("Debit Amount",transHistoryImpl.getTableHeader3());
		assertEquals("Credit Amount",transHistoryImpl.getTableHeader4());
		assertEquals("Transaction Period",transHistoryImpl.getTransactionPeriodText());
		assertEquals("Transactions History",transHistoryImpl.getTransactionTitle());
		assertNotEquals(null,transHistoryImpl.getTransactionTypes());
		assertEquals("Account Number",transHistoryImpl.getAccountNumberText());
		assertEquals(null,transHistoryImpl.getGlobalConfig());
	}
}
