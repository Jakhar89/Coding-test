package com.sscp.core.support.dialog.form;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import javax.jcr.Node;
import javax.jcr.RepositoryException;

import static com.sscp.core.support.constants.Constants.DIALOG_CQ_RESOURCE_PATH;
import static com.sscp.core.support.dialog.form.RichText.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class RichTextTest extends AbstractFieldTest {
    @Test
    @DisplayName("test basic rich text field")
    void testBasicField() throws RepositoryException {
        Node fieldNode = createFieldNode("basic");
        RichText field = createField("basic", fieldNode);

        assertEquals("basic", fieldNode.getProperty(FIELD_NAME).getString());
        assertEquals(DIALOG_CQ_RESOURCE_PATH, field.getFieldResourcePath());

        assertTrue(fieldNode.hasProperty(FIELD_NAME));
        assertTrue(fieldNode.hasProperty(FIELD_REQUIRED));
        assertTrue(fieldNode.hasProperty(FIELD_USE_FIX_INLINE_TOOLBAR));
    }

    @Override
    protected RichText createFieldInstance(String name) {
        return new RichText(TEMP_PATH, name);
    }
}
