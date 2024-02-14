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

/**
 * Profile Name Component
 */
@Model(
        adaptables = {SlingHttpServletRequest.class, Resource.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
        resourceType = "sscp/components/profilename"
)
@Exporter(name= "jackson", extensions = "json")
public class ProfileName {

	@OSGiService
	@Self
	private GlobalConfigurationService globalConfig;

	@ValueMapValue
	private String profileNameTitle;

	@ValueMapValue
	private String title;

	@ValueMapValue
	private String givenName;

	@ValueMapValue
	private String middleName;

	@ValueMapValue
	private String familyName;

	@JsonIgnore
	private String json;

	@PostConstruct
	protected void init() {
		this.json = new GsonBuilder().create().toJson(this);
	}

	public String getProfileNameTitle() { return profileNameTitle; }

	public String getTitle() { return title; }

	public String getGivenName() { return givenName; }

	public String getMiddleName() { return middleName; }

	public String getFamilyName() { return familyName; }

	public String getJson() { return json; }
}
