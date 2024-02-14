package com.sscp.core.impl.models;

import static org.junit.jupiter.api.Assertions.*;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.wrappers.ValueMapDecorator;
import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import com.day.cq.wcm.api.Page;
import com.google.common.collect.ImmutableMap;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class HelloWorldImplTest {
	
	private final AemContext context = new AemContext(ResourceResolverType.JCR_MOCK);
	
	private String msg = "Hello World!\n"
            + "Resource type is: No resourceType\n"
            + "Current page is:  \n";
	
	@InjectMocks
	private HelloWorldImpl helloWorld;
	
	private Page page;
	private Resource resource;
	
	@BeforeEach
	public void setup() throws Exception {
		page = context.create().page("/content/mypage");
		resource = context.create().resource("/content/sourcedcode/home/jcr:content/helloWorld", new ValueMapDecorator(ImmutableMap.<String, Object> of(
                "message", msg
                )));
		helloWorld = resource.adaptTo(HelloWorldImpl.class);
		}

	@Test
	void testGetMessage() {
		String testMsg = helloWorld.getMessage();
		assertEquals(msg, testMsg);
		
	}

}
