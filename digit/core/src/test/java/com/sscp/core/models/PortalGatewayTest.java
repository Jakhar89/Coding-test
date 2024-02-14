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
class PortalGatewayTest {
	
	@InjectMocks
	private PortalGateway pgWay;
	
	private final AemContext context = new AemContext(ResourceResolverType.JCR_MOCK);

	@BeforeEach
	void setUp() throws Exception {
		context.addModelsForClasses(PortalGateway.class);
		context.load().json("/com/sscp/core/impl/models/portalgateway.json",
				"/content/component");
		context.currentResource("/content/component/portalGateway");
	}

	@Test
	void test() {
		pgWay = context.request().adaptTo(PortalGateway.class);
		assertEquals("Go to my portal", pgWay.getButtonLabel());
		String json = pgWay.getJson();
		assertEquals(json, pgWay.getJson());
		assertEquals("https://stage.toyotafinanceonline.com.au/", pgWay.getMyPortalAlfaUri());
		assertEquals("https://www.toyota.com.au/", pgWay.getMyPortalLtUri());
		assertEquals("Surname", pgWay.getSurnameLabel());
		assertEquals("Enter your surname", pgWay.getSurnamePlaceholderText());
		assertEquals("Enter your vehicle registration", pgWay.getVehicleRegoNoPlaceholderText());
		assertEquals("Vehicle Registration Number", pgWay.getVehicleRegoNumberLabel());
	}

}
