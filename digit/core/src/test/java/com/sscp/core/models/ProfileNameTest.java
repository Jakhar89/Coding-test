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
class ProfileNameTest {
	
private final AemContext context = new AemContext(ResourceResolverType.JCR_MOCK);
	
	@InjectMocks
	private ProfileName prflName;
	private Resource resource;

	@BeforeEach
	void setUp() throws Exception {
		resource = context.create().resource("/content/sourcedcode/home/jcr:content/profilename", new ValueMapDecorator(ImmutableMap.<String, Object> of(
				"givenName", "Given name",
				"title", "Title",
				"profileNameTitle", "Your name",
				"familyName", "Family name",
				"middleName", "Middle name"
                
                )));
		prflName = resource.adaptTo(ProfileName.class);
	}

	@Test
	void test() {
		assertEquals("Family name", prflName.getFamilyName());
		assertEquals("Given name", prflName.getGivenName());
		String json = prflName.getJson();
		assertEquals(json, prflName.getJson());
		assertEquals("Middle name", prflName.getMiddleName());
		assertEquals("Your name", prflName.getProfileNameTitle());
		assertEquals("Title", prflName.getTitle());
	}

}
