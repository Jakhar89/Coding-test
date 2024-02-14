package com.sscp.core.impl.models;

import java.util.Arrays;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.sscp.core.models.Component;
import com.sscp.core.models.BrandVariablesConfig;
import com.sscp.core.models.TransactionHistory;
import com.sscp.core.services.GlobalConfigurationService;
import com.sscp.core.services.datasource.JsonDataSourceService;
import com.sscp.core.util.ModelUtil;

@Model(
		adaptables = {SlingHttpServletRequest.class, Resource.class},
		adapters = {Component.class, TransactionHistory.class},
		resourceType = {TransactionHistory.RESOURCE_TYPE},
		defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
		)
@Exporter(name= "jackson", extensions = "json")
public class TransactionHistoryImpl implements TransactionHistory {
	
	@OSGiService
	@Self
	private GlobalConfigurationService globalConfig;

	@Inject
	@Self
	private BrandVariablesConfig brandVariablesConfig;
	
	private static final Logger LOG = LoggerFactory.getLogger(TransactionHistoryImpl.class);
	
	@JsonIgnore
	private String json;

	@Inject
	private Resource resource;
	
	@ValueMapValue
	private String transactionTitle;
	
	@ValueMapValue
	private String filtersText;
	
	@ValueMapValue
	private String filter1;
	
	@ValueMapValue
	private String filter1Placeholder;
	
	@ValueMapValue
	private String filter1Icon;
	
	@ValueMapValue
	private String filter2;
	
	@ValueMapValue
	private String filter3;
	
	@ValueMapValue
	private String filter4;
	
	@ValueMapValue
	private String filter4Placeholder;
	
	@ValueMapValue
	private String tableHeader1;
	
	@ValueMapValue
	private String tableHeader2;
	
	@ValueMapValue
	private String tableHeader3;
	
	@ValueMapValue
	private String tableHeader4;
	
	@ValueMapValue
	private String exportButtonLabel;
	
	@ValueMapValue
	private String noTransactions;
	
	@ValueMapValue
	private String accountNumberText;

	@ValueMapValue
	private String transactionPeriodText;
	
	private JsonArray transactionTypes;
	
	@PostConstruct
	protected void init() {
		transactionTypes = ModelUtil.toJsonArray(getResource().getChild("transactionTypes"), Arrays.asList(new String[]{"type"}));
		/*for(int i=0; i<tranTypes.size(); i++) {
			JsonElement jsonElem = tranTypes.get(i);
			LOG.error(jsonElem +"  get json elemnentn  " + jsonElem.getAsJsonObject().get("type").getAsString());
			if(jsonElem.getAsJsonObject().get("type") != null)
			transactionTypes.add(jsonElem.getAsJsonObject().get("type").getAsString());
		}*/
		resource = null;
		this.json = new GsonBuilder().create().toJson(this);
	}
	
	public JsonArray getTransactionTypes() {
		return transactionTypes;
	}

	public GlobalConfigurationService getGlobalConfig() {
		return globalConfig;
	}

	public String getTransactionTitle() {
		return transactionTitle;
	}

	public String getFiltersText() {
		return filtersText;
	}

	public String getFilter1() {
		return filter1;
	}

	public String getFilter1Placeholder() {
		return filter1Placeholder;
	}

	public String getFilter1Icon() {
		return filter1Icon;
	}

	public String getFilter2() {
		return filter2;
	}

	public String getFilter3() {
		return filter3;
	}

	public String getFilter4() {
		return filter4;
	}

	public String getFilter4Placeholder() {
		return filter4Placeholder;
	}

	public String getTableHeader1() {
		return tableHeader1;
	}

	public String getTableHeader2() {
		return tableHeader2;
	}

	public String getTableHeader3() {
		return tableHeader3;
	}

	public String getTableHeader4() {
		return tableHeader4;
	}

	public String getExportButtonLabel() {
		return exportButtonLabel;
	}

	public String getNoTransactions() {
		return noTransactions;
	}

	public String getAccountNumberText() {
		return accountNumberText;
	}

	public String getTransactionPeriodText() {
		return transactionPeriodText;
	}

	//public JsonArray getTransactionTypes() { return transactionTypes; }
	
	public String getJson() { return json; }

    public Resource getResource() { return resource; }

}


