package com.sscp.core.mock;

import com.google.common.collect.ImmutableMap;
import com.sscp.core.testcontext.AppAemContext;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class JcrResourceResolverTest {
    private static final ImmutableMap<String, Object> PROPERTIES =
            ImmutableMap.of("resource.resolver.mapping", ArrayUtils.toArray(
                    "/:/",
                    "/content/sscp/showcase\\.html</",
                    "/content/sscp/showcase/(.+)\\.html</$1"
            ));

    private final AemContext context = AppAemContext.newAemContext(PROPERTIES);

    @Test
    void testShortExtensionlessMappings() {
        final ResourceResolver resourceResolver = this.context.resourceResolver();
        
        final String defaultLocaleRoot = resourceResolver.map("/content/sscp/showcase.html");
        assertEquals("/", defaultLocaleRoot);

        final String defaultLocalePath = resourceResolver.map("/content/sscp/showcase/terms-of-use.html");
        assertEquals("/terms-of-use", defaultLocalePath);

        final String qsParams = resourceResolver.map("/content/sscp/showcase/terms-of-use.html?foo=bar");
        assertEquals("/terms-of-use?foo=bar", qsParams);
    }
}
