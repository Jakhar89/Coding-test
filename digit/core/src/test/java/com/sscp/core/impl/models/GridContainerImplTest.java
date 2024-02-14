package com.sscp.core.impl.models;

import com.adobe.cq.wcm.core.components.models.LayoutContainer;
import com.sscp.core.models.GridContainer;
import com.sscp.core.testcontext.AppAemContext;
import com.sscp.core.util.JsonUtils;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import uk.org.lidalia.slf4jext.Level;
import uk.org.lidalia.slf4jtest.LoggingEvent;
import uk.org.lidalia.slf4jtest.TestLogger;
import uk.org.lidalia.slf4jtest.TestLoggerFactory;

import java.util.List;
import java.util.Map;

import static com.sscp.core.support.constants.Constants.*;
import static org.apache.sling.jcr.resource.api.JcrResourceConstants.SLING_RESOURCE_TYPE_PROPERTY;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class GridContainerImplTest {
    public final AemContext context = AppAemContext.newAemContext();

    private TestLogger logger;

    @BeforeEach
    void setUp() {
        TestLoggerFactory.clear();

        context.load().fileVaultXml("../ui.apps/src/main/content/jcr_root/apps/sscp/components/container/.content.xml",
                "/apps/" + GridContainer.RESOURCE_TYPE);

        JsonUtils.USE_CACHING = false;
    }

    @Test
    @DisplayName("the layout type should be simple")
    void testSimpleContainer() {
        context.create().resource("/content/container/simple",
                SLING_RESOURCE_TYPE_PROPERTY, GridContainer.RESOURCE_TYPE,
                "layout", GridContainer.LayoutType.SIMPLE.getLayout());

        GridContainer gridContainer = getContainerUnderTest(GridContainer.LayoutType.SIMPLE.getLayout());

        assertEquals(GridContainer.LayoutType.SIMPLE, gridContainer.getGridLayout());
        assertEquals(GridContainer.LayoutType.SIMPLE.getLayout(), gridContainer.getLayout().getLayout());
    }

    @Test
    @DisplayName("the layout type should be responsive grid")
    void testResponsiveGridContainer() {
        context.create().resource("/content/container/responsiveGrid",
                SLING_RESOURCE_TYPE_PROPERTY, GridContainer.RESOURCE_TYPE,
                "layout", GridContainer.LayoutType.RESPONSIVE_GRID.getLayout());

        GridContainer gridContainer = getContainerUnderTest(GridContainer.LayoutType.RESPONSIVE_GRID.getLayout());

        assertEquals(GridContainer.LayoutType.RESPONSIVE_GRID, gridContainer.getGridLayout());
        assertEquals(GridContainer.LayoutType.RESPONSIVE_GRID.getLayout(), gridContainer.getLayout().getLayout());
    }

    @Test
    @DisplayName("the layout type should be columns")
    void testColumnsContainer() {
        context.create().resource("/content/container/columns",
                SLING_RESOURCE_TYPE_PROPERTY, GridContainer.RESOURCE_TYPE,
                "layout", GridContainer.LayoutType.COLUMNS.getLayout());

        GridContainer gridContainer = getContainerUnderTest(GridContainer.LayoutType.COLUMNS.getLayout());

        assertEquals(GridContainer.LayoutType.COLUMNS, gridContainer.getGridLayout());
        assertEquals(GridContainer.LayoutType.SIMPLE.getLayout(), gridContainer.getLayout().getLayout());
    }

    @Test
    @DisplayName("the current style layout type should be simple")
    void testCurrentStyleLayout() {
        context.create().resource("/content/container/columns",
                SLING_RESOURCE_TYPE_PROPERTY, GridContainer.RESOURCE_TYPE);

        context.contentPolicyMapping(GridContainer.RESOURCE_TYPE,
                LayoutContainer.PN_LAYOUT, GridContainer.LayoutType.SIMPLE.getLayout());

        GridContainer gridContainer = getContainerUnderTest(GridContainer.LayoutType.COLUMNS.getLayout());

        assertEquals(GridContainer.LayoutType.SIMPLE, gridContainer.getGridLayout());
        assertEquals(GridContainer.LayoutType.SIMPLE.getLayout(), gridContainer.getLayout().getLayout());
    }

    @Test
    @DisplayName("no layout container values should be set in default state")
    void testNoLayoutContainerValuesInDefaultState() {
        context.create().resource("/content/container/values",
                SLING_RESOURCE_TYPE_PROPERTY, GridContainer.RESOURCE_TYPE,
                "layout", GridContainer.LayoutType.SIMPLE.getLayout());

        GridContainer gridContainer = getContainerUnderTest("values");

        assertEquals(GridContainer.RESOURCE_TYPE, gridContainer.getExportedType());
        assertEquals(0, gridContainer.getItems().size());
        assertEquals(0, gridContainer.getExportedItems().size());
        assertEquals(0, gridContainer.getExportedItemsOrder().length);
        assertNull(gridContainer.getBackgroundStyle());
        assertNull(gridContainer.getAccessibilityLabel());
        assertNull(gridContainer.getRoleAttribute());
    }

    @Test
    @DisplayName("no container class should be set")
    void testNoContainerClass() {
        context.create().resource("/content/container/no-container-class",
                SLING_RESOURCE_TYPE_PROPERTY, GridContainer.RESOURCE_TYPE,
                "layout", GridContainer.LayoutType.SIMPLE.getLayout());

        GridContainer gridContainer = getContainerUnderTest("no-container-class");

        assertNull(gridContainer.getContainerClass());
    }

    @Test
    @DisplayName("the container class should be fixed")
    void testContainerClassFixed() {
        context.create().resource("/content/container/fixed",
                SLING_RESOURCE_TYPE_PROPERTY, GridContainer.RESOURCE_TYPE,
                "layout", GridContainer.LayoutType.SIMPLE.getLayout(),
                "containerClass", "fixed");

        GridContainer gridContainer = getContainerUnderTest("fixed");

        assertEquals(GridContainer.LayoutType.SIMPLE, gridContainer.getGridLayout());
        assertEquals("fixed", gridContainer.getContainerClass());
    }

    @Test
    @DisplayName("the layout type columns with no valid JSON resource should fail")
    void testColumnsContainerWithNoJsonResource() {
        getColumnContainer();

        List<LoggingEvent> events = logger.getLoggingEvents();

        assertNull(context.resourceResolver().getResource(GridContainer.LAYOUTS_JSON_PATH));

        assertEquals(1, events.size());
        assertEquals(Level.ERROR, events.get(0).getLevel());
        assertEquals("Grid container JSON structure is invalid.",
                events.get(0).getThrowable().get().getMessage());
    }

    @Test
    @DisplayName("the layout type columns with an empty JSON resource should fail")
    void testColumnsContainerWithEmptyJsonResource() {
        context.load().binaryFile("/container/layouts-empty.json", GridContainer.LAYOUTS_JSON_PATH);

        getColumnContainer();

        List<LoggingEvent> events = logger.getLoggingEvents();

        assertEquals(1, events.size());
        assertEquals(Level.ERROR, events.get(0).getLevel());
        assertEquals("Grid container JSON structure is empty or missing 'items'.",
                events.get(0).getThrowable().get().getMessage());
    }

    @Test
    @DisplayName("the layout type columns using standard three columns")
    void testColumnsContainerUsingStandardThreeColumns() {
        context.load().binaryFile("/container/layouts.json", GridContainer.LAYOUTS_JSON_PATH);

        GridContainer gridContainer = getColumnContainer("standard-three-columns");

        Map<String, GridContainerImpl.ColumnBreakpoint> mappedLayout = gridContainer.getMappedColumnsLayout();

        assertEquals(2, mappedLayout.size());
        assertEquals(3, gridContainer.getContainerColumns().length);
        assertEquals("standard-three-columns", gridContainer.getColumnsLayout());

        GridContainerImpl.ColumnBreakpoint initialBreakpoint = mappedLayout.get(BREAKPOINT_INITIAL);
        List<GridContainerImpl.ColumnConfiguration> initialBreakpointColumns = initialBreakpoint.getColumns();

        assertEquals(1, initialBreakpoint.getDisplayColumns());
        assertEquals(3, initialBreakpointColumns.size());

        GridContainerImpl.ColumnBreakpoint smBreakpoint = mappedLayout.get(BREAKPOINT_SM);

        assertEquals(3, smBreakpoint.getDisplayColumns());
        assertNull(smBreakpoint.getColumns().get(0));
    }

    @Test
    @DisplayName("the layout type columns using grid columns")
    void testColumnsContainerUsingGridColumns() {
        context.load().binaryFile("/container/layouts.json", GridContainer.LAYOUTS_JSON_PATH);

        GridContainer gridContainer = getColumnContainer("grid");

        Map<String, GridContainerImpl.ColumnBreakpoint> mappedLayout = gridContainer.getMappedColumnsLayout();

        assertEquals(3, mappedLayout.size());
        assertEquals(3, gridContainer.getContainerColumns().length);
        assertEquals("grid", gridContainer.getColumnsLayout());

        GridContainerImpl.ColumnBreakpoint initialBreakpoint = mappedLayout.get(BREAKPOINT_INITIAL);
        List<GridContainerImpl.ColumnConfiguration> initialBreakpointColumns = initialBreakpoint.getColumns();

        assertEquals(1, initialBreakpoint.getDisplayColumns());
        assertEquals(3, initialBreakpointColumns.size());

        GridContainerImpl.ColumnBreakpoint lgBreakpoint = mappedLayout.get(BREAKPOINT_LG);

        assertEquals(3, lgBreakpoint.getDisplayColumns());
        assertNotNull(lgBreakpoint.getColumns().get(0));
        assertEquals(3, lgBreakpoint.getColumns().get(0).getRowSpan());
        assertEquals(2, lgBreakpoint.getColumns().get(1).getColumnSpan());
        assertEquals(2, lgBreakpoint.getColumns().get(2).getColumnSpan());
        assertEquals(2, lgBreakpoint.getColumns().get(2).getRowSpan());
    }

    private void getColumnContainer() {
        getColumnContainer(null);
    }

    private GridContainer getColumnContainer(String columnsTypeName) {
        context.create().resource(String.format("/content/container/columns/%s", columnsTypeName),
                SLING_RESOURCE_TYPE_PROPERTY, GridContainer.RESOURCE_TYPE,
                "columnsLayout", columnsTypeName,
                "layout", GridContainer.LayoutType.COLUMNS.getLayout());

        return getContainerUnderTest(String.format("%s/%s",
                GridContainer.LayoutType.COLUMNS.getLayout(),
                columnsTypeName));
    }

    private GridContainer getContainerUnderTest(String containerPath) {
        context.currentResource("/content/container/" + containerPath);

        GridContainer gridContainer = context.request().adaptTo(GridContainer.class);
        assertNotNull(gridContainer);

        logger = TestLoggerFactory.getTestLogger(gridContainer.getClass());

        return gridContainer;
    }
}
