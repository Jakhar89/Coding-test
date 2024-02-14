package com.sscp.core.models;

public interface ColumnControl extends Component {
	
	String LAYOUTS_JSON_PATH = "/apps/sscp/components/column-control/datasource/layouts.json";

    String RESOURCE_TYPE = "sscp/components/column-control";
    
    default String getColumnsLayout() {
        throw new UnsupportedOperationException();
    }

	@Override
    public default String getExportedType() {
        return RESOURCE_TYPE;
    }
}
