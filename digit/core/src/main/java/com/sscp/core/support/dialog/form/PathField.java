package com.sscp.core.support.dialog.form;

import org.apache.commons.lang3.StringUtils;
import org.jetbrains.annotations.Nullable;

import javax.jcr.RepositoryException;
import java.util.Arrays;

public class PathField extends Field {
    protected static final String FIELD_FILTER = "filter";
    protected static final String FIELD_FORCE_SELECTION = "forceSelection";
    protected static final String FIELD_MULTIPLE = "multiple";
    protected static final String FIELD_PICKER_SRC = "pickerSrc";
    protected static final String FIELD_ROOT_PATH = "rootPath";
    protected static final String FIELD_SUGGESTION_SRC = "suggestionSrc";

    protected static String[] filters = new String[]{"folder", "hierarchy", "hierarchyNotFile", "nosystem"};

    protected PathField(String temporaryPath, String fieldName) {
        super(temporaryPath, fieldName);
    }

    @Nullable
    protected final String getFilter() {
        String filter = getFieldConfigForKey(FIELD_FILTER, String.class, null);

        if (StringUtils.isNotEmpty(filter) && !Arrays.asList(filters).contains(filter)) {
            log.warn("Invalid filter type '{}' provided for: {}.", filter, fieldName);

            return null;
        }

        return filter;
    }

    @Override
    @SuppressWarnings({"DuplicatedCode"})
    public void setFieldProperties() throws RepositoryException {
        super.setFieldProperties();

        fieldNode.setProperty(FIELD_EMPTY_TEXT,
                getFieldConfigForKey(FIELD_EMPTY_TEXT, String.class, null));
        fieldNode.setProperty(FIELD_FILTER,
                getFilter());
        fieldNode.setProperty(FIELD_FORCE_SELECTION,
                getFieldConfigForKey(FIELD_FORCE_SELECTION, Boolean.class, Boolean.FALSE));
        fieldNode.setProperty(FIELD_MULTIPLE,
                getFieldConfigForKey(FIELD_MULTIPLE, Boolean.class, Boolean.FALSE));
        fieldNode.setProperty(FIELD_PICKER_SRC,
                getFieldConfigForKey(FIELD_PICKER_SRC, String.class, null));
        fieldNode.setProperty(FIELD_ROOT_PATH,
                getFieldConfigForKey(FIELD_ROOT_PATH, String.class, null));
        fieldNode.setProperty(FIELD_SUGGESTION_SRC,
                getFieldConfigForKey(FIELD_SUGGESTION_SRC, String.class, null));
    }
}
