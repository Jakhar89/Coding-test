package com.sscp.core.models;

import com.sscp.core.services.GlobalConfigurationService;
import com.sscp.core.util.ModelUtil;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;

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

/**
 * Header Component
 */

@Model(
        adaptables = {SlingHttpServletRequest.class, Resource.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
        resourceType = "sscp/components/header"
)
@Exporter(name= "jackson", extensions = "json")
public class Header {

    private static final String URL = "url";
    private static final String TEXT = "text";
    private static final String ICON = "icon";
    private static final String FLAG = "flag";
    private static final String HIDE_IN_NAV = "hideInNav";

    @OSGiService
    @Self
    private GlobalConfigurationService globalConfig;

    @Inject
    private transient InheritanceValueMap pageProperties;

    private JsonArray menuList;

    @ValueMapValue
    private String logoPath;

    @ValueMapValue
    private String logoRedirectUrl;

    @ValueMapValue
    private String logoAltText;

    @ValueMapValue
    private Boolean isLogoReversed;

    @ValueMapValue
    private Integer idleRedirectDesktop;

    @ValueMapValue
    private Integer idleRedirectMobileTablet;

    @ValueMapValue
    private Integer idleWarningDesktop;

    @ValueMapValue
    private Integer idleWarningMobileTablet;

    @ValueMapValue
    private Boolean hideHeaderMenu;

    @JsonIgnore
    private String json;

    @Inject
    private Resource resource;

    @PostConstruct
    protected void init() {
        menuList = ModelUtil.toJsonArray(getResource().getChild("menuItem"), Arrays.asList(new String[]{URL, TEXT, ICON, FLAG, HIDE_IN_NAV}));
        idleRedirectDesktop = (null == idleRedirectDesktop) ? pageProperties.getInherited("idleRedirectDesktop", Integer.class): idleRedirectDesktop;
        idleRedirectMobileTablet = (null == idleRedirectMobileTablet) ? pageProperties.getInherited("idleRedirectMobileTablet", Integer.class): idleRedirectMobileTablet;
        idleWarningDesktop = (null == idleWarningDesktop) ? pageProperties.getInherited("idleWarningDesktop", Integer.class): idleWarningDesktop;
        idleWarningMobileTablet = (null == idleWarningMobileTablet) ? pageProperties.getInherited("idleWarningMobileTablet", Integer.class): idleWarningMobileTablet;
        hideHeaderMenu = (null == hideHeaderMenu) ? pageProperties.getInherited("hideHeaderMenu", Boolean.class) : hideHeaderMenu;
        resource = null;
        this.json = new GsonBuilder().create().toJson(this);
    }

    public String getLogoPath() { return logoPath; }

    public String getLogoRedirectUrl() { return logoRedirectUrl; }

    public String getLogoAltText() { return logoAltText; }

    public Boolean getIsLogoReversed() { return isLogoReversed; }

    public JsonArray getMenuList() { return menuList; }

    public Integer getIdleRedirectDesktop() { return idleRedirectDesktop; }

    public Integer getIdleRedirectMobileTablet() { return idleRedirectMobileTablet; }

    public Integer getIdleWarningDesktop() { return idleWarningDesktop; }

    public Integer getIdleWarningMobileTablet() { return idleWarningMobileTablet; }

    public Boolean getHideHeaderMenu() { return hideHeaderMenu; }

    public String getJson() { return json; }

    public Resource getResource() { return resource; }
}
