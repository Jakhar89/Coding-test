package com.sscp.core.support.dialog.form;

import javax.jcr.RepositoryException;
import javax.jcr.Session;

public class Select extends Field {
    protected static final String FIELD_EMPTY_OPTION = "emptyOption";
    protected static final String FIELD_FORCE_IGNORE_FRESHNESS = "forceIgnoreFreshness";
    protected static final String FIELD_ORDERED = "ordered";
    protected static final String FIELD_TRANSLATE_OPTIONS = "translateOptions";

    static {
        variants = new String[]{"default", "quiet"};
    }

    protected Select(String temporaryPath, String fieldName) {
        super(temporaryPath, fieldName);
    }

    @Override
    @SuppressWarnings({"DuplicatedCode"})
    public void setFieldProperties() throws RepositoryException {
        super.setFieldProperties();

        fieldNode.setProperty(FIELD_EMPTY_OPTION,
                getFieldConfigForKey(FIELD_EMPTY_OPTION, Boolean.class, Boolean.FALSE));
        fieldNode.setProperty(FIELD_EMPTY_TEXT,
                getFieldConfigForKey(FIELD_EMPTY_TEXT, String.class, null));
        fieldNode.setProperty(FIELD_FORCE_IGNORE_FRESHNESS,
                getFieldConfigForKey(FIELD_FORCE_IGNORE_FRESHNESS, Boolean.class, Boolean.FALSE));
        fieldNode.setProperty(FIELD_MULTIPLE,
                getFieldConfigForKey(FIELD_MULTIPLE, Boolean.class, Boolean.FALSE));
        fieldNode.setProperty(FIELD_ORDERED,
                getFieldConfigForKey(FIELD_ORDERED, Boolean.class, Boolean.FALSE));
        fieldNode.setProperty(FIELD_TRANSLATE_OPTIONS,
                getFieldConfigForKey(FIELD_TRANSLATE_OPTIONS, Boolean.class, Boolean.TRUE));
        fieldNode.setProperty(FIELD_VARIANT,
                getVariant());
    }

    @Override
    @SuppressWarnings({"java:S1185"})
    public void createAdditionalNodes(Session session) {
        super.createAdditionalNodes(session);
    }
}
