package com.sscp.core.support.dialog.form;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import javax.jcr.Node;
import javax.jcr.RepositoryException;

import static com.sscp.core.support.constants.Constants.DIALOG_GRANITE_RESOURCE_PATH;
import static com.sscp.core.support.dialog.form.Checkbox.*;
import static org.junit.jupiter.api.Assertions.*;

class CheckboxTest extends AbstractFieldTest {
    @Test
    @DisplayName("test basic checkbox field")
    void testBasicField() throws RepositoryException {
        Node fieldNode = createFieldNode("basic");
        Checkbox field = createField("basic", fieldNode);

        assertEquals("basic", fieldNode.getProperty(FIELD_NAME).getString());
        assertEquals(DIALOG_GRANITE_RESOURCE_PATH, field.getFieldResourcePath());

        assertTrue(fieldNode.hasProperty(FIELD_CHECKED));
        assertTrue(fieldNode.hasProperty(FIELD_DELETE_HINT));
        assertTrue(fieldNode.hasProperty(FIELD_IGNORE_DATA));
        assertTrue(fieldNode.hasProperty(FIELD_SHOW_EMPTY_IN_READ_ONLY));
        assertFalse(fieldNode.hasProperty(FIELD_TEXT));
        assertFalse(fieldNode.hasProperty(FIELD_UNCHECKED_VALUE));
        assertFalse(fieldNode.hasProperty(FIELD_VALUE));
    }

    @Override
    protected Checkbox createFieldInstance(String name) {
        return new Checkbox(TEMP_PATH, name);
    }
}
