package com.sscp.core.models;

import java.net.URI;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.http.client.utils.URIBuilder;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.caconfig.ConfigurationBuilder;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.gson.GsonBuilder;
import com.sscp.core.services.ContextBrandConfigService;
import com.sscp.core.services.GlobalConfigurationService;
import com.sscp.core.services.impl.BrandvariablesValueMappingImpl;

@Model(
        adaptables = {SlingHttpServletRequest.class, Resource.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
@Exporter(name= "jackson", extensions = "json")
public class BrandContextConfigModel {
	
	private static final Logger LOG = LoggerFactory.getLogger(BrandvariablesValueMappingImpl.class);
	
	@Inject
	@SlingObject
	private transient ResourceResolver resourceResolver;

	@SlingObject
	private transient SlingHttpServletRequest request;
	
	@OSGiService
	@Self
	private GlobalConfigurationService globalConfig;
	
	@JsonIgnore
	private String json;
	
	@PostConstruct
	protected void init() {
		try {
			Resource pageResource = request.getResource();
			ConfigurationBuilder configBuilder = pageResource.adaptTo(ConfigurationBuilder.class);
			ContextBrandConfigService brandConfig = configBuilder.as(ContextBrandConfigService.class);
			if(brandConfig.baseApiUrl() != null) {
				globalConfig.setBaseApiUrl(brandConfig.baseApiUrl());
				URI uri = new URI(globalConfig.getForgerockUrl());
				String uriPath = uri.getPath();
				String forgeUrl = brandConfig.baseApiUrl().concat(uriPath);
				globalConfig.setForgerockUrl(forgeUrl);
			}
				
		} catch(Exception e) {
			LOG.error("Error occured while fetching Sscp context configs   {}", e.getMessage());

		}
		this.json = new GsonBuilder().create().toJson(this);
	}
	
	public String getJson() { return json; }

}
