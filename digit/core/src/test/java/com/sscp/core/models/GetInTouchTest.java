package com.sscp.core.models;
import com.sscp.core.services.impl.BrandvariablesValueMappingImpl;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;


import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class GetInTouchTest {
    private final AemContext context = new AemContext(ResourceResolverType.JCR_MOCK);

    @InjectMocks
    private GetInTouch getInTouchModel;
    // private GetInTouch ctawithAssetPickerModel;

    @BeforeEach
    void setup() {

        context.addModelsForClasses(GetInTouch.class);
		context.registerService(new BrandvariablesValueMappingImpl());
		context.load().json("/com/sscp/core/impl/models/GetInTouch.json",
				"/content");
		context.currentResource("/content/getInTouch");
    }

    @Test
    void testProperties() {
    	getInTouchModel = context.request().adaptTo(GetInTouch.class);
        // Test title property
        assertEquals("Get in touch", getInTouchModel.getTitle());
        
        // Test summary property
        assertEquals("For any problems or loan-related inquiries.", getInTouchModel.getSummary());
        
        // Test buttonLabel property
        assertEquals("Contact Us", getInTouchModel.getButtonLabel());
        
        // Test iconName property
        assertEquals("customer-service", getInTouchModel.getIconName());
        
        // Test ctaImagePath property
        assertEquals("/test/image.jpg", getInTouchModel.getCtaImagePath());
        
        // Test buttonPath property
        assertEquals("/", getInTouchModel.getButtonPath());
        String json = getInTouchModel.getJson();
        assertEquals(json, getInTouchModel.getJson());
    }
}
