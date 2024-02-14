package com.sscp.core.support.sightly;

import com.adobe.granite.ui.clientlibs.ClientLibrary;
import com.adobe.granite.ui.clientlibs.HtmlLibraryManager;
import com.adobe.granite.ui.clientlibs.LibraryType;
import com.sscp.core.testcontext.AppAemContext;
import com.sscp.core.testcontext.mocks.MockHtmlLibraryManager;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.api.scripting.SlingScriptHelper;
import org.apache.sling.testing.resourceresolver.MockResourceResolverFactory;
import org.apache.sling.xss.XSSAPI;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.script.Bindings;

import static com.sscp.core.testcontext.mocks.MockHtmlLibraryManager.LIB_PATH;
import static org.mockito.Mockito.*;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class ClientLibUseObjectTest {
    private final AemContext context = AppAemContext.newAemContext();

    @Mock(lenient = true)
    private Bindings mockBindings;
    @Mock
    private ClientLibrary mockClientLibrary;
    @Mock
    private Resource mockResource;
    @Mock
    private SlingScriptHelper mockSlingScriptHelper;
    @Mock
    private SlingHttpServletRequest mockSlingHttpServletRequest;
    @Mock
    private XSSAPI mockXSSAPI;

    private ResourceResolver mockResourceResolver;

    protected ClientLibUseObject clientLibUseObject;

    @BeforeEach
    void setUp() {
        context.registerService(ResourceResolverFactory.class, new MockResourceResolverFactory());
        context.registerService(HtmlLibraryManager.class, new MockHtmlLibraryManager());

        clientLibUseObject = new ClientLibUseObject();

        ResourceResolverFactory mockResolverFactory = context.getService(ResourceResolverFactory.class);

        mockResourceResolver = context.resourceResolver();

        reset(mockClientLibrary);

        when(mockBindings.get("categories")).thenReturn("test.clientlib");
        when(mockBindings.get("sling")).thenReturn(mockSlingScriptHelper);
        when(mockBindings.get("request")).thenReturn(mockSlingHttpServletRequest);
        when(mockBindings.get("resource")).thenReturn(mockResource);

        lenient().when(mockSlingScriptHelper.getService(ResourceResolverFactory.class))
                .thenReturn(mockResolverFactory);

        lenient().when(mockSlingScriptHelper.getService(HtmlLibraryManager.class))
                .thenReturn(context.getService(HtmlLibraryManager.class));

        lenient().when(mockSlingScriptHelper.getService(XSSAPI.class)).thenReturn(mockXSSAPI);

        lenient().when(mockSlingHttpServletRequest.getResourceResolver()).thenReturn(mockResourceResolver);

        lenient().when(mockClientLibrary.getPath()).thenReturn(LIB_PATH);
    }

    @Test
    @DisplayName("should return an 'async' attribute")
    void testJsAsyncAttribute() {
        when(mockBindings.get("loading")).thenReturn("async");

        clientLibUseObject.init(mockBindings);

        Assertions.assertEquals(" async",
                clientLibUseObject.getLibraryTypeAttributes(mockClientLibrary, LibraryType.JS).toString());
    }

    @Test
    @DisplayName("should return an 'defer' attribute")
    void testJsDeferAttribute() {
        when(mockBindings.get("loading")).thenReturn("defer");

        clientLibUseObject.init(mockBindings);

        Assertions.assertEquals(" defer",
                clientLibUseObject.getLibraryTypeAttributes(mockClientLibrary, LibraryType.JS).toString());
    }

    @Test
    @DisplayName("should return an 'onload' attribute")
    void testJsOnLoadAttribute() {
        when(mockBindings.get("onload")).thenReturn("test");

        lenient().when(mockXSSAPI.encodeForHTMLAttr("test")).thenReturn("test");

        clientLibUseObject.init(mockBindings);

        Assertions.assertEquals(" onload=\"test\"",
                clientLibUseObject.getLibraryTypeAttributes(mockClientLibrary, LibraryType.JS).toString());
    }

    @Test
    @DisplayName("should return a 'crossorigin' attribute with 'anonymous' value for CSS")
    void testCrossOriginCssAttributes() {
        when(mockBindings.get("crossorigin")).thenReturn("anonymous");

        clientLibUseObject.init(mockBindings);

        Assertions.assertEquals(" crossorigin=\"anonymous\"",
                clientLibUseObject.getLibraryTypeAttributes(mockClientLibrary, LibraryType.CSS).toString());
    }

    @Test
    @DisplayName("can generate clientlib includes using aem vite")
    void testCanGenerateIncludes() {
        when(mockBindings.get("prefetch")).thenReturn(false);
        when(mockBindings.get("mode")).thenReturn("js");

        clientLibUseObject.init(mockBindings);

        Assertions.assertEquals(
                "<script src=\"/etc.clientlibs/testing/clientlibs/test.js\"></script>\n",
                clientLibUseObject.include());
    }

    @Test
    @DisplayName("can generate prefetch clientlib includes")
    void testCanGeneratePrefetchIncludes() {
        when(mockBindings.get("categories")).thenReturn("test.clientlib");
        when(mockBindings.get("prefetch")).thenReturn(true);
        when(mockBindings.get("mode")).thenReturn("js");

        context.create().resource(LIB_PATH, "prefetch", true);

        clientLibUseObject.init(mockBindings);

        Assertions.assertEquals(
            "<link rel=\"prefetch\" href=\"/etc.clientlibs/testing/clientlibs/test.js\" as=\"script\" crossorigin=\"anonymous\">\n",
            clientLibUseObject.include());
    }
}
