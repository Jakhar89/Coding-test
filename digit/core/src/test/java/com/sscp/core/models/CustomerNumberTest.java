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
class CustomerNumberTest {
	
	private final AemContext context = new AemContext(ResourceResolverType.JCR_MOCK);
	
	@InjectMocks
	private CustomerNumber customerNmbr;
	private Resource resource;
	
	@BeforeEach
	public void setup() throws Exception {
		resource = context.create().resource("/content/sourcedcode/home/jcr:content/customernumber", new ValueMapDecorator(ImmutableMap.<String, Object> of(
				"customerNumberTitle", "Customer number",
				"jcr:primaryType", "nt:unstructured",
				"customerNumber", "Number"
                
                )));
		customerNmbr = resource.adaptTo(CustomerNumber.class);
		
	}

	@Test
	void test() {
		assertEquals("Customer number", customerNmbr.getCustomerNumberTitle());
		assertEquals("Number", customerNmbr.getCustomerNumber());
		String json = customerNmbr.getJson();
		assertEquals(json, customerNmbr.getJson());
		
	}

}
