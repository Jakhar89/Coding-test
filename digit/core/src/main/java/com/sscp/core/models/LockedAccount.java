package com.sscp.core.models;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.gson.GsonBuilder;
import com.sscp.core.services.BrandvariablesValueMapping;
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
 * Locked Account Component
 */
@Model(
        adaptables = {SlingHttpServletRequest.class, Resource.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
        resourceType = "sscp/components/lockedaccount"
)
@Exporter(name= "jackson", extensions = "json")
public class LockedAccount {

	@Inject
	@Self
	private CommunicationsConfig communicationsConfig;

	@OSGiService
	@Self
	private GlobalConfigurationService globalConfig;
	
	@Inject
	private Resource resource;

	@OSGiService
	@Self
	private BrandvariablesValueMapping brandVariablesMapping;

	@ValueMapValue
	private String lockedIcon;

	@ValueMapValue
	private String lockedTitle;

	@ValueMapValue
	private String lockedDescription;

	@ValueMapValue
	private String lockedButtonText;

	@ValueMapValue
	private String eventName;

	@ValueMapValue
	private String unlockedIcon;

	@ValueMapValue
	private String unlockedTitle;

	@ValueMapValue
	private String unlockedDescription;

	@ValueMapValue
	private String loginButtonText;

	@ValueMapValue
	private String resetButtonText;

	@ValueMapValue
	private String setPasswordText;

	@JsonIgnore
	private String json;

	@PostConstruct
	protected void init() {
		Page currentPage = resource.getResourceResolver().adaptTo(PageManager.class).getContainingPage(resource);
		resource = null;
		this.json = new GsonBuilder().create().toJson(this);
		this.json = brandVariablesMapping.mapBrandVariableValues(currentPage, this.json);
	}

	public String getLockedIcon() { return lockedIcon; }

	public String getLockedTitle() { return lockedTitle; }

	public String getLockedDescription() { return lockedDescription; }

	public String getLockedButtonText() { return lockedButtonText; }

	public String getEventName() { return eventName; }

	public String getUnlockedIcon() { return unlockedIcon; }

	public String getUnlockedTitle() { return unlockedTitle; }

	public String getUnlockedDescription() { return unlockedDescription; }

	public String getLoginButtonText() { return loginButtonText; }

	public String getResetButtonText() { return resetButtonText; }

	public String getSetPasswordText() { return setPasswordText; }

	public String getJson() { return json; }
}
