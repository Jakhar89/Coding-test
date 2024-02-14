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
 * Manage Password Component
 */
@Model(
        adaptables = {SlingHttpServletRequest.class, Resource.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
        resourceType = "sscp/components/managepassword"
)
@Exporter(name= "jackson", extensions = "json")
public class ManagePassword {

	@Inject
	@Self
	private CommunicationsConfig communicationsConfig;

	@OSGiService
	@Self
	private GlobalConfigurationService globalConfig;

	@ValueMapValue
	private String managePasswordTitle;

	@ValueMapValue
	private String passwordText;

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

	public String getManagePasswordTitle() { return managePasswordTitle; }

	public String getPasswordText() { return passwordText; }

	public String getSaveButtonText() { return saveButtonText; }

	public String getCancelButtonText() { return cancelButtonText; }

	public String getJson() { return json; }
}
