package com.sscp.core.util;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;

import java.util.List;

/**
 * Model Utility
 */
public class ModelUtil {
    public static JsonArray toJsonArray(Resource resource, List<String> propertyNames) {
        JsonArray jsonArray = null;
        if (null != resource && resource.hasChildren()) {
            jsonArray = new JsonArray();
            Iterable<Resource> children = resource.getChildren();
            for (Resource child : children) {
                JsonObject jsonObj = new JsonObject();
                ValueMap childVMap = child.getValueMap();
                for (String propertyName : propertyNames) {
                    if (childVMap.containsKey(propertyName)) {
                        String propertyValue = childVMap.get(propertyName).toString();
                        jsonObj.addProperty(propertyName, propertyValue);
                    }
                }
                jsonArray.add(jsonObj);
            }
        }
        return jsonArray;
    }

    public static String toJsonString(Resource resource, String propertyName) {
        ValueMap childAttribute = resource.getValueMap();
        if (null != resource && childAttribute.containsKey(propertyName)) {            
            return childAttribute.get(propertyName).toString();
        }
        return null;
    }
}
