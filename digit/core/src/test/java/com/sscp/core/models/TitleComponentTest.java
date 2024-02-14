package com.sscp.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import com.sscp.core.services.impl.BrandvariablesValueMappingImpl;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
public class TitleComponentTest {
	
private final AemContext context = new AemContext(ResourceResolverType.JCR_MOCK);
	
	@InjectMocks
	private TitleComponent titleComp;
	
	@BeforeEach
	public void setup() throws Exception {
		context.addModelsForClasses(TitleComponent.class);
		context.registerService(new BrandvariablesValueMappingImpl());
		context.load().json("/com/sscp/core/impl/models/titlecomponent.json",
				"/content/component");
		context.currentResource("/content/component/titleComp");
		//titleComp = resource.adaptTo(TitleComponent.class);
	}
	
	@Test
	void test() {
		titleComp = context.request().adaptTo(TitleComponent.class);
		String json = titleComp.getJson();
		assertEquals(json, titleComp.getJson());
		
	}
	

}
