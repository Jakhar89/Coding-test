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
 * Page Notification Component
 */

@Model(
        adaptables = {SlingHttpServletRequest.class, Resource.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
        resourceType = "sscp/components/pagenotification"
)
@Exporter(name= "jackson", extensions = "json")
public class PageNotification {

    @ValueMapValue
    private Boolean isMaintainencePage;

    @ValueMapValue
    private String icon;
        
    @ValueMapValue
    private String title;

    @ValueMapValue
    private String description;

    @ValueMapValue
    private String buttonText;

    @ValueMapValue
    private String buttonUrl;

    @ValueMapValue
    private String mobileDescription;

    @ValueMapValue
    private String analyticsTrackEventName;

    @JsonIgnore
    private String json;

    @PostConstruct
    protected void init() {
        this.json = new GsonBuilder().create().toJson(this);
    }

    public Boolean getIsMaintainencePage() { return isMaintainencePage; }

    public String getTitle() { return title; }

    public String getDescription() { return description; }

    public String getIcon() { return icon; }

    public String getButtonText() { return buttonText; }

    public String getButtonUrl() { return buttonUrl; }

    public String getMobileDescription() { return mobileDescription; }

    public String getAnalyticsTrackEventName() { return analyticsTrackEventName; }

    public String getJson() { return json; }
}
