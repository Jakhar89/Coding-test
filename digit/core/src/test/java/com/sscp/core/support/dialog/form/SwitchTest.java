package com.sscp.core.support.dialog.form;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import javax.jcr.Node;
import javax.jcr.RepositoryException;

import static com.sscp.core.support.constants.Constants.DIALOG_GRANITE_RESOURCE_PATH;
import static com.sscp.core.support.dialog.form.Switch.*;
import static org.junit.jupiter.api.Assertions.*;

class SwitchTest extends AbstractFieldTest {
    @Test
    @DisplayName("test basic text field")
    void testBasicField() throws RepositoryException {
        Node fieldNode = createFieldNode("basic");
        Switch field = createField("basic", fieldNode);

        assertEquals("basic", fieldNode.getProperty(FIELD_NAME).getString());
        assertEquals(DIALOG_GRANITE_RESOURCE_PATH, field.getFieldResourcePath());

        assertTrue(fieldNode.hasProperty(FIELD_CHECKED));
        assertTrue(fieldNode.hasProperty(FIELD_IGNORE_DATA));
        assertFalse(fieldNode.hasProperty(FIELD_UNCHECKED_VALUE));
        assertFalse(fieldNode.hasProperty(FIELD_VALUE));
    }

    @Override
    protected Switch createFieldInstance(String name) {
        return new Switch(TEMP_PATH, name);
    }
}
