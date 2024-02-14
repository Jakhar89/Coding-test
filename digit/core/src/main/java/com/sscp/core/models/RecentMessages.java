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
 * Recent Messages Component
 */
@Model(
        adaptables = {SlingHttpServletRequest.class, Resource.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
        resourceType = "sscp/components/recentmessages"
)
@Exporter(name= "jackson", extensions = "json")
public class RecentMessages {

    @ValueMapValue
    private String recentMessagesTitle;
    
    @ValueMapValue
    private String buttonLabel;
    
    @ValueMapValue
    private String buttonPath;
    
    @ValueMapValue
    private String noMessageTitle;
    
    @ValueMapValue
    private String noMessageDescription;
    
    @JsonIgnore
    private String json;
    
    @PostConstruct
    protected void init() {
        this.json = new GsonBuilder().create().toJson(this);
    }
    
    public String getRecentMessagesTitle() { return this.recentMessagesTitle; }
    
    public String getButtonLabel() { return this.buttonLabel; }
    
    public String getButtonPath() { return this.buttonPath; }
    
    public String getNoMessageTitle() { return this.noMessageTitle; }
    
    public String getNoMessageDescription() { return this.noMessageDescription; }
    
    public String getJson() { return json; }
}
