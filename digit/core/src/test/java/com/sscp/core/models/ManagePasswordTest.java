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

import com.google.common.collect.ImmutableMap;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class ManagePasswordTest {
	
private final AemContext context = new AemContext(ResourceResolverType.JCR_MOCK);
	
	@InjectMocks
	private ManagePassword mngPaswrd ;
	private Resource resource;

	@BeforeEach
	void setUp() throws Exception {
		resource = context.create().resource("/content/sourcedcode/home/jcr:content/customernumber", new ValueMapDecorator(ImmutableMap.<String, Object> of(
				"managePasswordTitle", "Manage password",
				"jcr:primaryType", "nt:unstructured",
				"saveButtonText", "Save Changes",
				"cancelButtonText", "Cancel",
				"passwordText", "Password"
                
                )));
		mngPaswrd = resource.adaptTo(ManagePassword.class);
	}

	@Test
	void test() {
		assertEquals("Cancel", mngPaswrd.getCancelButtonText());
		String json = mngPaswrd.getJson();
		assertEquals(json, mngPaswrd.getJson());
		assertEquals("Manage password", mngPaswrd.getManagePasswordTitle());
		assertEquals("Password", mngPaswrd.getPasswordText());
		assertEquals("Save Changes", mngPaswrd.getSaveButtonText());
	}

}
