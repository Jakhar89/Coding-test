package com.sscp.core.models;

import com.day.cq.commons.inherit.InheritanceValueMap;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.gson.GsonBuilder;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

/**
 * Loading Overlay Component
 */
@Model(
        adaptables = {SlingHttpServletRequest.class, Resource.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
        resourceType = "sscp/components/loadingoverlay"
)
@Exporter(name= "jackson", extensions = "json")
public class LoadingOverlay {

	@Inject
	private transient InheritanceValueMap pageProperties;

	@ValueMapValue
	private String loadingText;

	@ValueMapValue
	private String updatingText;
	
	@ValueMapValue
	private String removingText;

	@JsonIgnore
	private String json;

	@PostConstruct
	protected void init() {
		loadingText = (null == loadingText) ? pageProperties.getInherited("loadingText", String.class) : loadingText;
		updatingText = (null == updatingText) ? pageProperties.getInherited("updatingText", String.class) : updatingText;
		removingText = (null == removingText) ? pageProperties.getInherited("removingText", String.class) : removingText;
		this.json = new GsonBuilder().create().toJson(this);
	}
	
	public String getLoadingText() { return loadingText; }

	public String getUpdatingText() { return updatingText; }

	public String getRemovingText() { return removingText; }
	
	public String getJson() { return json; }
}
