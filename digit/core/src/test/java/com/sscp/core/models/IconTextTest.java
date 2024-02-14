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
import com.google.gson.JsonArray;

import io.wcm.testing.mock.aem.builder.ContentBuilder;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class IconTextTest {
	
private final AemContext context = new AemContext(ResourceResolverType.JCR_MOCK);
	
	@InjectMocks
	private IconText iconT;
	private Resource resource;

	@BeforeEach
	void setUp() throws Exception {
		context.addModelsForClasses(IconText.class);
		ContentBuilder cntBuilder = context.create();
		context.load().json("/com/sscp/core/impl/models/icontext.json",
				"/content/component");
		context.currentResource("/content/component/iconText");
	}

	@Test
	void test() {
		iconT = context.request().adaptTo(IconText.class);
		JsonArray typelist = iconT.getEnquiryTypeList();
		String json = iconT.getJson();
		assertEquals(json, iconT.getJson());
		assertEquals(typelist, iconT.getEnquiryTypeList());
		//fail("Not yet implemented");
	}

}
