package com.sscp.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
public class AccountStatementTest {

	@InjectMocks
	private AccountStatement accountStatement;

	private final AemContext context = new AemContext(ResourceResolverType.JCR_MOCK);

	@BeforeEach
	void setup() {
		context.addModelsForClasses(AccountStatement.class);
		context.load().json("/com/sscp/core/impl/models/accountstatements.json",
				"/content/component");
		context.currentResource("/content/component/accountStatement");
	}

	@Test
	void test(){
		accountStatement = context.request().adaptTo(AccountStatement.class);
		assertEquals("Account Statement", accountStatement.getAccountStatementTitle());
		assertEquals("Account to date", accountStatement.getAccountToDateLabel());
		assertEquals("DATE FROM", accountStatement.getDateFromLabel());
		assertEquals("Date range", accountStatement.getDateRangeLabel());
		assertEquals("Date To", accountStatement.getDateToLabel());
		assertEquals("Your statement has been downloaded", accountStatement.getDownloadedDescription());
		assertEquals("Click here to downloaded statement", accountStatement.getGeneratedDescription());
		assertEquals("Generate Statement", accountStatement.getGenerateStatementCta());
		String expectedJson = accountStatement.getJson();
		assertEquals(expectedJson, accountStatement.getJson());
		assertEquals("No Statements downloaded to preview", accountStatement.getNoStatementLabel());
		assertEquals("Statement Downloaded", accountStatement.getStatementDownloadedLabel());
		assertEquals("Statement Generated", accountStatement.getStatementGeneratedLabel());
		assertEquals("Date", accountStatement.getStatementTableHeader1());
		assertEquals("Description", accountStatement.getStatementTableHeader2());
		assertEquals("Previous Statements", accountStatement.getStatementTitle());

	}


}
