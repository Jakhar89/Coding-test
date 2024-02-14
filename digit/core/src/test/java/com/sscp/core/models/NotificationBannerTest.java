package com.sscp.core.models;

import static org.junit.jupiter.api.Assertions.*;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.wrappers.ValueMapDecorator;
import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.common.collect.ImmutableMap;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class NotificationBannerTest {
	
	private final AemContext context = new AemContext(ResourceResolverType.JCR_MOCK);
	
	@InjectMocks
	private NotificationBanner nBanner;
	private Resource resource;
	
	private String notificationIdString = "idText";
	private Boolean isNotificationHasNoLimitString = true;
	private String notificationTypeString = "notifyType";
	private String notificationDescriptionString = "description to notify";
	private String bannerJson = "{\"notificationId\":\"idText\",\"isNotificationHasNoLimit\":true,\"notificationType\":\"notifyType\",\"notificationDescription\":\"description to notify\"}";

	@JsonIgnore
	private String json;
	
	@BeforeEach
	public void setup() throws Exception {
		resource = context.create().resource("/content/sourcedcode/home/jcr:content/messagebox", new ValueMapDecorator(ImmutableMap.<String, Object> of(
                "notificationId", notificationIdString,
                "isNotificationHasNoLimit", isNotificationHasNoLimitString,
                "notificationType", notificationTypeString,
                "notificationDescription", notificationDescriptionString
                
                )));
		nBanner = resource.adaptTo(NotificationBanner.class);
		
	}

	@Test
	void testAllObjects() {
		
		assertEquals(notificationIdString, nBanner.getNotificationId());
		assertEquals(true, nBanner.getIsNotificationHasNoLimit());
		assertEquals(notificationTypeString, nBanner.getNotificationType());
		assertEquals(notificationDescriptionString, nBanner.getNotificationDescription());
		assertEquals(bannerJson, nBanner.getJson());
		
	}

}
