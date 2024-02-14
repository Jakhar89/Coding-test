package com.sscp.core.support.dialog.form;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.sscp.core.testcontext.AppAemContext;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import uk.org.lidalia.slf4jtest.TestLogger;
import uk.org.lidalia.slf4jtest.TestLoggerFactory;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
public abstract class AbstractFieldTest {
    protected static final String TEMP_PATH = "/tmp/content/dialog";

    protected final AemContext context = AppAemContext.newAemContext();

    protected TestLogger logger;

    @BeforeEach
    void setUp() {
        TestLoggerFactory.clear();
    }

    public static JsonObject getMockJson(String filename) {
        InputStream inputStream = FieldTest.class.getResourceAsStream("/dialog/" + filename + ".json");
        assertNotNull(inputStream);

        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));

        return JsonParser.parseReader(bufferedReader).getAsJsonObject();
    }

    protected final Node createFieldNode(String path) {
        Resource resource = context.create().resource(TEMP_PATH + "/" + path);
        Node node = resource.adaptTo(Node.class);

        assertNotNull(node);

        return node;
    }

    @SuppressWarnings("unchecked")
    protected final <T extends Field> T createField(String name, Node fieldNode) throws RepositoryException {
        Field field = createFieldInstance(name);

        field.setFieldNode(fieldNode);
        field.setFieldConfig(getMockJson(name));
        field.setFieldProperties();

        logger = TestLoggerFactory.getTestLogger(field.getClass());

        return (T) field;
    }

    protected Field createFieldInstance(String name) {
        throw new UnsupportedOperationException();
    }
}
