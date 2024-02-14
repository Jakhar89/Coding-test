package com.sscp.core.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.gson.GsonBuilder;
import com.sscp.core.services.GlobalConfigurationService;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

/**
 * Marketing and Communications Component
 */
@Model(
        adaptables = {SlingHttpServletRequest.class, Resource.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
        resourceType = "sscp/components/marketingandcommunications"
)
@Exporter(name= "jackson", extensions = "json")
public class MarketingAndCommunications {

	@OSGiService
	@Self
	private GlobalConfigurationService globalConfig;

	@Inject
   	@Self
   	private CommunicationsConfig communicationsConfig;

	@ValueMapValue
	private String marketingAndCommunicationsTitle;

	@ValueMapValue
	private String marketingPreferenceDescription;

	@ValueMapValue
	private String marketingPreferenceYes;

	@ValueMapValue
	private String marketingPreferenceNo;

	@ValueMapValue
	private String correspondenceMethodDescription;

	@ValueMapValue
	private String correspondenceMethodEmail;

	@ValueMapValue
	private String correspondenceMethodPaper;

	@ValueMapValue
	private String marketingAndCommunicationsEditTitle;

	@ValueMapValue
	private String marketingCommunicationsErrorTitle;

	@ValueMapValue
	private String marketingCommunicationsErrorDescription;

	@ValueMapValue
	private String saveButtonText;

	@ValueMapValue
	private String cancelButtonText;

	@JsonIgnore
	private String json;

	@PostConstruct
	protected void init() {
		this.json = new GsonBuilder().create().toJson(this);
	}

	public String getMarketingAndCommunicationsTitle() { return marketingAndCommunicationsTitle; }

	public String getMarketingPreferenceDescription() { return marketingPreferenceDescription; }

	public String getMarketingPreferenceYes() { return marketingPreferenceYes; }

	public String getMarketingPreferenceNo() { return marketingPreferenceNo; }

	public String getCorrespondenceMethodDescription() { return correspondenceMethodDescription; }

	public String getCorrespondenceMethodEmail() { return correspondenceMethodEmail; }

	public String getCorrespondenceMethodPaper() { return correspondenceMethodPaper; }

	public String getMarketingAndCommunicationsEditTitle() { return this.marketingAndCommunicationsEditTitle; }

	public String getMarketingCommunicationsErrorTitle() { return this.marketingCommunicationsErrorTitle; }

	public String getMarketingCommunicationsErrorDescription() { return this.marketingCommunicationsErrorDescription; }

	public String getSaveButtonText() { return saveButtonText; }

	public String getCancelButtonText() { return cancelButtonText; }

	public String getJson() { return json; }
}
