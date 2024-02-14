package com.sscp.core.support.dialog.form;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import uk.org.lidalia.slf4jext.Level;
import uk.org.lidalia.slf4jtest.LoggingEvent;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import java.util.List;

import static com.sscp.core.support.constants.Constants.DIALOG_GRANITE_RESOURCE_PATH;
import static com.sscp.core.support.dialog.form.Select.*;
import static org.junit.jupiter.api.Assertions.*;

class SelectTest extends AbstractFieldTest {
    @Test
    @DisplayName("test basic field")
    void testBasicField() throws RepositoryException {
        Node fieldNode = createFieldNode("basic");
        Select field = createField("basic", fieldNode);

        assertEquals("basic", fieldNode.getProperty(FIELD_NAME).getString());
        assertEquals(DIALOG_GRANITE_RESOURCE_PATH, field.getFieldResourcePath());

        assertTrue(fieldNode.hasProperty(FIELD_EMPTY_OPTION));
        assertFalse(fieldNode.hasProperty(FIELD_EMPTY_TEXT));
        assertTrue(fieldNode.hasProperty(FIELD_FORCE_IGNORE_FRESHNESS));
        assertTrue(fieldNode.hasProperty(FIELD_MULTIPLE));
        assertTrue(fieldNode.hasProperty(FIELD_ORDERED));
        assertTrue(fieldNode.hasProperty(FIELD_TRANSLATE_OPTIONS));
        assertFalse(fieldNode.hasProperty(FIELD_VARIANT));
    }

    @Test
    @DisplayName("test field validation")
    void testFieldValidation() throws RepositoryException {
        Node fieldNode = createFieldNode("validation");
        Select field = createField("validation", fieldNode);

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

    @Override
    protected Select createFieldInstance(String name) {
        return new Select(TEMP_PATH, name);
    }
}
