package com.sscp.core.support.dialog.form;

import javax.jcr.RepositoryException;
import javax.jcr.Session;

import static com.sscp.core.support.constants.Constants.DIALOG_CQ_RESOURCE_PATH;

public class RichText extends Field {
    protected static final String FIELD_USE_FIX_INLINE_TOOLBAR = "useFixedInlineToolbar";

    public RichText(String temporaryPath, String fieldName) {
        super(temporaryPath, fieldName);
    }

    @Override
    @SuppressWarnings({"DuplicatedCode"})
    public void setFieldProperties() throws RepositoryException {
        fieldNode.setProperty(FIELD_NAME,
                getName());
        fieldNode.setProperty(FIELD_REQUIRED,
                getFieldConfigForKey(FIELD_REQUIRED, Boolean.class, Boolean.FALSE));
        fieldNode.setProperty(FIELD_USE_FIX_INLINE_TOOLBAR,
                getFieldConfigForKey(FIELD_USE_FIX_INLINE_TOOLBAR, Boolean.class, Boolean.FALSE));
    }

    @Override
    @SuppressWarnings({"java:S1185"})
    public void createAdditionalNodes(Session session) {
        super.createAdditionalNodes(session);
    }

    @Override
    public String getFieldResourcePath() {
        return DIALOG_CQ_RESOURCE_PATH;
    }
}
