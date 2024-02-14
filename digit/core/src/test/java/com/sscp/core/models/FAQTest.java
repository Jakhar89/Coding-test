package com.sscp.core.models;

import static org.junit.jupiter.api.Assertions.*;

import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import com.google.gson.JsonArray;
import com.sscp.core.services.impl.BrandvariablesValueMappingImpl;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class FAQTest {
	
	@InjectMocks
	private FAQ faq;
	
	private final AemContext context = new AemContext(ResourceResolverType.JCR_MOCK);
	
	@BeforeEach
	public void setup() throws Exception {
		context.addModelsForClasses(FAQ.class);
		context.registerService(new BrandvariablesValueMappingImpl());
		context.load().json("/com/sscp/core/impl/models/faq.json",
				"/content/component");
		context.currentResource("/content/component/faq");
	}

	@Test
	void test() {
		faq = context.request().adaptTo(FAQ.class);
		assertEquals("Tab Name",faq.getTabNameText1());
		JsonArray typeList = faq.getFAQTypeList();
		assertEquals(typeList,faq.getFAQTypeList());
		assertEquals(null,faq.getFAQTypeList1());
		assertEquals(null,faq.getFAQTypeList2());
		assertEquals(null,faq.getFAQTypeList3());
		assertEquals(null,faq.getFAQTypeList4());
		assertEquals(null,faq.getFAQTypeList5());
		String json = faq.getJson();
		assertEquals(json,faq.getJson());
		assertEquals(null,faq.getResource());
		assertEquals("Tab Name",faq.getTabNameText2());
		assertEquals("Tab Name",faq.getTabNameText3());
		assertEquals("Tab Name",faq.getTabNameText4());
		assertEquals("Tab Name",faq.getTabNameText5());
	}

}
