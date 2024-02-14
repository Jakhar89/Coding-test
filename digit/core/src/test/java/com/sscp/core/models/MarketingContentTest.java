package com.sscp.core.models;
import com.day.cq.wcm.api.Page;
import com.google.common.collect.ImmutableMap;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.wrappers.ValueMapDecorator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(AemContextExtension.class)
class MarketingContentTest {
    
    private MarketingContent marketingContentModel;

    private Page page;
    private Resource resource;

    private final String marketingImagePathTextString = "/test/marketing.jpg";
    private final String lifestyleImagePathTextString = "/test/lifestyle.jpg";
    private final String marketingImageUrlTextString = "/test/test.html";

    @BeforeEach
    public void setup(AemContext context) throws Exception {

        // prepare a page with a test resource
        page = context.create().page("/content/mypage");

        resource = context.create().resource("/content/sourcedcode/home/jcr:content/marketingcontent", new ValueMapDecorator(ImmutableMap.<String, Object> of(
                "imagePickerMarketing", marketingImagePathTextString,
                "imagePickerLifestyle", lifestyleImagePathTextString,
                "marketingImageUrl", marketingImageUrlTextString
                )));
 
        // create sling model
        marketingContentModel = resource.adaptTo(MarketingContent.class);
    }

    @Test
    
    void  testCtaWithAssetPicker() {
        String marketingImagePath = marketingContentModel.getImagePickerMarketing();
        assertEquals(marketingImagePath, marketingImagePathTextString);
        
        String lifestyleImagePath = marketingContentModel.getImagePickerLifestyle();
        assertEquals(lifestyleImagePath, lifestyleImagePathTextString);

        String marketingImageUrlPath = marketingContentModel.getMarketingImageUrl();
        assertEquals(marketingImageUrlPath, marketingImageUrlTextString);
        String json = marketingContentModel.getJson();
        assertEquals(json, marketingContentModel.getJson()); 
        
    }

}
