package com.sscp.core.support.dialog.form;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.wrappers.ValueMapDecorator;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import java.util.Arrays;
import java.util.HashMap;

import static com.sscp.core.support.constants.Constants.DIALOG_GRANITE_RESOURCE_PATH;

public abstract class Field {
    protected static final String FIELD_CHECKED = "checked";
    protected static final String FIELD_DESCRIPTION = "fieldDescription";
    protected static final String FIELD_EMPTY_TEXT = "emptyText";
    protected static final String FIELD_LABEL = "fieldLabel";
    protected static final String FIELD_LABEL_COMMENT_I18N = "fieldLabel_commentI18n";
    protected static final String FIELD_MULTIPLE = "multiple";
    protected static final String FIELD_NAME = "name";
    protected static final String FIELD_REQUIRED = "required";
    protected static final String FIELD_RENDER_HIDDEN = "renderHidden";
    protected static final String FIELD_TOOLTIP_POSITION = "tooltipPosition";
    protected static final String FIELD_UNCHECKED_VALUE = "uncheckedValue";
    protected static final String FIELD_VARIANT = "variant";
    protected static final String FIELD_VALUE = "value";
    protected static final String FIELD_WRAPPER_CLASS = "wrapperClass";

    protected final Logger log = LoggerFactory.getLogger(this.getClass());

    protected final String fieldName;
    protected final String temporaryPath;

    protected JsonObject fieldJsonConfig = new JsonObject();
    protected ValueMap fieldConfig = new ValueMapDecorator(new HashMap<>());
    protected Node fieldNode;

    protected static String[] tooltipPositions = new String[]{"right", "left", "top", "bottom"};
    protected static String[] variants = new String[]{};

    protected Field(String temporaryPath, String fieldName) {
        this.fieldName = fieldName;
        this.temporaryPath = temporaryPath;
    }

    protected String getName() {
        String name = getFieldConfigForKey(FIELD_NAME, String.class, null);

        if (StringUtils.isEmpty(name)) {
            log.error("Invalid input name provided for {}. Must be a string and start with './'.", fieldName);

            return null;
        }

        return name;
    }

    @Nullable
    protected final String getTooltipPosition() {
        String tooltipPosition = getFieldConfigForKey(FIELD_TOOLTIP_POSITION, String.class, null);

        if (StringUtils.isNotEmpty(tooltipPosition) && !Arrays.asList(tooltipPositions).contains(tooltipPosition)) {
            log.warn("Invalid tooltip position '{}' provided for: {}.", tooltipPosition, fieldName);

            return null;
        }

        return tooltipPosition;
    }

    @Nullable
    protected final String getVariant() {
        String variant = getFieldConfigForKey(FIELD_VARIANT, String.class, null);

        if (StringUtils.isNotEmpty(variant) && !Arrays.asList(variants).contains(variant)) {
            log.warn("Invalid variant type '{}' provided for: {}.", variant, fieldName);

            return null;
        }

        return variant;
    }

    /**
     * Retrieve the field configuration value for the provided {@code key}.
     *
     * @param key field config key
     * @param clazz generic type of the field config value
     * @param fallbackValue value to use when the field config key is missing
     * @param <T> generic type implicitly taken from {@code clazz}
     * @return the field config value, otherwise the {@code fallbackValue}
     */
    protected final <T> T getFieldConfigForKey(final @NotNull String key,
                                               final @NotNull Class<T> clazz,
                                               final T fallbackValue) {
        return fieldConfig != null && fieldConfig.containsKey(key)
                ? fieldConfig.get(key, clazz)
                : fallbackValue;
    }

    /**
     * Generate a JCR node path to the field node.
     *
     * @param pathParts list of strings to make up the path
     * @return paths concatenated by a forward slash
     */
    protected final String generateNodePath(final String... pathParts) {
        return temporaryPath + "/" + StringUtils.join(pathParts, "/");
    }

    /**
     * Retrieve the resource path of the field.
     *
     * @return a JCR path to the field
     */
    public String getFieldResourcePath() {
        return DIALOG_GRANITE_RESOURCE_PATH;
    }

    /**
     * Set the JSON configuration object for the field.
     *
     * @param fieldConfig {@link JsonObject} instance
     */
    public void setFieldConfig(final JsonObject fieldConfig) {
        this.fieldJsonConfig = fieldConfig;

        this.fieldConfig = new ValueMapDecorator(new Gson().fromJson(
                fieldConfig,
                new TypeToken<HashMap<String, Object>>() {
                }.getType()
        ));
    }

    /**
     * Set the JCR {@link Node} instance of the field.
     *
     * @param fieldNode JCR {@link Node} instance
     */
    public void setFieldNode(final Node fieldNode) {
        this.fieldNode = fieldNode;
    }

    /**
     * Set all the properties required for the field to be rendered.
     *
     * @throws RepositoryException occurs when setting a property fails
     */
    @SuppressWarnings({"DuplicatedCode"})
    public void setFieldProperties() throws RepositoryException {
        fieldNode.setProperty(FIELD_DESCRIPTION,
                getFieldConfigForKey(FIELD_DESCRIPTION, String.class, null));
        fieldNode.setProperty(FIELD_LABEL,
                getFieldConfigForKey(FIELD_LABEL, String.class, null));
        fieldNode.setProperty(FIELD_LABEL_COMMENT_I18N,
                getFieldConfigForKey(FIELD_LABEL_COMMENT_I18N, String.class, null));
        fieldNode.setProperty(FIELD_NAME,
                getName());
        fieldNode.setProperty(FIELD_REQUIRED,
                getFieldConfigForKey(FIELD_REQUIRED, Boolean.class, Boolean.FALSE));
        fieldNode.setProperty(FIELD_RENDER_HIDDEN,
                getFieldConfigForKey(FIELD_RENDER_HIDDEN, Boolean.class, Boolean.FALSE));
        fieldNode.setProperty(FIELD_TOOLTIP_POSITION,
                getTooltipPosition());
        fieldNode.setProperty(FIELD_WRAPPER_CLASS,
                getFieldConfigForKey(FIELD_WRAPPER_CLASS, String.class, null));
    }

    /**
     * Create any other additional nodes required for the field.
     *
     * @param session {@link Session} instance
     */
    public void createAdditionalNodes(final Session session) {
        // does nothing by default
    }
}
