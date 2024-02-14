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
 * Phone Number Component
 */
@Model(
        adaptables = {SlingHttpServletRequest.class, Resource.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
        resourceType = "sscp/components/phonenumber"
)
@Exporter(name= "jackson", extensions = "json")
public class PhoneNumber {

	@Inject
   	@Self
   	private CommunicationsConfig communicationsConfig;

	@OSGiService
	@Self
	private GlobalConfigurationService globalConfig;

	@ValueMapValue
	private String phoneNumberTitle;

	@ValueMapValue
	private String mobileLabelText;

	@ValueMapValue
	private String homeLabelText;

	@ValueMapValue
	private String workLabelText;

	@ValueMapValue
	private String otherLabelText;

	@ValueMapValue
	private String phoneNumberEditTitle;

	@ValueMapValue
	private String preferredContactTitle;

	@ValueMapValue
	private String preferredContactDescription;

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

	public String getPhoneNumberTitle() { return this.phoneNumberTitle; }

	public String getMobileLabelText() { return this.mobileLabelText; }

	public String getHomeLabelText() { return this.homeLabelText; }

	public String getWorkLabelText() { return this.workLabelText; }

	public String getOtherLabelText() {	return this.otherLabelText;	}

	public String getPhoneNumberEditTitle() { return this.phoneNumberEditTitle; }

	public String getPreferredContactTitle() { return this.preferredContactTitle; }

	public String getPreferredContactDescription() { return this.preferredContactDescription; }

	public String getSaveButtonText() { return saveButtonText; }

	public String getCancelButtonText() { return cancelButtonText; }
	
	public String getJson() { return json; }
}
