package com.sscp.core.models;

import com.sscp.core.services.GlobalConfigurationService;

import javax.inject.Inject;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;

@Model(adaptables = {
        SlingHttpServletRequest.class
})

public class StyleNameModel {
    @Inject
    @Optional
    private String brandSlug;

    @OSGiService
    @Self
    private GlobalConfigurationService globalConfig;

    @SlingObject
    private transient SlingHttpServletRequest request;

    public String getStyleNameSite() {
        return brandSlug != null ? ("sscp.").concat(brandSlug.toLowerCase()).replace(' ', '-') : "sscp.site";
    }

    public String getStyleNameDependency() {
        return brandSlug != null ? ("sscp.").concat(brandSlug.toLowerCase()).concat(".dependencies").replace(' ', '-') : "sscp.dependencies";
    }

    public String getDynaTraceDomainUrl() {
        return globalConfig.getDynatraceUrl();
    }

    public String getPageName() {
        return request.getRequestURI().substring(1).replace(".html", "").replace('/', ':');
    }

    public StringBuffer getPageUrl() {
        return request.getRequestURL();
    }
}