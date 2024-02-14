package com.sscp.core.util;

import com.day.cq.commons.jcr.JcrConstants;
import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;
import com.google.gson.JsonParser;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceUtil;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.concurrent.TimeUnit;

@Slf4j
public class JsonUtils {
    private static JsonUtils instance;

    /**
     * Experimental: used to cache the parsed JSON structures so the amount of I/O requests
     * are kept to a minimum.
     */
    private Cache<String, JsonObject> jsonCache = null;

    private JsonUtils() {
        log.debug("Initialised singleton instance for JSON Utils");

        if (Boolean.TRUE.equals(USE_CACHING)) {
            jsonCache = CacheBuilder.newBuilder()
                    .expireAfterAccess(30, TimeUnit.SECONDS)
                    .maximumSize(5000)
                    .build();
        }
    }

    /**
     * Set this to `false` to disable JSON caching, useful for unit tests.
     */
    @SuppressWarnings({"java:S3008", "java:S1104", "squid:S1444"})
    public static Boolean USE_CACHING = true;

    public static JsonUtils getInstance() {
        if (instance == null) {
            instance = new JsonUtils();
        }

        return instance;
    }

    /**
     * Retrieve and parse the provided {@code path} JSON file.
     *
     * @param path             JCR path to a JSON file
     * @param resourceResolver an instance of {@link ResourceResolver}
     * @return {@link JsonObject} when parsing succeeds, or {@code nul} when an error occurs
     */
    @Nullable
    public JsonObject getJsonObjectFromPath(@NotNull String path, ResourceResolver resourceResolver)
            throws JsonParseException {
        if (StringUtils.isNotEmpty(path)) {
            if (Boolean.TRUE.equals(USE_CACHING) && jsonCache != null) {
                JsonObject cachedJson = jsonCache.getIfPresent(path);

                if (cachedJson != null) {
                    return cachedJson;
                }
            }

            Resource pathResource = resourceResolver.resolve(path);

            if (!ResourceUtil.isNonExistingResource(pathResource)) {
                Node bundleNode = pathResource.adaptTo(Node.class);

                if (bundleNode == null) {
                    return null;
                }

                return getJsonStreamAndParse(path, bundleNode);
            }
        } else {
            throw new NullPointerException("The provided 'path' value is invalid, please ensure it is a valid JCR path.");
        }

        return null;
    }

    /**
     * Retrieve the JSON binary data and parse it using Gson.
     *
     * @param path       JCR path to the JSON resource
     * @param bundleNode JCR {@link Node}
     * @return parsed {@link JsonObject}
     * @throws JsonParseException occurs when the input stream, buffer or parser fails
     */
    private JsonObject getJsonStreamAndParse(String path, @NotNull Node bundleNode) throws JsonParseException {
        try {
            InputStream bundleInputStream = bundleNode.getNode(JcrConstants.JCR_CONTENT)
                    .getProperty(JcrConstants.JCR_DATA)
                    .getBinary()
                    .getStream();

            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(bundleInputStream));

            JsonObject json = JsonParser.parseReader(bufferedReader).getAsJsonObject();

            if (Boolean.TRUE.equals(USE_CACHING) && jsonCache != null) {
                jsonCache.put(path, json);
            }

            bundleInputStream.close();

            return json;
        } catch (IllegalStateException | IOException | RepositoryException e) {
            throw new JsonParseException(String.format("Unable to open stream and/or parse the JSON file: %s", path));
        }
    }
}
