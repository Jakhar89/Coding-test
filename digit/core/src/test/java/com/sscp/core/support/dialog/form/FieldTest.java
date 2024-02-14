package com.sscp.core.support.dialog.form;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import uk.org.lidalia.slf4jext.Level;
import uk.org.lidalia.slf4jtest.LoggingEvent;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import java.util.List;

import static com.sscp.core.support.constants.Constants.DIALOG_GRANITE_RESOURCE_PATH;
import static com.sscp.core.support.dialog.form.Field.*;
import static org.junit.jupiter.api.Assertions.*;

class FieldTest extends AbstractFieldTest {
    @Test
    @DisplayName("test basic field")
    void testBasicField() throws RepositoryException {
        Node fieldNode = createFieldNode("basic");
        Field field = createField("basic", fieldNode);

        assertEquals("basic", fieldNode.getProperty(FIELD_NAME).getString());
        assertEquals(DIALOG_GRANITE_RESOURCE_PATH, field.getFieldResourcePath());

        assertFalse(fieldNode.hasProperty(FIELD_DESCRIPTION));
        assertFalse(fieldNode.hasProperty(FIELD_LABEL));
        assertFalse(fieldNode.hasProperty(FIELD_LABEL_COMMENT_I18N));
        assertTrue(fieldNode.hasProperty(FIELD_REQUIRED));
        assertTrue(fieldNode.hasProperty(FIELD_RENDER_HIDDEN));
        assertFalse(fieldNode.hasProperty(FIELD_TOOLTIP_POSITION));
        assertFalse(fieldNode.hasProperty(FIELD_WRAPPER_CLASS));
    }

    @Test
    @DisplayName("test field validation")
    void testFieldValidation() throws RepositoryException {
        Node fieldNode = createFieldNode("validation");
        Field field = createField("validation", fieldNode);

        List<LoggingEvent> events = logger.getLoggingEvents();

        assertEquals(3, events.size());

        assertEquals(Level.ERROR, events.get(0).getLevel());
        assertEquals("Invalid input name provided for {}. Must be a string and start with './'.",
                events.get(0).getMessage());

        assertEquals(Level.WARN, events.get(1).getLevel());
        assertEquals("Invalid tooltip position '{}' provided for: {}.",
                events.get(1).getMessage());

        assertEquals(Level.WARN, events.get(2).getLevel());
        assertEquals("Invalid variant type '{}' provided for: {}.",
                events.get(2).getMessage());
    }

    @Test
    @DisplayName("test field pathing")
    void testFieldPathing() throws RepositoryException {
        Node fieldNode = createFieldNode("basic");
        FieldImpl field = createField("basic", fieldNode);

        assertEquals(TEMP_PATH + "/foo", field.createPath("foo"));
        assertEquals(TEMP_PATH + "/foo/bar", field.createPath("foo", "bar"));
        assertEquals(TEMP_PATH + "/foo/bar/foo_bar", field.createPath("foo", "bar", "foo_bar"));
    }

    @Override
    protected Field createFieldInstance(String name) {
        return new FieldImpl(TEMP_PATH, name);
    }

    static class FieldImpl extends Field {
        protected FieldImpl(String temporaryPath, String fieldName) {
            super(temporaryPath, fieldName);
        }

        @Override
        public void setFieldProperties() throws RepositoryException {
            super.setFieldProperties();

            fieldNode.setProperty(FIELD_VARIANT, getVariant());
        }

        public String createPath(String... pathParts) {
            return generateNodePath(pathParts);
        }
    }
}
