package com.sscp.core.util;

import com.day.cq.commons.jcr.JcrConstants;
import lombok.extern.slf4j.Slf4j;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.jetbrains.annotations.NotNull;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Slf4j
public class CommonUtils {
    private static CommonUtils instance;

    private CommonUtils() {
        log.debug("Initialised singleton instance for Common Utils");
    }

    public static CommonUtils getInstance() {
        if (instance == null) {
            instance = new CommonUtils();
        }

        return instance;
    }

    /**
     * Retrieve an administrator {@link ResourceResolver} instance.
     *
     * @param resourceResolverFactory
     * @param serviceUser
     * @return
     * @throws LoginException
     */
    public ResourceResolver getServiceResourceResolver(
            ResourceResolverFactory resourceResolverFactory,
            String serviceUser) throws LoginException {
        Map<String, Object> params = new HashMap<>();
        params.put(ResourceResolverFactory.SUBSERVICE, serviceUser);

        return resourceResolverFactory.getServiceResourceResolver(params);
    }

    @NotNull
    public InputStreamReader getInputStreamReader(Resource resource) throws RepositoryException {
        final Node fileNode = resource.adaptTo(Node.class);
        Node jcrContent = Objects.requireNonNull(fileNode).getNode(JcrConstants.JCR_CONTENT);

        return new InputStreamReader(jcrContent.getProperty(JcrConstants.JCR_DATA).getBinary().getStream());
    }
}
