package com.sscp.core.filters;

import com.sscp.core.support.services.CharResponseWrapper;
import com.sscp.core.testcontext.AppAemContext;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import junitx.util.PrivateAccessor;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import uk.org.lidalia.slf4jext.Level;
import uk.org.lidalia.slf4jtest.LoggingEvent;
import uk.org.lidalia.slf4jtest.TestLogger;
import uk.org.lidalia.slf4jtest.TestLoggerFactory;

import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class HtmlCompressionFilterTest {
    private final AemContext context = AppAemContext.newAemContext();
    private final Map<String, Object> parameters = new HashMap<>();

    @Mock
    SlingHttpServletRequest request;
    @Mock
    SlingHttpServletResponse response;
    @Mock
    Resource resource;
    @Mock
    FilterChain chain;

    @InjectMocks
    @Spy
    CharResponseWrapper responseWrapper;
    @InjectMocks
    @Spy
    HtmlCompressionFilter fixture = new HtmlCompressionFilter();

    private final TestLogger logger = TestLoggerFactory.getTestLogger(fixture.getClass());

    PrintWriter responseWriter;
    StringWriter stringWriter;

    @BeforeEach
    void setUp() throws Exception {
        TestLoggerFactory.clear();

        parameters.clear();
        parameters.put("enabled", false);
        parameters.put("paths", new String[]{});

        stringWriter = new StringWriter();
        responseWriter = new PrintWriter(stringWriter);

        lenient().when(fixture.createResponseWrapper(response)).thenReturn(responseWrapper);

        when(request.getResource()).thenReturn(resource);
        when(response.getWriter()).thenReturn(responseWriter);
    }

    @AfterEach
    void tearDown() {
        reset(request, response, chain, responseWrapper);
    }

    @Test
    @DisplayName("can run init and destroy")
    void testCanInitAndDestroy() {
        fixture.init(mock(FilterConfig.class));
        fixture.destroy();

        List<LoggingEvent> events = logger.getLoggingEvents();

        assertEquals(2, events.size());
        assertEquals(Level.INFO, events.get(0).getLevel());
        assertEquals(Level.INFO, events.get(1).getLevel());
    }

    @Test
    @DisplayName("invalid request triggers the default response handler")
    void testInvalidRequestTriggersDefaultHandler() throws ServletException, IOException {
        fixture.doFilter(null, response, chain);

        verify(chain, times(1)).doFilter(null, response);
        verifyNoMoreInteractions(chain);
    }

    @Test
    @DisplayName("compression is disabled")
    void testCompressionDisabled() throws NoSuchFieldException {
        context.registerInjectActivateService(fixture, parameters);

        assertEquals(Boolean.FALSE, PrivateAccessor.getField(fixture, "compressionEnabled"));
    }

    @Test
    @DisplayName("compression is enabled")
    void testCompressionEnabled() throws NoSuchFieldException {
        parameters.put("enabled", Boolean.TRUE);
        context.registerInjectActivateService(fixture, parameters);

        assertEquals(Boolean.TRUE, PrivateAccessor.getField(fixture, "compressionEnabled"));
    }

    @Test
    @DisplayName("no compression paths are defined")
    void testCompressionPathsEmpty() throws NoSuchFieldException {
        context.registerInjectActivateService(fixture, parameters);

        assertEquals(0, ((String[]) PrivateAccessor.getField(fixture, "compressionPaths")).length);
    }

    @Test
    @DisplayName("one compression path is defined")
    void testCompressionPathExists() throws NoSuchFieldException {
        parameters.put("paths", new String[]{"/content/compression-test"});
        context.registerInjectActivateService(fixture, parameters);

        assertEquals(1, ((String[]) PrivateAccessor.getField(fixture, "compressionPaths")).length);
    }

    @Test
    @DisplayName("the default response handler is used")
    void testDefaultResponse() throws IOException, ServletException {
        context.registerInjectActivateService(fixture, parameters);
        fixture.doFilter(request, response, chain);

        verify(chain, times(1)).doFilter(request, response);
        verifyNoMoreInteractions(chain);
    }

    @Test
    @DisplayName("the default response handler is used when enabled but no matching paths")
    void testCompressionEnabledAndNoMatchingPaths() throws IOException, ServletException {
        parameters.put("enabled", Boolean.TRUE);

        when(resource.getPath()).thenReturn("/content/compression-test");

        context.registerInjectActivateService(fixture, parameters);
        fixture.doFilter(request, response, chain);

        verify(chain, times(1)).doFilter(request, response);
        verifyNoMoreInteractions(chain);
    }

    @Test
    @DisplayName("the response is compressed when enabled and has matching paths")
    void testCompressionEnabledAndMatchingPaths() throws IOException, ServletException {
        parameters.put("enabled", Boolean.TRUE);
        parameters.put("paths", new String[]{"/content/compression-test"});

        when(resource.getPath()).thenReturn("/content/compression-test");
        when(responseWrapper.toString()).thenReturn(getTestHtml("input.html"));

        assertNotNull(responseWrapper);

        context.registerInjectActivateService(fixture, parameters);
        fixture.doFilter(request, response, chain);

        assertEquals(getTestHtml("output.html"), stringWriter.toString());

        verify(chain, times(1)).doFilter(request, responseWrapper);
        verify(response, times(1)).getWriter();
        verifyNoMoreInteractions(chain, response);
    }

    private String getTestHtml(String filename) {
        InputStream inputStream = HtmlCompressionFilterTest.class.getResourceAsStream(
                String.format("/compression-test/%s", filename));
        assertNotNull(inputStream);

        BufferedReader bufferedReader = new BufferedReader(
                new InputStreamReader(inputStream, StandardCharsets.UTF_8));

        return bufferedReader.lines().collect(Collectors.joining("\n"));
    }
}
