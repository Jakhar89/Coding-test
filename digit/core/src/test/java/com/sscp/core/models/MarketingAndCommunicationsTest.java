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

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class MarketingAndCommunicationsTest {
	
	@InjectMocks
	private MarketingAndCommunications marketngComm;
	
	public final AemContext context = new AemContext(ResourceResolverType.JCR_MOCK);

	@BeforeEach
	void setUp() throws Exception {
		context.addModelsForClasses(MarketingAndCommunications.class);
		context.load().json("/com/sscp/core/impl/models/marketingcomm.json",
				"/content/component");
		context.currentResource("/content/component/marketingCommunications");
	}

	@Test
	void test() {
		marketngComm = context.request().adaptTo(MarketingAndCommunications.class);
		assertEquals("Cancel", marketngComm.getCancelButtonText());
		assertEquals("I would like to receive correspondence", marketngComm.getCorrespondenceMethodDescription());
		assertEquals("Email", marketngComm.getCorrespondenceMethodEmail());
		assertEquals("Mail", marketngComm.getCorrespondenceMethodPaper());
		assertEquals("Communication preferences", marketngComm.getMarketingAndCommunicationsEditTitle());
		assertEquals("Communication preferences", marketngComm.getMarketingAndCommunicationsTitle());
		assertEquals("Please try again or contact", marketngComm.getMarketingCommunicationsErrorDescription());
		assertEquals("Sorry, we are experiencing a problem.", marketngComm.getMarketingCommunicationsErrorTitle());
		assertEquals("I would like to be informed", marketngComm.getMarketingPreferenceDescription());
		assertEquals("No", marketngComm.getMarketingPreferenceNo());
		assertEquals("Yes", marketngComm.getMarketingPreferenceYes());
		assertEquals("Save changes", marketngComm.getSaveButtonText());
		String json = marketngComm.getJson();
		assertEquals(json, marketngComm.getJson());
	}

}
