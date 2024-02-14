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
 * Payment Options Component
 */
@Model(
		adaptables = {SlingHttpServletRequest.class, Resource.class},
		defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
		resourceType = {"sscp/components/getintouch","sscp/components/ctawithassetpicker"}
		)
@Exporter(name= "jackson", extensions = "json")
public class GetInTouch {

	@Inject
	private Resource resource;

	@OSGiService
	@Self
	private BrandvariablesValueMapping brandVariablesMapping;

	@ValueMapValue
	private String title;

	@ValueMapValue
	private String summary;

	@ValueMapValue
	private String buttonLabel;

	@ValueMapValue
	private String iconName;

	@ValueMapValue
	private String ctaImagePath;

	@ValueMapValue
	private String buttonPath;

	@JsonIgnore
	private String json;

	@PostConstruct
	protected void init() {
		Page currentPage = resource.getResourceResolver().adaptTo(PageManager.class).getContainingPage(resource);
		resource = null;
		this.json = new GsonBuilder().create().toJson(this);
		this.json = brandVariablesMapping.mapBrandVariableValues(currentPage, this.json);
	}

	public String getTitle() { return this.title; }

	public String getSummary() { return this.summary; }

	public String getButtonLabel() { return this.buttonLabel; }

	public String getIconName() { return this.iconName; }

	public String getCtaImagePath() { return this.ctaImagePath; }

	public String getButtonPath() { return this.buttonPath; }

	public String getJson() { return json; }
}
