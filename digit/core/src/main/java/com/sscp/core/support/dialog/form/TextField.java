package com.sscp.core.support.dialog.form;

import javax.jcr.RepositoryException;

public class TextField extends Field {
    protected static final String FIELD_AUTO_COMPLETE = "autocomplete";
    protected static final String FIELD_AUTO_FOCUS = "autofocus";
    protected static final String FIELD_MAX_LENGTH = "maxlength";

    public TextField(String temporaryPath, String fieldName) {
        super(temporaryPath, fieldName);
    }

    @Override
    @SuppressWarnings({"DuplicatedCode"})
    public void setFieldProperties() throws RepositoryException {
        super.setFieldProperties();

        fieldNode.setProperty(FIELD_AUTO_COMPLETE,
                getFieldConfigForKey(FIELD_AUTO_COMPLETE, String.class, "off"));
        fieldNode.setProperty(FIELD_AUTO_FOCUS,
                getFieldConfigForKey(FIELD_AUTO_FOCUS, Boolean.class, Boolean.FALSE));
        fieldNode.setProperty(FIELD_MAX_LENGTH,
                getFieldConfigForKey(FIELD_MAX_LENGTH, Long.class, Long.MAX_VALUE));
    }
}
