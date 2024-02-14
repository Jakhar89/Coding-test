package com.sscp.core.models;

import static org.junit.jupiter.api.Assertions.*;

import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import com.google.gson.JsonArray;
import com.sscp.core.services.impl.BrandvariablesValueMappingImpl;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class DisputeProcessComponentTest {
	
	@InjectMocks
	private DisputeProcessComponent disputeProc;
	
	private final AemContext context = new AemContext(ResourceResolverType.JCR_MOCK);
	
	@BeforeEach
	public void setup() throws Exception {
		context.addModelsForClasses(DisputeProcessComponent.class);
		context.registerService(new BrandvariablesValueMappingImpl());
		context.load().json("/com/sscp/core/impl/models/disputeComponent.json",
				"/content/component");
		context.currentResource("/content/component/disputecomp");
	}

	@Test
	void test() {
		disputeProc = context.request().adaptTo(DisputeProcessComponent.class);
		JsonArray list = disputeProc.getDisputeComponentPropertyList();
		String json = disputeProc.getJson();
		assertEquals(list, disputeProc.getDisputeComponentPropertyList());
		assertEquals("For more information please refer Complaints Policy", disputeProc.getInfoDisclaimer());
		assertEquals(json, disputeProc.getJson());
		assertEquals(null, disputeProc.getResource());
	}

}
