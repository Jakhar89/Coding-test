package com.sscp.core.impl.models;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import com.google.gson.JsonArray;
import com.sscp.core.util.ModelUtil;

import io.wcm.testing.mock.aem.builder.ContentBuilder;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class QuickLinksComponentTest {
	
	private static final String ICON = null;

	private static final String TITLE = null;

	private static final String LINK = null;

	private static final String ISNEWTAB = null;

	private final AemContext context = new AemContext(ResourceResolverType.JCR_MOCK);

	@InjectMocks
	private QuickLinksComponentImpl quickLinksObj;
	private Resource resource;

	@BeforeEach
	public void setup() throws Exception {
		context.addModelsForClasses(QuickLinksComponentImpl.class);
		ContentBuilder cntBuilder = context.create();
		context.load().json("/com/sscp/core/impl/models/quicklinks.json",
				"/content/component");
		resource = context.currentResource("/content/component/quickLinksComp");
	}

	@Test
	void  testGetQuickLinks() {
		quickLinksObj = context.request().adaptTo(QuickLinksComponentImpl.class);
		JsonArray linksArray = ModelUtil.toJsonArray(quickLinksObj.getResource(), Arrays.asList(new String[]{ICON,TITLE,LINK,ISNEWTAB}));
		
		assertEquals(null, linksArray);
		Boolean isexist = quickLinksObj.getJson().contains("quickLinks");
		assertEquals(true, isexist); 
		JsonArray mockLinks = quickLinksObj.getQuickLinks();
		assertEquals("phone", mockLinks.get(0).getAsJsonObject().get("icon").getAsString()); 

	}

}
