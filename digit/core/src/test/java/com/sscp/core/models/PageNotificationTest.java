package com.sscp.core.models;

import static org.junit.jupiter.api.Assertions.*;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;


import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class PageNotificationTest {
	
	@InjectMocks
	private PageNotification pageNotifi;
	private Resource resource;
	
	private final AemContext context = new AemContext(ResourceResolverType.JCR_MOCK);
	
	@BeforeEach
	void setUp() throws Exception {
		context.addModelsForClasses(PageNotification.class);
		context.load().json("/com/sscp/core/impl/models/pagenotification.json",
				"/content/component");
		context.currentResource("/content/component/pageNotifi");
	}

	@Test
	void test() {
		pageNotifi = context.request().adaptTo(PageNotification.class);
		assertEquals("maintenance", pageNotifi.getIcon());
		assertEquals("accountUnlock", pageNotifi.getAnalyticsTrackEventName());
		assertEquals("click", pageNotifi.getButtonText());
		assertEquals("We’re currently conducting maintenance ", pageNotifi.getDescription());
		assertEquals(true, pageNotifi.getIsMaintainencePage());
		String json = pageNotifi.getJson();
		assertEquals(json, pageNotifi.getJson());
		assertEquals("mobile decsription", pageNotifi.getMobileDescription());
		assertEquals("Sorry, we’re down for maintenance", pageNotifi.getTitle());
		assertEquals("/content/sscp/home", pageNotifi.getButtonUrl());
	}

}
