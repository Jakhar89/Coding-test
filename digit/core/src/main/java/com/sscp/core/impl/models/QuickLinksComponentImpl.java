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

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.sscp.core.models.Component;
import com.sscp.core.models.QuickLinksComponent;
import com.sscp.core.services.GlobalConfigurationService;
import com.sscp.core.util.ModelUtil;

@Model(
		adaptables = {SlingHttpServletRequest.class, Resource.class},
		adapters = {Component.class, QuickLinksComponent.class},
		resourceType = {QuickLinksComponent.RESOURCE_TYPE},
		defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
		)
@Exporter(name= "jackson", extensions = "json")
public class QuickLinksComponentImpl implements QuickLinksComponent {
	
	protected static final String ICON = "icon";
	protected static final String  TITLE= "title";
	protected static final String LINK = "linkPath";
	protected static final String ISNEWTAB = "openInNewTab";

	@OSGiService
	@Self
	private GlobalConfigurationService globalConfig;
	
	private JsonArray quickLinks;

	@JsonIgnore
	private String json;

	@Inject
	private Resource resource;

	@PostConstruct
	protected void init() {
		quickLinks = ModelUtil.toJsonArray(getResource().getChild("quickLinks"), Arrays.asList(new String[]{ICON,TITLE,LINK,ISNEWTAB}));
		resource = null;
		this.json = new GsonBuilder().create().toJson(this);
	}
	
	public JsonArray getQuickLinks() { return quickLinks; }
	

	public String getJson() { return json; }
	

    public Resource getResource() { return resource; }


}
