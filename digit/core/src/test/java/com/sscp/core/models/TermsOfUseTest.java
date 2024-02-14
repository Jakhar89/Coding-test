package com.sscp.core.models;

import static org.junit.jupiter.api.Assertions.*;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import com.google.gson.JsonArray;
import com.sscp.core.util.GlobalDataMapUtil;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class TermsOfUseTest {
	
	@InjectMocks
	private TermsOfUse termsofUse;
	private Resource resource;
	private transient SlingHttpServletRequest request;
	private transient ResourceResolver resourceResolver;
	
	private final AemContext context = new AemContext(ResourceResolverType.JCR_MOCK);

	@BeforeEach
	void setUp() throws Exception {
		context.addModelsForClasses(TermsOfUse.class);
		context.load().json("/com/sscp/core/impl/models/termsofuse.json",
				"/content/component");
		context.currentResource("/content/component/termsofUse");
	}

	@Test
	void test() {
		termsofUse = context.request().adaptTo(TermsOfUse.class);
		assertEquals(null, termsofUse);
	}

}
