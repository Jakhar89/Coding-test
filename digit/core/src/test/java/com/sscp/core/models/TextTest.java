package com.sscp.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;

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
public class TextTest {
	
private final AemContext context = new AemContext(ResourceResolverType.JCR_MOCK);
	
	@InjectMocks
	private Text text;
	private Resource resource;
	
	@BeforeEach
	public void setup() throws Exception {
		resource = context.create().resource("/content/sourcedcode/home/jcr:content/text", new ValueMapDecorator(ImmutableMap.<String, Object> of(
				"jcr:primaryType", "nt:unstructured",
				"text", "Sample Text"
                
                )));
		text = resource.adaptTo(Text.class);
	}
	
	@Test
	void test() {
		assertEquals("Sample Text", text.getText());
		String json = text.getJson();
		assertEquals(json, text.getJson());
		
	}


}
