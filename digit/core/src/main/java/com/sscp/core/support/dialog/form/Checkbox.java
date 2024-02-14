package com.sscp.core.support.dialog.form;

import javax.jcr.RepositoryException;

public class Checkbox extends Field {
    protected static final String FIELD_DELETE_HINT = "deleteHint";
    protected static final String FIELD_IGNORE_DATA = "ignoreData";
    protected static final String FIELD_SHOW_EMPTY_IN_READ_ONLY = "showEmptyInReadOnly";
    protected static final String FIELD_TEXT = "text";

    protected Checkbox(String temporaryPath, String fieldName) {
        super(temporaryPath, fieldName);
    }

    @Override
    @SuppressWarnings({"DuplicatedCode"})
    public void setFieldProperties() throws RepositoryException {
        super.setFieldProperties();

        fieldNode.setProperty(FIELD_CHECKED,
                getFieldConfigForKey(FIELD_CHECKED, Boolean.class, Boolean.FALSE));
        fieldNode.setProperty(FIELD_DELETE_HINT,
                getFieldConfigForKey(FIELD_DELETE_HINT, Boolean.class, Boolean.TRUE));
        fieldNode.setProperty(FIELD_IGNORE_DATA,
                getFieldConfigForKey(FIELD_IGNORE_DATA, Boolean.class, Boolean.FALSE));
        fieldNode.setProperty(FIELD_SHOW_EMPTY_IN_READ_ONLY,
                getFieldConfigForKey(FIELD_SHOW_EMPTY_IN_READ_ONLY, Boolean.class, Boolean.FALSE));
        fieldNode.setProperty(FIELD_TEXT,
                getFieldConfigForKey(FIELD_TEXT, String.class, null));
        fieldNode.setProperty(FIELD_UNCHECKED_VALUE,
                getFieldConfigForKey(FIELD_UNCHECKED_VALUE, String.class, null));
        fieldNode.setProperty(FIELD_VALUE,
                getFieldConfigForKey(FIELD_VALUE, String.class, null));
    }
}
