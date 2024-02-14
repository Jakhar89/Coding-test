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
class CardComponentTest {
	
	@InjectMocks
	private CardComponent cardComponent;
	
	private final AemContext context = new AemContext(ResourceResolverType.JCR_MOCK);
	
	@BeforeEach
	public void setup() throws Exception {
		context.addModelsForClasses(CardComponent.class);
		context.registerService(new BrandvariablesValueMappingImpl());
		context.load().json("/com/sscp/core/impl/models/cardComponent.json", "/content/component");
		context.currentResource("/content/component/cardComponent");
	}

	@Test
	void test() {
		cardComponent = context.request().adaptTo(CardComponent.class);
		String card1ImagePath = cardComponent.getCard1ImagePath();
		assertEquals("/content/sscp/co", cardComponent.getCard1CtaPath());
		assertEquals("Button Label", cardComponent.getCard1CtaLabel());
		assertEquals("Description", cardComponent.getCard1Description());
		assertEquals(card1ImagePath, cardComponent.getCard1ImagePath());
		assertEquals("Title", cardComponent.getCard1Title());
		assertEquals("Button Label", cardComponent.getCard2CtaLabel());
		assertEquals("/content/sscp/co", cardComponent.getCard2CtaPath());
		assertEquals("Description", cardComponent.getCard2Description());
		assertEquals("/content/dam/sscp/logos", cardComponent.getCard2ImagePath());
		assertEquals("Title", cardComponent.getCard2Title());
		JsonArray containereList = cardComponent.getCardContainerList();
		assertEquals(containereList, cardComponent.getCardContainerList());
		String json = cardComponent.getJson();
		assertEquals(json, cardComponent.getJson());
		assertEquals(null, cardComponent.getResource());
       	}
}


