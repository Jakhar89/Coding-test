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
 * Text Component
 */

@Model(
        adaptables = {SlingHttpServletRequest.class, Resource.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
        resourceType = "sscp/components/text"
)
@Exporter(name= "jackson", extensions = "json")
public class Text {

    @ValueMapValue
    private String text;

    @JsonIgnore
    private String json;

    @PostConstruct
    protected void init() {
        this.json = new GsonBuilder().create().toJson(this);
    }

    public String getText() { return text; }

    public String getJson() { return json; }
}
