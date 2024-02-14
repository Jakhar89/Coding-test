package com.sscp.core.models;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.gson.GsonBuilder;
import com.sscp.core.services.BrandvariablesValueMapping;
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
 * FAQ Component
 */
@Model(
        adaptables = {SlingHttpServletRequest.class, Resource.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
        resourceType = "sscp/components/faq"
)
@Exporter(name= "jackson", extensions = "json")
public class FAQ {
    private static final String title = "title";
    private static final String description= "description";
    private JsonArray faqList;
    private JsonArray faqList1;
    private JsonArray faqList2;
    private JsonArray faqList3;
    private JsonArray faqList4;
    private JsonArray faqList5;
    
    @OSGiService
	@Self
	private BrandvariablesValueMapping brandVariablesMapping;
    
    @ValueMapValue
    private String tabNameText1;
    
    @ValueMapValue
    private String tabNameText2;
    
    @ValueMapValue
    private String tabNameText3;
    
    @ValueMapValue
    private String tabNameText4;
    
    @ValueMapValue
    private String tabNameText5;
    
    @JsonIgnore
    private String json;
    
    @Inject
    private Resource resource;
    
    @PostConstruct
    protected void init() {
        faqList = ModelUtil.toJsonArray(getResource().getChild("faqTypeItem"), Arrays.asList(new String[]{title, description}));
        faqList1 = ModelUtil.toJsonArray(getResource().getChild("faqTypeItem1"), Arrays.asList(new String[]{title, description}));
        faqList2 = ModelUtil.toJsonArray(getResource().getChild("faqTypeItem2"), Arrays.asList(new String[]{title, description}));
        faqList3 = ModelUtil.toJsonArray(getResource().getChild("faqTypeItem3"), Arrays.asList(new String[]{title, description}));
        faqList4 = ModelUtil.toJsonArray(getResource().getChild("faqTypeItem4"), Arrays.asList(new String[]{title, description}));
        faqList5 = ModelUtil.toJsonArray(getResource().getChild("faqTypeItem5"), Arrays.asList(new String[]{title, description}));
        Page currentPage = resource.getResourceResolver().adaptTo(PageManager.class).getContainingPage(resource);
        resource = null;
        this.json = new GsonBuilder().create().toJson(this);
        this.json = brandVariablesMapping.mapBrandVariableValues(currentPage, this.json);
    }
    
    public JsonArray getFAQTypeList() { return faqList; }
    
    public JsonArray getFAQTypeList1() { return faqList1; }
    
    public JsonArray getFAQTypeList2() { return faqList2; }
    
    public JsonArray getFAQTypeList3() { return faqList3; }
    
    public JsonArray getFAQTypeList4() { return faqList4; }
    
    public JsonArray getFAQTypeList5() { return faqList5; }
    
    public String getTabNameText1() { return this.tabNameText1; }
    
    public String getTabNameText2() { return this.tabNameText2; }
    
    public String getTabNameText3() { return this.tabNameText3; }
    
    public String getTabNameText4() { return this.tabNameText4; }
    
    public String getTabNameText5() { return this.tabNameText5; }
    
    public String getJson() { return json; }
    
    public Resource getResource() { return resource; }
}
