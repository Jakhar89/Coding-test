package com.sscp.core.support.dialog.form;

import javax.jcr.RepositoryException;

public class Switch extends Field {
    protected static final String FIELD_IGNORE_DATA = "ignoreData";

    public Switch(String temporaryPath, String fieldName) {
        super(temporaryPath, fieldName);
    }

    @Override
    @SuppressWarnings({"DuplicatedCode"})
    public void setFieldProperties() throws RepositoryException {
        super.setFieldProperties();

        fieldNode.setProperty(FIELD_CHECKED,
                getFieldConfigForKey(FIELD_CHECKED, Boolean.class, Boolean.FALSE));
        fieldNode.setProperty(FIELD_IGNORE_DATA,
                getFieldConfigForKey(FIELD_IGNORE_DATA, Boolean.class, Boolean.FALSE));
        fieldNode.setProperty(FIELD_UNCHECKED_VALUE,
                getFieldConfigForKey(FIELD_UNCHECKED_VALUE, String.class, null));
        fieldNode.setProperty(FIELD_VALUE,
                getFieldConfigForKey(FIELD_VALUE, String.class, null));
    }
}
