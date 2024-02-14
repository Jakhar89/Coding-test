package com.sscp.core.models;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.gson.GsonBuilder;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;

import com.sscp.core.services.BrandvariablesValueMapping;
import com.sscp.core.services.GlobalConfigurationService;
import javax.annotation.PostConstruct;
import javax.inject.Inject;

/**
 * Teaser Component
 */

@Model(
        adaptables = {SlingHttpServletRequest.class, Resource.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
        resourceType = "sscp/components/teaser"
)
@Exporter(name= "jackson", extensions = "json")
public class Teaser {

    @OSGiService
	@Self
	private GlobalConfigurationService globalConfig;
    
    @Inject
	private Resource resource;
	
	@OSGiService
	@Self
	private BrandvariablesValueMapping brandVariablesMapping;
	
    @ValueMapValue(name = "jcr:title")
    private String title;

    @ValueMapValue(name = "jcr:description")
    private String description;

    @ValueMapValue(name = "fileReference")
    private String image;

    @ValueMapValue
    private Boolean isHalfWidthBanner;

    @ValueMapValue
    private Boolean isPersonalizedGreeting;

    @ValueMapValue
    private Boolean isLastLogin;

    @ValueMapValue
    private String lastLoginText;

    @ValueMapValue
    private String greetingText;

    @JsonIgnore
    private String json;

    @PostConstruct
    protected void init() {
    	Page currentPage = resource.getResourceResolver().adaptTo(PageManager.class).getContainingPage(resource);
		resource = null;
        this.json = new GsonBuilder().create().toJson(this);
        this.json = brandVariablesMapping.mapBrandVariableValues(currentPage, this.json);
    }

    public String getTitle() { return title; }

    public String getDescription() { return description; }

    public String getImage() { return image; }

    public Boolean getIsHalfWidthBanner() { return isHalfWidthBanner; }

    public Boolean getIsPersonalizedGreeting() { return isPersonalizedGreeting; }

    public Boolean getIsLastLogin() { return isLastLogin; }

    public String getLastLoginText() { return lastLoginText; }

    public String getGreetingText() { return greetingText; }

    public String getJson() { return json; }
}
