package com.sscp.core.impl.models;

import com.day.cq.wcm.api.NameConstants;
import com.sscp.core.models.Component;
import com.sscp.core.support.components.AbstractComponentImpl;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;

@Model(
        adaptables = SlingHttpServletRequest.class,
        adapters = Component.class,
        resourceType = NameConstants.NT_COMPONENT
)
public final class ComponentImpl extends AbstractComponentImpl {
}
