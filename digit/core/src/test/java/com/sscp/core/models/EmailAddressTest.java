package com.sscp.core.models;

import static org.junit.jupiter.api.Assertions.*;

import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import io.wcm.testing.mock.aem.builder.ContentBuilder;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class EmailAddressTest {
	
	@InjectMocks
	private EmailAddress emailAdd;
	
	private final AemContext context = new AemContext(ResourceResolverType.JCR_MOCK);
	
	@BeforeEach
	public void setup() throws Exception {
		context.addModelsForClasses(EmailAddress.class);
		ContentBuilder cntBuilder = context.create();
		context.load().json("/com/sscp/core/impl/models/emailAddress.json",
				"/content/component");
		context.currentResource("/content/component/emailaddress");
	}

	@Test
	void test() {
		emailAdd = context.request().adaptTo(EmailAddress.class);
		assertEquals("Cancel", emailAdd.getCancelButtonText());
		assertEquals("Email address", emailAdd.getEmailAddressEditTitle());
		assertEquals("Email address", emailAdd.getEmailAddressLabelText());
		assertEquals("Please select which email you prefer", emailAdd.getIntroductoryText());
		assertEquals("You must set your login email", emailAdd.getLoginEmailDescription());
		assertEquals("Set as my login email", emailAdd.getLoginEmailText());
		assertEquals("Set login email", emailAdd.getLoginEmailTitle());
		assertEquals("Personal", emailAdd.getPersonalLabelText());
		assertEquals("Please select your preferred contact email", emailAdd.getPreferredContactDescription());
		assertEquals("Preferred contact email", emailAdd.getPreferredContactTitle());
		assertEquals("Save changes", emailAdd.getSaveButtonText());
		assertEquals("Work", emailAdd.getWorkLabelText());
		assertNotEquals(null, emailAdd.getJson());
		assertEquals("Login", emailAdd.getLoginLabelText());
	}

}
