package com.sscp.core.support.components;

import com.adobe.cq.sightly.SightlyWCMMode;
import com.adobe.cq.wcm.core.components.commons.link.Link;
import com.adobe.cq.wcm.core.components.services.link.PathProcessor;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.designer.Style;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sscp.core.impl.models.link.LinkHandler;
import com.sscp.core.impl.models.link.LinkImpl;
import com.sscp.core.support.components.AttrBuilder;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.*;
import org.apache.sling.models.annotations.injectorspecific.*;
import org.apache.sling.xss.XSSAPI;
import org.jetbrains.annotations.Nullable;
import org.osgi.annotation.versioning.ConsumerType;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@SuppressWarnings("ClassNameSameAsAncestorName")
@ConsumerType
public abstract class AbstractComponentImpl extends com.adobe.cq.wcm.core.components.util.AbstractComponentImpl {
    @ScriptVariable(injectionStrategy = InjectionStrategy.OPTIONAL)
    @JsonIgnore
    protected Style currentStyle;

    @Self
    protected LinkHandler linkHandler;

    @OSGiService
    protected List<PathProcessor> pathProcessors;

    @ScriptVariable
    protected ValueMap pageProperties;

    @SlingObject
    protected ResourceResolver resourceResolver;

    @Inject
    protected ResourceResolverFactory resourceResolverFactory;

    @ScriptVariable
    protected SightlyWCMMode wcmmode;

    @Inject
    protected XSSAPI xss;

    @JsonIgnore
    protected AttrBuilder attributes = null;

    @PostConstruct
    protected void init() {
        attributes = new AttrBuilder(xss);
    }

    @Nullable
    protected final Link<Page> getPageLinkForPath(final String path) {
        Resource pathResource = resourceResolver.resolve(path);

        if (ResourceUtil.isNonExistingResource(pathResource)) {
            return null;
        }

        Optional<Link<Page>> link = linkHandler.getLink(pathResource.adaptTo(Page.class));
        return link.orElse(null);
    }
}
