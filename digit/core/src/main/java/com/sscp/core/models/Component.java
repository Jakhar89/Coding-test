package com.sscp.core.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sscp.core.support.components.AttrBuilder;
import org.osgi.annotation.versioning.ConsumerType;

@SuppressWarnings("ClassNameSameAsAncestorName")
@ConsumerType
public interface Component extends com.adobe.cq.wcm.core.components.models.Component {
    /**
     * Get the instance of {@link AttrBuilder} which contains HTML attributes.
     */
    default AttrBuilder getAttributes() {
        throw new UnsupportedOperationException();
    }

    /**
     * Get a {@code boolean} whether the component has been configured.
     */
    @JsonIgnore
    default boolean isConfigured() {
        return true;
    }
}
