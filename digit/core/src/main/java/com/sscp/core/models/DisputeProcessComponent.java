package com.sscp.core.models;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.gson.GsonBuilder;
import com.sscp.core.services.BrandvariablesValueMapping;
import com.sscp.core.services.GlobalConfigurationService;
import com.sscp.core.util.ModelUtil;
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
import java.util.Arrays;
import com.google.gson.JsonArray;

/**
 * Dispute Process Component
 */
@Model(
        adaptables = {SlingHttpServletRequest.class, Resource.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
        resourceType = "sscp/components/disputeprocesscomponent"
)
@Exporter(name= "jackson", extensions = "json")
public class DisputeProcessComponent {
    private static final String TITLE = "title";
   	private static final String DESC= "description";
    
    private JsonArray disputeComponentPropertyList;

    @OSGiService
	@Self
	private GlobalConfigurationService globalConfig;
    
    @OSGiService
	@Self
	private BrandvariablesValueMapping brandVariablesMapping;

	@ValueMapValue
	private String infoDisclaimer;

	@JsonIgnore
	private String json;

    @Inject
	private Resource resource;

	@PostConstruct
	protected void init() {
		disputeComponentPropertyList = ModelUtil.toJsonArray(getResource().getChild("disputeComponentPropertiesItem"), Arrays.asList(new String[]{TITLE, DESC}));
		Page currentPage = resource.getResourceResolver().adaptTo(PageManager.class).getContainingPage(resource);
		resource = null;
        this.json = new GsonBuilder().create().toJson(this);
        this.json = brandVariablesMapping.mapBrandVariableValues(currentPage, this.json);
    }

    public JsonArray getDisputeComponentPropertyList() { return disputeComponentPropertyList; }

    public String getInfoDisclaimer() { return this.infoDisclaimer; }

    public String getJson() { return json; }

    public Resource getResource() { return resource; }
}
