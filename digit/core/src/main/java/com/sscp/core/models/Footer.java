package com.sscp.core.models;

import com.sscp.core.util.ModelUtil;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import java.util.Arrays;

/**
 * Footer Component
 */

@Model(
        adaptables = {SlingHttpServletRequest.class, Resource.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
        resourceType = "sscp/components/footer"
)
@Exporter(name= "jackson", extensions = "json")
public class Footer {

    private static final String URL = "url";
    private static final String TEXT = "text";
    private static final String ISNEWTAB = "isNewTab";

    private JsonArray menuList;

    private JsonArray bottomFooterMenuList;

    @Inject
   	@Self
   	private BrandVariablesConfig brandVariablesConfig;
     
    @ValueMapValue
    private String logoPath;

    @ValueMapValue
    private String logoRedirectUrl;

    @ValueMapValue
    private String logoAltText;

    @ValueMapValue
    private String contactUsText;

    @ValueMapValue
    private String contactUsDetails;

    @ValueMapValue
    private String postalAddress;

    @ValueMapValue
    private String licenceDetails;

    @JsonIgnore
    private String json;

    @Inject
    private Resource resource;

	@PostConstruct
    protected void init() {
        menuList = ModelUtil.toJsonArray(getResource().getChild("menuItem"), Arrays.asList(new String[]{URL, TEXT, ISNEWTAB}));
        bottomFooterMenuList = ModelUtil.toJsonArray(getResource().getChild("bottomFooterMenuItem"), Arrays.asList(new String[]{URL, TEXT, ISNEWTAB}));
        resource = null;
        this.json = new GsonBuilder().create().toJson(this);
        try {
        String brandVariablesJson = new GsonBuilder().create().toJson(brandVariablesConfig);
        JsonObject gson = new Gson().fromJson(brandVariablesJson, JsonObject.class);
        Object [] brandKeys =  gson.keySet().toArray();
    	for(Object key : brandKeys) {
    		if(gson.get(key.toString()).isJsonPrimitive())
            	json = json.replace("{"+key+"}", gson.get(key.toString()).getAsString());
        	}
        	
        }
        catch(Exception e) {
        	e.printStackTrace();
        }
    }

    public String getLogoPath() { return logoPath; }

    public String getLogoRedirectUrl() { return logoRedirectUrl; }

    public String getLogoAltText() { return logoAltText; }

    public String getContactUsText() { return contactUsText; }

    public String getContactUsDetails() { return contactUsDetails; }

    public String getPostalAddress() { return postalAddress; }

    public String getLicenceDetails() { return licenceDetails; }

    public JsonArray getMenuList() { return menuList; }

    public JsonArray getBottomFooterMenuList() { return bottomFooterMenuList; }

    public String getJson() { return json; }

    public Resource getResource() { return resource; }
}
