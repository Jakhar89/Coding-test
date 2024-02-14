package com.sscp.core.services.impl;

import org.apache.commons.lang3.StringUtils;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.ConfigurationPolicy;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

import com.sscp.core.services.GlobalConfigurationService;

@Component(service = GlobalConfigurationService.class, configurationPolicy = ConfigurationPolicy.OPTIONAL)
@Designate(ocd = GlobalConfigurationServiceImpl.GlobalConfigurationServiceConfig.class)
public class GlobalConfigurationServiceImpl implements GlobalConfigurationService {


    @ObjectClassDefinition(
            name = "SSCP Global configurations",
            description = "SSCP website configuration service"
    )
    public @interface GlobalConfigurationServiceConfig {

        @AttributeDefinition(
            name = "Base API Url",
            description = "Base API Url for SSCP website",
            type = AttributeType.STRING
        )
        String baseApiUrl() default StringUtils.EMPTY;
        
        @AttributeDefinition(
                name = "Forgerock Url",
                description = "Forgerock Url for SSCP website",
                type = AttributeType.STRING
        )
        String forgerockUrl() default StringUtils.EMPTY;

        @AttributeDefinition(
                name = "Forgeock Realm",
                description = "Forgerock Url for SSCP website",
                type = AttributeType.STRING
        )
        String forgerockRealm() default StringUtils.EMPTY;

        @AttributeDefinition(
            name = "Forgeock ClientID",
            description = "Forgerock CleintID for SSCP website",
            type = AttributeType.STRING
        )
        String forgerockClientId() default StringUtils.EMPTY;

        @AttributeDefinition(
            name = "Dynatrace Url",
            description = "Dynatrace Url for SSCP website",
            type = AttributeType.STRING
        )
        String dynatraceUrl() default StringUtils.EMPTY;

        @AttributeDefinition(
            name = "Quest API Key",
            description = "Quest API Key for SSCP website",
            type = AttributeType.STRING
        )
        String questApiKey() default StringUtils.EMPTY;
    }

    private String baseApiUrl;
    private String forgerockUrl;
    private String forgerockRealm;
    private String forgerockClientId;
    private String dynatraceUrl;
    private String questApiKey;

    @Activate
    public void activate(GlobalConfigurationServiceConfig config) {
        baseApiUrl = config.baseApiUrl();
        forgerockUrl = config.forgerockUrl();
        forgerockRealm = config.forgerockRealm();
        forgerockClientId = config.forgerockClientId();
        dynatraceUrl = config.dynatraceUrl();
        questApiKey = config.questApiKey();
    }

    @Override
    public String getBaseApiUrl() {
        return baseApiUrl;
    }

    @Override
    public String getForgerockUrl() {
        return forgerockUrl;
    }

    @Override
    public String getForgerockRealm() {
        return forgerockRealm;
    }

    @Override
    public String getForgerockClientId() {
        return forgerockClientId;
    }

    @Override
    public String getDynatraceUrl() {
        return dynatraceUrl;
    }

    @Override
    public String getQuestApiKey() {
        return questApiKey;
    }
    
    public void setBaseApiUrl(String uri) {
    	this.baseApiUrl = uri;
    }
    
    public void setForgerockUrl(String forgerockUri) {
    	this.forgerockUrl = forgerockUri;
    }
}
