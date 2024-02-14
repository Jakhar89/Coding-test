package com.sscp.core.models;

import com.adobe.cq.wcm.core.components.models.LayoutContainer;
import com.sscp.core.impl.models.GridContainerImpl;
import org.jetbrains.annotations.NotNull;

import java.util.Map;

public interface GridContainer extends LayoutContainer {
    @SuppressWarnings({"CQRules:CQBP-71", "java:S1075"})
    String LAYOUTS_JSON_PATH = "/apps/sscp/components/container/dialog/layouts.json";

    String RESOURCE_TYPE = "sscp/components/container";

    @NotNull
    default LayoutType getGridLayout() {
        return LayoutType.SIMPLE;
    }

    default int[] getContainerColumns() {
        throw new UnsupportedOperationException();
    }

    default Map<String, GridContainerImpl.ColumnBreakpoint> getMappedColumnsLayout() {
        throw new UnsupportedOperationException();
    }

    default String getContainerClass() {
        throw new UnsupportedOperationException();
    }

    default String getColumnsLayout() {
        throw new UnsupportedOperationException();
    }

    enum LayoutType {
        SIMPLE("simple"),
        RESPONSIVE_GRID("responsiveGrid"),
        COLUMNS("columns");

        private final String layout;

        LayoutType(String layout) {
            this.layout = layout;
        }

        public String getLayout() {
            return layout;
        }

        public static LayoutType getLayoutType(String layout) {
            for (LayoutType layoutType : values()) {
                if (layoutType.layout.equals(layout)) {
                    return layoutType;
                }
            }

            return null;
        }
    }
}
