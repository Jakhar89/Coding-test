package com.sscp.core.impl.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.wcm.core.components.models.LayoutContainer;
import com.adobe.cq.wcm.core.components.models.ListItem;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.sscp.core.models.GridContainer;
import com.sscp.core.support.components.AbstractComponentImpl;
import com.sscp.core.support.constants.ApplicationConstants;
import com.sscp.core.util.CommonUtils;
import com.sscp.core.util.JsonUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceUtil;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.apache.sling.models.annotations.Exporter;

import javax.annotation.PostConstruct;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.Workspace;
import java.util.*;
import java.util.stream.StreamSupport;

import static com.sscp.core.support.constants.Constants.*;

@Slf4j
@Model(
        adaptables = {SlingHttpServletRequest.class, Resource.class},
        adapters = {LayoutContainer.class, GridContainer.class},
        resourceType = {GridContainer.RESOURCE_TYPE},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
@Exporter(name= "jackson", extensions = "json")
public class GridContainerImpl extends AbstractComponentImpl implements GridContainer {
    protected static final String[] BREAKPOINTS = new String[]{
            BREAKPOINT_SM,
            BREAKPOINT_MD,
            BREAKPOINT_LG,
            BREAKPOINT_XL,
            BREAKPOINT_2XL,
    };

    private final Map<String, ColumnBreakpoint> columnsMap = new LinkedHashMap<>();

    private int columnsCount;

    @Self
    @Via(type = ResourceSuperType.class)
    private LayoutContainer layoutContainer;

    @ValueMapValue
    @Nullable
    private String accessibilityLabel;

    @ValueMapValue
    @Nullable
    private String roleAttribute;

    @ValueMapValue
    private String columnsLayout;

    @ValueMapValue
    private String containerClass;

    @ValueMapValue(name = "layout")
    private LayoutType gridLayout;

    @Override
    @PostConstruct
    protected void init() {
        super.init();

        gridLayout = Optional.ofNullable(
                        Optional.ofNullable(resource.getValueMap().get(LayoutContainer.PN_LAYOUT, String.class))
                                .orElseGet(() -> Optional.ofNullable(currentStyle)
                                        .map(style -> currentStyle.get(LayoutContainer.PN_LAYOUT, String.class))
                                        .orElse(null)
                                ))
                .map(LayoutType::getLayoutType)
                .orElse(LayoutType.SIMPLE);

        if (gridLayout.equals(LayoutType.COLUMNS)) {
            processColumnsConfiguration();
        }
    }

    /**
     * Attempt to retrieve the container layouts JSON data.
     *
     * @return a {@link JsonObject} when valid, or {@code null}
     */
    @Nullable
    private JsonObject getContainerLayoutJson() {
        try (ResourceResolver resolver = CommonUtils.getInstance().getServiceResourceResolver(
                resourceResolverFactory,
                ApplicationConstants.SERVICE_USER)) {
            return JsonUtils.getInstance().getJsonObjectFromPath(LAYOUTS_JSON_PATH, resolver);
        } catch (LoginException ex) {
            log.error("The column layout JSON structure could not be resolved!", ex);
        }

        return null;
    }

    /**
     * Process the layout configuration into individual breakpoints.
     */
    private void processColumnsConfiguration() {
        try {
            JsonObject columnsLayoutJson = getContainerLayoutJson();

            if (columnsLayoutJson == null) {
                throw new NoSuchElementException("Grid container JSON structure is invalid.");
            }

            if (!columnsLayoutJson.has("items")) {
                throw new NoSuchFieldException("Grid container JSON structure is empty or missing 'items'.");
            }

            for (JsonElement item : columnsLayoutJson.getAsJsonArray("items")) {
                JsonObject itemConfig = item.getAsJsonObject();

                if (!itemConfig.get("value").getAsString().equals(columnsLayout)) {
                    continue;
                }

                columnsCount = itemConfig.get(GRID_COLUMNS).getAsInt();

                JsonObject initialLayout = getInitialLayoutConfiguration(itemConfig);

                columnsMap.put(BREAKPOINT_INITIAL, new ColumnBreakpoint(BREAKPOINT_INITIAL, initialLayout));

                processColumnBreakpoints(itemConfig, initialLayout);

                if (wcmmode != null && wcmmode.isEdit()) {
                    handleOrphanedChildren();
                }
            }
        } catch (NoSuchElementException | NoSuchFieldException ex) {
            log.error("The column layout JSON structure could not be resolved/parsed!", ex);
        }
    }

    /**
     * Generate the initial layout configuration.
     *
     * @param itemConfig configuration for the selected column layout
     * @return initial layout configuration
     */
    private JsonObject getInitialLayoutConfiguration(final @NotNull JsonObject itemConfig) {
        JsonObject initialLayout = new JsonObject();

        if (itemConfig.has("initialLayout")) {
            JsonElement config = itemConfig.get("initialLayout");

            if (config.isJsonObject()) {
                initialLayout = config.getAsJsonObject();
            } else {
                initialLayout.addProperty(GRID_DISPLAY_COLUMNS, config.getAsInt());
            }
        } else {
            initialLayout.addProperty(GRID_DISPLAY_COLUMNS, columnsCount);
            initialLayout.addProperty(GRID_FALLBACK, true);
        }

        return initialLayout;
    }

    /**
     * Process the layout configuration for each defined breakpoint.
     *
     * @param itemConfig    configuration for the selected column layout
     * @param initialLayout the initial layout to apply for the 'sm' breakpoint
     */
    @SuppressWarnings({"java:S3776"})
    private void processColumnBreakpoints(final @NotNull JsonObject itemConfig,
                                          final JsonObject initialLayout) {
        JsonObject layout = itemConfig.has(GRID_LAYOUT)
                ? itemConfig.getAsJsonObject(GRID_LAYOUT)
                : new JsonObject();

        for (String breakpoint : BREAKPOINTS) {
            boolean invalidSmallBreakpoint = breakpoint.equals(BREAKPOINT_SM) && !layout.has(breakpoint);

            if (invalidSmallBreakpoint || layout.has(breakpoint)) {
                JsonObject breakpointConfig = invalidSmallBreakpoint ? initialLayout : null;

                if (breakpointConfig == null) {
                    JsonElement breakpointLayout = layout.get(breakpoint);
                    breakpointConfig = new JsonObject();

                    if (breakpointLayout.isJsonObject()) {
                        breakpointConfig = breakpointLayout.getAsJsonObject();
                    } else {
                        breakpointConfig.addProperty(GRID_DISPLAY_COLUMNS, breakpointLayout.getAsInt());
                    }
                }

                columnsMap.put(breakpoint, new ColumnBreakpoint(breakpoint, breakpointConfig));
            }
        }
    }

    /**
     * Takes any child column nodes of the container component and moves all orphans within
     * the selected layout as siblings of the container component instead.
     */
    @SuppressWarnings("java:S3776")
    private void handleOrphanedChildren() {
        Session session = resource.getResourceResolver().adaptTo(Session.class);

        if (session != null) {
            long childrenCount = StreamSupport.stream(resource.getChildren().spliterator(), false).count();

            if (childrenCount > columnsCount) {
                Workspace workspace = session.getWorkspace();

                for (long i = childrenCount; i > columnsCount; i--) {
                    Resource childResource = resource.getChild("column_" + (i - 1));
                    Resource parentResource = resource.getParent();

                    if (childResource != null && parentResource != null && !ResourceUtil.isNonExistingResource(resource)) {
                        String childPath = childResource.getPath();

                        try {
                            String childResourceType = childResource.getResourceType();

                            workspace.move(childPath, String.format(
                                    "%s/%s_%d",
                                    parentResource.getPath(),
                                    childResourceType.substring(childResourceType.lastIndexOf("/") + 1),
                                    new Date().getTime()));
                        } catch (RepositoryException ex) {
                            log.error("Unexpected while moving child container component.", ex);
                        }
                    }
                }
            }
        }
    }

    /**
     * Generate a static integer array to symbolise the column layout.
     *
     * @return static {@code int[]} array
     */
    @Override
    public int[] getContainerColumns() {
        return new int[Math.max(columnsCount, 0)];
    }

    /**
     * Returns the chosen container class for the component.
     *
     * @return {@link String}
     */
    @Override
    public String getContainerClass() {
        return containerClass;
    }

    /**
     * Retrieve the breakpoint configuration map.
     *
     * @return a new {@link Map} instance containing the breakpoint configurations
     */
    @Override
    public Map<String, ColumnBreakpoint> getMappedColumnsLayout() {
        return columnsMap;
    }

    @Override
    @NotNull
    public LayoutType getGridLayout() {
        return gridLayout;
    }

    @Override
    @NotNull
    public String getColumnsLayout() {
        return columnsLayout;
    }

    @Override
    @NotNull
    public LayoutContainer.LayoutType getLayout() {
        return layoutContainer.getLayout();
    }

    @Override
    @JsonIgnore
    @NotNull
    public List<ListItem> getItems() {
        return layoutContainer.getItems();
    }

    @Override
    @JsonIgnore
    public String getBackgroundStyle() {
        return layoutContainer.getBackgroundStyle();
    }

    @Override
    @NotNull
    public String getExportedType() {
        return RESOURCE_TYPE;
    }

    @Override
    @NotNull
    public Map<String, ? extends ComponentExporter> getExportedItems() {
        return layoutContainer.getExportedItems();
    }

    @Override
    @NotNull
    public String[] getExportedItemsOrder() {
        return layoutContainer.getExportedItemsOrder();
    }

    @Override
    @Nullable
    public String getAccessibilityLabel() {
        return accessibilityLabel;
    }

    @Override
    @Nullable
    public String getRoleAttribute() {
        return roleAttribute;
    }

    public class ColumnBreakpoint {
        private final List<ColumnConfiguration> columns = new LinkedList<>();
        private final String breakpointName;
        private final JsonObject config;

        public ColumnBreakpoint(final String breakpoint, final JsonObject breakpointConfig) {
            breakpointName = breakpoint;
            config = breakpointConfig;

            JsonObject layout = config.has(GRID_LAYOUT)
                    ? config.getAsJsonObject(GRID_LAYOUT)
                    : new JsonObject();

            for (int i = 0; i < columnsCount; i++) {
                columns.add(i, layout.has(String.valueOf(i))
                        ? new ColumnConfiguration(layout.get(String.valueOf(i)))
                        : null);
            }
        }

        /**
         * Retrieve the total number of display columns.
         *
         * @return {@code int} representing the total
         */
        public int getDisplayColumns() {
            if (breakpointName.equals(BREAKPOINT_INITIAL) && config.has(GRID_FALLBACK)) {
                return GRID_FALLBACK_SPAN;
            }

            return config.has(GRID_DISPLAY_COLUMNS)
                    ? config.get(GRID_DISPLAY_COLUMNS).getAsInt()
                    : columnsCount;
        }

        /**
         * Retrieve the column configuration.
         *
         * @return list of {@link ColumnConfiguration} objects
         */
        public List<ColumnConfiguration> getColumns() {
            return Collections.unmodifiableList(columns);
        }
    }

    public static class ColumnConfiguration {
        private final JsonObject columnConfig;

        ColumnConfiguration(final @NotNull JsonElement config) {
            JsonObject columnLayout = new JsonObject();

            if (config.isJsonObject()) {
                columnLayout = config.getAsJsonObject();
            } else {
                columnLayout.addProperty(GRID_COLUMN_SPAN, config.getAsInt());
            }

            columnConfig = columnLayout;
        }

        @Nullable
        public Map<String, Integer> getOffset() {
            if (!columnConfig.has(GRID_OFFSET)) {
                return null;
            }

            JsonObject offsetConfig = columnConfig.getAsJsonObject(GRID_OFFSET);

            Map<String, Integer> offsetMap = new HashMap<>();
            offsetMap.put("end", offsetConfig.get("end").getAsInt());
            offsetMap.put("start", offsetConfig.get("start").getAsInt());

            return offsetMap;
        }

        @Nullable
        public Integer getColumnSpan() {
            return columnConfig.has(GRID_COLUMN_SPAN) ? columnConfig.get(GRID_COLUMN_SPAN).getAsInt() : null;
        }

        @Nullable
        public Integer getRowSpan() {
            return columnConfig.has(GRID_ROW_SPAN) ? columnConfig.get(GRID_ROW_SPAN).getAsInt() : null;
        }
    }
}
