package com.sscp.core.models;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.gson.GsonBuilder;
import com.sscp.core.services.BrandvariablesValueMapping;

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
 * Title Component
 */
@Model(
        adaptables = {SlingHttpServletRequest.class, Resource.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
        resourceType = "sscp/components/titlecomponent"
)
@Exporter(name= "jackson", extensions = "json")
public class TitleComponent {
	
	@Inject
	private Resource resource;
	
	@OSGiService
	@Self
	private BrandvariablesValueMapping brandVariablesMapping;
	
	@ValueMapValue
	private String titleText;

	@ValueMapValue
	private String description;

	@ValueMapValue
	private String linkTitle;

	@ValueMapValue
	private String redirectionPath;

	@ValueMapValue
	private Boolean isSmallTitle;

	@JsonIgnore
	private String json;

	@PostConstruct
	protected void init() {
		Page currentPage = resource.getResourceResolver().adaptTo(PageManager.class).getContainingPage(resource);
		resource = null;
		this.json = new GsonBuilder().create().toJson(this);
		this.json = brandVariablesMapping.mapBrandVariableValues(currentPage, this.json);
	}

	public String getJson() { return json; }

}
