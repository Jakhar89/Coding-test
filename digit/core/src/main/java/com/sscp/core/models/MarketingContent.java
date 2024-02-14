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
 * Page Notification Component
 */

@Model(
        adaptables = {SlingHttpServletRequest.class, Resource.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
        resourceType = "sscp/components/marketingcontent"
)
@Exporter(name= "jackson", extensions = "json")
public class MarketingContent {

    @OSGiService
	@Self
	private GlobalConfigurationService globalConfig;

    @ValueMapValue
    private String imagePickerMarketing;
        
    @ValueMapValue
    private String imagePickerLifestyle;

    @ValueMapValue
    private String marketingImageUrl;

    @JsonIgnore
    private String json;

    @PostConstruct
    protected void init() {
        this.json = new GsonBuilder().create().toJson(this);
    }

    public String getImagePickerMarketing() { return imagePickerMarketing; }

    public String getImagePickerLifestyle() { return imagePickerLifestyle; }

    public String getMarketingImageUrl() { return marketingImageUrl; }

    public String getJson() { return json; }
}
