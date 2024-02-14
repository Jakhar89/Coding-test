package com.sscp.core.models;

public interface QuickLinksComponent extends Component {
	
	String RESOURCE_TYPE = "sscp/components/quicklinks";
	
	@Override
    public default String getExportedType() {
        return RESOURCE_TYPE;
    }

}
