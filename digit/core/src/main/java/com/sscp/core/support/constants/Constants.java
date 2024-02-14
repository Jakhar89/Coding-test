package com.sscp.core.support.constants;

public class Constants {
    public static final String DIALOG_RESOURCE_PATTERN = "\\/mnt\\/override\\/apps\\/(\\/?[\\w]+)+\\/cq:dialog";

    public static final String DIALOG_CQ_RESOURCE_PATH = "cq/gui/components/authoring/dialog";
    public static final String DIALOG_GRANITE_RESOURCE_PATH = "granite/ui/components/coral/foundation/form";

    public static final String BREAKPOINT_INITIAL = "initial";
    public static final String BREAKPOINT_SM = "sm";
    public static final String BREAKPOINT_MD = "md";
    public static final String BREAKPOINT_LG = "lg";
    public static final String BREAKPOINT_XL = "xl";
    public static final String BREAKPOINT_2XL = "2xl";

    public static final int GRID_FALLBACK_SPAN = 1;
    public static final String GRID_COLUMNS = "columns";
    public static final String GRID_OFFSET = "offset";
    public static final String GRID_COLUMN_SPAN = "columnSpan";
    public static final String GRID_ROW_SPAN = "rowSpan";
    public static final String GRID_DISPLAY_COLUMNS = "displayColumns";
    public static final String GRID_FALLBACK = "fallback";
    public static final String GRID_LAYOUT = "layout";

    public static final String EXT_HTML = "html";

    private Constants() {
        // Does nothing as this class only contains static constants
    }
}
