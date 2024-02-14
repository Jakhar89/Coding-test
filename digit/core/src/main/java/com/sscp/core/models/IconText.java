package com.sscp.core.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.gson.GsonBuilder;
import com.sscp.core.services.GlobalConfigurationService;
import com.sscp.core.util.ModelUtil;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;


import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.Arrays;
import com.google.gson.JsonArray;

/**
 * Payment Options Component
 */
@Model(
        adaptables = {SlingHttpServletRequest.class, Resource.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
        resourceType = "sscp/components/icontext"
)
@Exporter(name= "jackson", extensions = "json")
public class IconText {
    private static final String Icon = "icon";
    private static final String Alt = "alt";
    private static final String Description = "description";


    private JsonArray iconTextList;


    @OSGiService
	@Self
	private GlobalConfigurationService globalConfig;
    
    @JsonIgnore
	private String json;

    @Inject
	private Resource resource;


	@PostConstruct
	protected void init() {
		iconTextList = ModelUtil.toJsonArray(getResource().getChild("iconTextItem"), Arrays.asList(new String[]{Icon,Alt,Description}));
        resource = null;
        this.json = new GsonBuilder().create().toJson(this);
    }


    public JsonArray getEnquiryTypeList() { return iconTextList; }


	public String getJson() { return json; }

    public Resource getResource() { return resource; }
}
