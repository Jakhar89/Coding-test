package com.sscp.core.models;

import com.sscp.core.util.GlobalDataMapUtil;
import com.sscp.core.util.ModelUtil;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.Arrays;

/**
 * Terms Of Use Component
 */
@Model(
        adaptables = {SlingHttpServletRequest.class, Resource.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
        resourceType = "sscp/components/termsofuse"
)
@Exporter(name= "jackson", extensions = "json")
public class TermsOfUse {

	private static final String ID = "id";
	private static final String TEXT = "text";
	private static final String TERMSOFUSE = "termsOfUse";

	private JsonArray itemList;
	
	@Inject
	private transient InheritanceValueMap pageProperties;

	@ValueMapValue
	private String termsOfUseTitle;

	private String termsOfUse;

	@JsonIgnore
	private String json;

	@Inject
	private Resource resource;

	@Inject
	@SlingObject
	private transient ResourceResolver resourceResolver;

	@SlingObject
	private transient SlingHttpServletRequest request;

	@PostConstruct
	protected void init() {
		itemList = ModelUtil.toJsonArray(getResource().getChild("itemList"), Arrays.asList(new String[]{ID, TEXT}));
		termsOfUse = pageProperties.getInherited(TERMSOFUSE, String.class);//GlobalDataMapUtil.getAttributeValue(resourceResolver, request, TERMSOFUSE);
		resource = null;
		this.json = new GsonBuilder().create().toJson(this);
	}

	public String getTermsOfUseTitle() { return termsOfUseTitle; }

	public String getTermsOfUse() { return termsOfUse; }

	public JsonArray getItemList() { return itemList; }

	public Resource getResource() { return resource; }

	public String getJson() { return json; }
}
