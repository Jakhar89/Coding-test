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
 * Email Address Component
 */
@Model(
        adaptables = {SlingHttpServletRequest.class, Resource.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
        resourceType = "sscp/components/emailaddress"
)
@Exporter(name= "jackson", extensions = "json")
public class EmailAddress {

	@Inject
   	@Self
   	private CommunicationsConfig communicationsConfig;

	@OSGiService
	@Self
	private GlobalConfigurationService globalConfig;

	@ValueMapValue
	private String emailAddressLabelText;

	@ValueMapValue
	private String loginLabelText;

	@ValueMapValue
	private String personalLabelText;

	@ValueMapValue
	private String workLabelText;

	@ValueMapValue
	private String emailAddressEditTitle;

	@ValueMapValue
	private String introductoryText;

	@ValueMapValue
	private String loginEmailText;

	@ValueMapValue
	private String preferredContactTitle;

	@ValueMapValue
	private String preferredContactDescription;

	@ValueMapValue
	private String loginEmailTitle;

	@ValueMapValue
	private String loginEmailDescription;

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

	public String getEmailAddressLabelText() { return this.emailAddressLabelText; }

	public String getLoginLabelText() { return this.loginLabelText; }

	public String getPersonalLabelText() { return this.personalLabelText; }

	public String getWorkLabelText() { return this.workLabelText; }

	public String getEmailAddressEditTitle() { return this.emailAddressEditTitle; }

	public String getIntroductoryText() { return this.introductoryText; }

	public String getLoginEmailText() { return this.loginEmailText; }

	public String getPreferredContactTitle() { return this.preferredContactTitle; }

	public String getPreferredContactDescription() { return this.preferredContactDescription; }

	public String getLoginEmailTitle() { return this.loginEmailTitle; }

	public String getLoginEmailDescription() { return this.loginEmailDescription; }

	public String getSaveButtonText() { return saveButtonText; }

	public String getCancelButtonText() { return cancelButtonText; }
	
	public String getJson() { return json; }
}
