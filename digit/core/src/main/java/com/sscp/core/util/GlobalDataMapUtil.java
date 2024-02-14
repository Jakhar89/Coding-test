package com.sscp.core.util;

import com.google.gson.JsonArray;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;

import java.util.Arrays;
/**
 * GlobalDataMapUtil Utility
 */
public class GlobalDataMapUtil {
    private static final String ERROR_CODE = "errorCode";
    private static final String ERROR_MESSAGE = "errorMessage";
    private static final String HOMEPAGE = "/homepage";
    private static final String SSCP_PAGE = "/sscp/";
    private static final String SHOWCASE = "/showcase";
    private static final String JCR_CONTENT = "/jcr:content";
    private static final String ERROR_MAP_PATH = "/jcr:content/errorMap";

    public static JsonArray getErrorMap(ResourceResolver resourceResolver, SlingHttpServletRequest request) {
        Resource resource = getPagePathResource(resourceResolver, request, ERROR_MAP_PATH);
        return ModelUtil.toJsonArray(resource, Arrays.asList(ERROR_CODE, ERROR_MESSAGE));
    }

    public static String getAttributeValue(ResourceResolver resourceResolver, SlingHttpServletRequest request, String propertyName) {
        Resource resource = getPagePathResource(resourceResolver, request, JCR_CONTENT);   
        return ModelUtil.toJsonString(resource, propertyName);
    }

    private static Resource getPagePathResource(ResourceResolver resourceResolver, SlingHttpServletRequest request, String pathType) {
        String uri = request.getRequestURI();
        String path = null;
        if (uri.contains(SHOWCASE)) {
            path = uri.split(SHOWCASE)[0] + SHOWCASE;
        } else if (uri.contains(HOMEPAGE)) {
            path = uri.split(HOMEPAGE)[0] + HOMEPAGE;
        } else {
            String[] firstPath = uri.split(SSCP_PAGE);
            String[] secondPath = firstPath[1].split("/");
            path = firstPath[0] + SSCP_PAGE + secondPath[0];
        }
        
        if(ERROR_MAP_PATH == pathType) {
            path = path + ERROR_MAP_PATH;
        } else {
            path = path + JCR_CONTENT;
        }        
        return resourceResolver.getResource(path);
    }
}
