package com.sscp.core.support.dialog.form;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.reflect.TypeToken;
import org.apache.commons.lang3.StringUtils;
import org.jetbrains.annotations.Nullable;

import javax.jcr.RepositoryException;
import java.lang.reflect.Type;
import java.util.Arrays;
import java.util.List;

public class FileUpload extends Field {
    protected static final Type STRING_LIST_TOKEN = new TypeToken<List<String>>() {
    }.getType();

    protected static final String FIELD_ASYNC = "async";
    protected static final String FIELD_AUTOSTART = "autoStart";
    protected static final String FIELD_HIDE_TEXT = "hideText";
    protected static final String FIELD_ICON = "icon";
    protected static final String FIELD_ICON_SIZE = "iconSize";
    protected static final String FIELD_MIME_TYPES = "mimeTypes";
    protected static final String FIELD_SIZE = "size";
    protected static final String FIELD_SIZE_LIMIT = "sizeLimit";
    protected static final String FIELD_TEXT = "text";
    protected static final String FIELD_UPLOAD_URL = "uploadUrl";

    protected static String[] iconSizes = new String[]{"XS", "S", "M", "L"};
    protected static String[] uploadButtonSizes = new String[]{"M", "L"};

    static {
        variants = new String[]{"primary", "warning", "quiet", "minimal", "actionBar"};
    }

    protected FileUpload(String temporaryPath, String fieldName) {
        super(temporaryPath, fieldName);
    }

    @Nullable
    protected final String getIconSize() {
        String iconSize = getFieldConfigForKey(FIELD_ICON_SIZE, String.class, null);

        if (StringUtils.isNotEmpty(iconSize) && !Arrays.asList(iconSizes).contains(iconSize)) {
            log.warn("Invalid icon size '{}' provided for: {}.", iconSize, fieldName);

            return null;
        }

        return iconSize;
    }

    @Nullable
    protected final String getMimeTypes() {
        if (!fieldJsonConfig.has(FIELD_MIME_TYPES)) {
            return null;
        }

        JsonElement mimeTypes = fieldJsonConfig.get(FIELD_MIME_TYPES);

        return String.format("[%s]", mimeTypes.isJsonArray()
                ? String.join(",", List.of(new Gson().fromJson(mimeTypes, STRING_LIST_TOKEN)))
                : mimeTypes.getAsString());
    }

    @Nullable
    protected final String getSize() {
        String size = getFieldConfigForKey(FIELD_SIZE, String.class, null);

        if (StringUtils.isNotEmpty(size) && !Arrays.asList(uploadButtonSizes).contains(size)) {
            log.warn("Invalid button size '{}' provided for: {}.", size, fieldName);

            return null;
        }

        return size;
    }

    @Override
    @SuppressWarnings({"DuplicatedCode"})
    public void setFieldProperties() throws RepositoryException {
        super.setFieldProperties();

        fieldNode.setProperty(FIELD_ASYNC,
                getFieldConfigForKey(FIELD_ASYNC, Boolean.class, Boolean.FALSE));
        fieldNode.setProperty(FIELD_AUTOSTART,
                getFieldConfigForKey(FIELD_AUTOSTART, Boolean.class, Boolean.FALSE));
        fieldNode.setProperty(FIELD_EMPTY_TEXT,
                getFieldConfigForKey(FIELD_EMPTY_TEXT, String.class, null));
        fieldNode.setProperty(FIELD_HIDE_TEXT,
                getFieldConfigForKey(FIELD_HIDE_TEXT, String.class, null));
        fieldNode.setProperty(FIELD_ICON,
                getFieldConfigForKey(FIELD_ICON, String.class, null));
        fieldNode.setProperty(FIELD_ICON_SIZE,
                getIconSize());
        fieldNode.setProperty(FIELD_MIME_TYPES,
                getMimeTypes());
        fieldNode.setProperty(FIELD_MULTIPLE,
                getFieldConfigForKey(FIELD_MULTIPLE, Boolean.class, Boolean.FALSE));
        fieldNode.setProperty(FIELD_SIZE,
                getSize());
        fieldNode.setProperty(FIELD_SIZE_LIMIT,
                getFieldConfigForKey(FIELD_SIZE_LIMIT, Integer.class, null));
        fieldNode.setProperty(FIELD_TEXT,
                getFieldConfigForKey(FIELD_TEXT, String.class, null));
        fieldNode.setProperty(FIELD_UPLOAD_URL,
                getFieldConfigForKey(FIELD_UPLOAD_URL, String.class, null));
        fieldNode.setProperty(FIELD_VARIANT,
                getVariant());
    }
}
