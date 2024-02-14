package com.sscp.core.services;

public interface GlobalConfigurationService {

    String getBaseApiUrl();
    
    String getForgerockUrl();

    String getForgerockRealm();

    String getForgerockClientId();

    String getDynatraceUrl();

    String getQuestApiKey();
    
    void setBaseApiUrl(String uri);
    
    void setForgerockUrl(String forgerockUri);
}
