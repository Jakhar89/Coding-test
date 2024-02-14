package com.sscp.core.impl.services;

import com.sscp.core.services.ContentAccess;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Deactivate;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collections;
import java.util.Map;

@Component(immediate = true)
public class ContentAccessImpl implements ContentAccess {
    protected static final Logger log = LoggerFactory.getLogger(ContentAccessImpl.class);

    private static final String SERVICE_NAME = "content-services";
    private static final Map<String, Object> AUTH_INFO;

    static {
        AUTH_INFO = Collections.singletonMap(ResourceResolverFactory.SUBSERVICE, SERVICE_NAME);
    }

    @Reference
    private ResourceResolverFactory resourceResolverFactory;

    @Activate
    protected void activate() {
        log.info("Content Access service has been activated.");
    }

    @Deactivate
    protected void deactivate() {
        log.info("Content Access service has been deactivated.");
    }

    @Override
    public ResourceResolver getAdminResourceResolver() {
        try {
            return resourceResolverFactory.getServiceResourceResolver(AUTH_INFO);
        } catch (LoginException ex) {
            log.error("Login Exception when getting admin resource resolver.", ex);
        }

        return null;
    }

    @Override
    public String getSubServiceUser() {
        final Map<String, Object> authInfo = Collections.singletonMap(
                ResourceResolverFactory.SUBSERVICE, SERVICE_NAME);

        try (ResourceResolver serviceResolver = resourceResolverFactory.getServiceResourceResolver(authInfo)) {
            return serviceResolver.getUserID();
        } catch (LoginException ex) {
            log.error("getSubServiceUser: Login Exception when obtaining a User for the Bundle Service: {}, ex={}", SERVICE_NAME, ex);
        }

        return StringUtils.EMPTY;
    }

    @Override
    public String getBundleServiceUser() {
        try (ResourceResolver serviceResolver = resourceResolverFactory.getServiceResourceResolver(null)) {
            return serviceResolver.getUserID();
        } catch (LoginException ex) {
            log.error("getBundleServiceUser: Login Exception when obtaining a User for the Bundle Service ex={0}", ex);
        }

        return StringUtils.EMPTY;
    }
}
