package com.sscp.core.support.dialog.form;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import javax.jcr.Node;
import javax.jcr.RepositoryException;

import static com.sscp.core.support.constants.Constants.DIALOG_GRANITE_RESOURCE_PATH;
import static com.sscp.core.support.dialog.form.TextField.*;
import static org.junit.jupiter.api.Assertions.*;

class TextFieldTest extends AbstractFieldTest {
    @Test
    @DisplayName("test basic text field")
    void testBasicField() throws RepositoryException {
        Node fieldNode = createFieldNode("basic");
        TextField field = createField("basic", fieldNode);

        assertEquals("basic", fieldNode.getProperty(FIELD_NAME).getString());
        assertEquals(DIALOG_GRANITE_RESOURCE_PATH, field.getFieldResourcePath());

        assertTrue(fieldNode.hasProperty(FIELD_AUTO_COMPLETE));
        assertTrue(fieldNode.hasProperty(FIELD_AUTO_FOCUS));
        assertTrue(fieldNode.hasProperty(FIELD_MAX_LENGTH));
    }

    @Override
    protected TextField createFieldInstance(String name) {
        return new TextField(TEMP_PATH, name);
    }
}
