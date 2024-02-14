package com.sscp.core.models;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import com.sscp.core.services.GlobalConfigurationService;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.gson.GsonBuilder;

@Model(
        adaptables = {SlingHttpServletRequest.class, Resource.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
        resourceType = "sscp/components/portalgateway"
)
@Exporter(name= "jackson", extensions = "json")
public class PortalGateway {
	
	@OSGiService
	@Self
	private GlobalConfigurationService globalConfig;
	
	@ValueMapValue
	private String vehicleRegoNumberLabel;

	@ValueMapValue
	private String surnameLabel;
	
	@ValueMapValue
	private String vehicleRegoNoPlaceholderText;
	
	@ValueMapValue
	private String surnamePlaceholderText;

	@ValueMapValue
	private String buttonLabel;

	@ValueMapValue
	private String myPortalAlfaUri;

	@ValueMapValue
	private String myPortalLtUri;
	
	@JsonIgnore
	private String json;
	
	@PostConstruct
	protected void init() {
		this.json = new GsonBuilder().create().toJson(this);
	}

	public String getVehicleRegoNumberLabel() {
		return vehicleRegoNumberLabel;
	}

	public String getSurnameLabel() {
		return surnameLabel;
	}

	public String getVehicleRegoNoPlaceholderText() {
		return vehicleRegoNoPlaceholderText;
	}

	public String getSurnamePlaceholderText() {
		return surnamePlaceholderText;
	}

	public String getButtonLabel() {
		return buttonLabel;
	}

	public String getMyPortalAlfaUri() {
		return myPortalAlfaUri;
	}

	public String getMyPortalLtUri() {
		return myPortalLtUri;
	}

	public String getJson() {
		return json;
	}


}
