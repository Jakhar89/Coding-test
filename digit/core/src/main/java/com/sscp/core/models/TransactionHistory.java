package com.sscp.core.models;

public interface TransactionHistory extends Component {
	
	String RESOURCE_TYPE = "sscp/components/transactionhistory";
	
	@Override
    public default String getExportedType() {
        return RESOURCE_TYPE;
    }

}
