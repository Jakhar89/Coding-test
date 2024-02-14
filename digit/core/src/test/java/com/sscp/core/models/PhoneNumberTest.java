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
class PhoneNumberTest {
	
	@InjectMocks
	private PhoneNumber phNum;
	
	private final AemContext context = new AemContext(ResourceResolverType.JCR_MOCK);

	@BeforeEach
	void setUp() throws Exception {
		context.addModelsForClasses(PhoneNumber.class);
		context.load().json("/com/sscp/core/impl/models/phnNumber.json",
				"/content/component");
		context.currentResource("/content/component/phnNumb");
	}

	@Test
	void test() {
		phNum = context.request().adaptTo(PhoneNumber.class);
		assertEquals("Cancel", phNum.getCancelButtonText());
		assertEquals("Home", phNum.getHomeLabelText());
		String json = phNum.getJson();
		assertEquals(json, phNum.getJson());
		assertEquals("Other", phNum.getOtherLabelText());
		assertEquals("Mobile", phNum.getMobileLabelText());
		assertEquals("Phone number", phNum.getPhoneNumberEditTitle());
		assertEquals("Phone number", phNum.getPhoneNumberTitle());
		assertEquals("Preferred contact number", phNum.getPreferredContactDescription());
		assertEquals("Preferred contact number", phNum.getPreferredContactTitle());
		assertEquals("Save changes", phNum.getSaveButtonText());
		assertEquals("Work", phNum.getWorkLabelText());
		
	}

}
