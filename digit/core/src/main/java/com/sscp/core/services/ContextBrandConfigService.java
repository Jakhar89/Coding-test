package com.sscp.core.services;

import org.apache.sling.caconfig.annotation.Configuration;
import org.apache.sling.caconfig.annotation.Property;

@Configuration (
		label = "SSCP Brand level configuration",
		description = "Configurations per sscp brand sites"
		)
public @interface ContextBrandConfigService {
	
	@Property(label = "Base API Url", description = "End point for Base Api")
	String baseApiUrl();
	
}