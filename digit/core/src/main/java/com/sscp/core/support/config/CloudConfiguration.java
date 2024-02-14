package com.sscp.core.support.config;

import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.wcm.webservicesupport.Configuration;
import com.day.cq.wcm.webservicesupport.ConfigurationConstants;
import com.day.cq.wcm.webservicesupport.ConfigurationManager;
import com.sscp.core.services.ContentAccess;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

@Slf4j
@Component
public class CloudConfiguration {
    private static CloudConfiguration instance;

    private CloudConfiguration() {
        log.debug("Initialised singleton instance for Cloud Configuration");
    }

    @Reference
    private ContentAccess contentAccess;

    public static CloudConfiguration getInstance() {
        if (instance == null) {
            instance = new CloudConfiguration();
        }

        return instance;
    }

    /**
     * Retrieve a configuration value from Cloud Config.
     *
     * @param pageProperties    {@link InheritanceValueMap} of page properties
     * @param configurationName cloud configuration name
     * @param propertyName      name of the property to search for
     * @return found configuration value or a blank {@link String}
     */
    public String getCloudConfigProperty(
            InheritanceValueMap pageProperties,
            String configurationName,
            String propertyName
    ) {
        String returnValue = StringUtils.EMPTY;

        if (contentAccess != null) {
            ResourceResolver adminResourceResolver = contentAccess.getAdminResourceResolver();

            if (adminResourceResolver != null) {
                ConfigurationManager configManager = adminResourceResolver.adaptTo(ConfigurationManager.class);
                Configuration configuration;

                if (configManager != null) {
                    String[] services = pageProperties.getInherited(ConfigurationConstants.PN_CONFIGURATIONS, new String[]{});

                    configuration = configManager.getConfiguration(configurationName, services);

                    if (configuration != null) {
                        returnValue = configuration.get(propertyName, StringUtils.EMPTY);
                    }
                }
            }
        } else {
            log.warn("getCloudConfigProperty: Could not get 'ContentAccess' service.");
        }

        return returnValue;
    }
}
