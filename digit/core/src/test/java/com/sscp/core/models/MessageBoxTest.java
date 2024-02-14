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
class MessageBoxTest {
	
	private final AemContext context = new AemContext(ResourceResolverType.JCR_MOCK);
	
	@InjectMocks
	private MessageBox mBox;
	
	private Resource resource;
	private String json = "{'sampleMsg': 'Text For Message Box'}";
	
	@BeforeEach
	public void setup() throws Exception {
		resource = context.create().resource("/content/sourcedcode/home/jcr:content/messagebox", new ValueMapDecorator(ImmutableMap.<String, Object> of(
                "message", json
                )));
		mBox = resource.adaptTo(MessageBox.class);
	}

	@Test
	void testGetJson() {
		String testMsg = "{}";
		assertEquals(testMsg, mBox.getJson());
	}

}
