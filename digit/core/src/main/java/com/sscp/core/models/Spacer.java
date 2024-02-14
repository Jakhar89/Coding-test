package com.sscp.core.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.gson.GsonBuilder;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;

/**
 * Spacer Component
 */
@Model(
        adaptables = {SlingHttpServletRequest.class, Resource.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
        resourceType = "sscp/components/spacer"
)
@Exporter(name= "jackson", extensions = "json")
public class Spacer {

	@ValueMapValue
	private Integer desktopSpace;

	@ValueMapValue
	private Integer tabletSpace;

	@ValueMapValue
	private Integer mobileSpace;

	@JsonIgnore
	private String json;

	@PostConstruct
	protected void init() {
		this.json = new GsonBuilder().create().toJson(this);
	}

	public Integer getDesktopSpace() { return desktopSpace; }

	public Integer getTabletSpace() { return tabletSpace; }

	public Integer getMobileSpace() { return mobileSpace; }

	public String getJson() { return json; }
}
