package com.sscp.core.filters;

import com.sscp.core.support.services.CharResponseWrapper;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.jackrabbit.oak.commons.PropertiesUtil;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.servlets.annotations.SlingServletFilter;
import org.apache.sling.servlets.annotations.SlingServletFilterScope;
import org.apache.sling.servlets.annotations.SlingServletName;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.propertytypes.ServiceDescription;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

import javax.servlet.*;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;

@Slf4j
@Component(immediate = true)
@SlingServletName(servletName = "HTML Compression Filter")
@ServiceDescription("Compress the page response for the configured content paths.")
@SlingServletFilter(scope = SlingServletFilterScope.REQUEST)
@Designate(ocd = HtmlCompressionFilter.Configuration.class)
public class HtmlCompressionFilter implements Filter {
    @ObjectClassDefinition(
            name = "Accelerator - HTML Compression Filter",
            description = "Compress the content response for the provided paths."
    )
    public @interface Configuration {
        @AttributeDefinition(
                description = "Enable or disable HTML response compression.",
                name = "Enable Compression",
                type = AttributeType.BOOLEAN
        )
        boolean enabled() default false;

        @AttributeDefinition(
                description = "Please enter the paths where you need to compress the content response.",
                name = "Content Paths"
        )
        String[] paths() default {};
    }

    private boolean compressionEnabled;
    private String[] compressionPaths;

    @Activate
    protected void activate(final Configuration properties) {
        compressionEnabled = PropertiesUtil.toBoolean(properties.enabled(), false);
        compressionPaths = PropertiesUtil.toStringArray(properties.paths());

        log.info("HTML compression filter has been activated. Paths: {}", (Object) compressionPaths);
    }

    @Override
    public void init(FilterConfig filterConfig) {
        log.info("HTML compression filter initialised.");
    }

    @Override
    public void destroy() {
        log.info("HTML compression filter has been destroyed.");
    }

    @Override
    public void doFilter(ServletRequest request,
                         ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {
        if (!(request instanceof SlingHttpServletRequest)
                || !(response instanceof SlingHttpServletResponse)) {
            chain.doFilter(request, response);

            return;
        }

        final SlingHttpServletRequest slingRequest = (SlingHttpServletRequest) request;
        final Resource resource = slingRequest.getResource();

        if (compressionEnabled && isRequestPathMatching(compressionPaths, resource.getPath())) {
            CharResponseWrapper responseWrapper = createResponseWrapper(response);
            chain.doFilter(request, responseWrapper);

            String content = responseWrapper.toString();

            content = content.replaceAll("([\\t\\n])", StringUtils.EMPTY);
            content = content.replaceAll("\\s+", " ");
            content = content.trim();

            response.getWriter().write(content);
        } else {
            chain.doFilter(request, response);
        }
    }

    public CharResponseWrapper createResponseWrapper(final ServletResponse response) {
        return new CharResponseWrapper((HttpServletResponse) response);
    }

    /**
     * Check if the given {@code requestPath} matches any of the configured paths.
     *
     * @param compressionPaths array of configured content paths
     * @param requestPath      current request path
     * @return {@code true} when matched otherwise {@code false}
     */
    public boolean isRequestPathMatching(String[] compressionPaths, String requestPath) {
        return Arrays.stream(compressionPaths).anyMatch(requestPath::startsWith);
    }
}
