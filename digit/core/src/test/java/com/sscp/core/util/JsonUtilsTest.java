package com.sscp.core.util;

import com.day.cq.commons.jcr.JcrConstants;
import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.jcr.Binary;
import javax.jcr.Node;
import javax.jcr.Property;
import javax.jcr.RepositoryException;
import java.io.FileInputStream;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith({MockitoExtension.class})
class JsonUtilsTest {
    private static final String BASIC_JSON_PATH = "/apps/sscp/testing/basic.json";
    private static final String NON_EXISTENT_JSON_PATH = "/apps/sscp/testing/non-existent.json";

    @Mock
    Binary binary;
    @Mock
    Node node;
    @Mock
    Property property;
    @Mock
    Resource resource;
    @Mock
    ResourceResolver resourceResolver;

    @BeforeEach
    void init() throws Exception {
        lenient().when(resourceResolver.resolve(BASIC_JSON_PATH)).thenReturn(resource);
        lenient().when(resource.adaptTo(Node.class)).thenReturn(node);
        lenient().when(node.getNode(JcrConstants.JCR_CONTENT)).thenReturn(node);
        lenient().when(node.getProperty(JcrConstants.JCR_DATA)).thenReturn(property);
        lenient().when(property.getBinary()).thenReturn(binary);
    }

    @Test
    @DisplayName("an basic input stream should return the correct json object")
    void testCanLoadBasicJson() throws Exception {
        when(binary.getStream()).thenReturn(new FileInputStream("src/test/resources/context/basic.json"));

        JsonObject json = JsonUtils.getInstance().getJsonObjectFromPath(BASIC_JSON_PATH, resourceResolver);

        assertNotNull(json);
        assertTrue(json.get("test").getAsBoolean());
    }

    @Test
    @DisplayName("an non-existent resource should return null")
    void testNonExistentJsonPathReturnsNull() {
        Resource nonExistentResource = mock(Resource.class);

        when(nonExistentResource.getResourceType()).thenReturn(Resource.RESOURCE_TYPE_NON_EXISTING);
        when(resourceResolver.resolve(NON_EXISTENT_JSON_PATH)).thenReturn(nonExistentResource);

        JsonObject json = JsonUtils.getInstance().getJsonObjectFromPath(NON_EXISTENT_JSON_PATH, resourceResolver);

        assertNull(json);
    }

    @Test
    @DisplayName("an json parse exception should occur when getStream throws")
    void testJsonParseExceptionWithInvalidStream() throws Exception {
        when(binary.getStream()).thenThrow(RepositoryException.class);

        assertThrows(JsonParseException.class, () -> {
            JsonUtils.getInstance().getJsonObjectFromPath(BASIC_JSON_PATH, resourceResolver);
        });
    }

    @Test
    @DisplayName("invalid path should throw a null pointer exception")
    void testInvalidPathThrowsException() {
        assertThrows(NullPointerException.class, () -> {
            JsonUtils.getInstance().getJsonObjectFromPath(StringUtils.EMPTY, resourceResolver);
        });
    }
}
