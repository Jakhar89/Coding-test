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
class LoadingOverlayTest {
    
    private LoadingOverlay loadingOverlayModel;

    private Page page;
    private Resource resource;

    private final String loadingTextString = "Loading...";
    private final String updatingTextString = "Updating...";
    private final String removingTextString = "Removing...";
    @BeforeEach
    public void setup(AemContext context) throws Exception {

        // prepare a page with a test resource
        page = context.create().page("/content/mypage");
        resource = context.create().resource("/content/sourcedcode/home/jcr:content/loadingoverlay", new ValueMapDecorator(ImmutableMap.<String, Object> of(
                "loadingText", loadingTextString,
                "updatingText", updatingTextString,
                "removingText", removingTextString
                )));
 
        // create sling model
        loadingOverlayModel = resource.adaptTo(LoadingOverlay.class);
    }

    @Test
    void  testGetLoadingText() {
        String loadingText = loadingOverlayModel.getLoadingText();
        assertEquals(loadingText, loadingTextString);
        
        String updatingText = loadingOverlayModel.getUpdatingText();
        assertEquals(updatingText, updatingTextString);
        
        String removingText = loadingOverlayModel.getRemovingText();
        assertEquals(removingText, removingTextString);
    }

}
