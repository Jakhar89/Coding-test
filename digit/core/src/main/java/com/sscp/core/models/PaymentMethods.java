package com.sscp.core.models;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.gson.GsonBuilder;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.sscp.core.services.BrandvariablesValueMapping;
import com.sscp.core.services.GlobalConfigurationService;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

/**
 * Payment Methods Component
 */
@Model(
        adaptables = {SlingHttpServletRequest.class, Resource.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
        resourceType = "sscp/components/paymentmethods"
)
@Exporter(name= "jackson", extensions = "json")
public class PaymentMethods {

	@OSGiService
	@Self
	private GlobalConfigurationService globalConfig;
	
	@Inject
	private Resource resource;
	
	@OSGiService
	@Self
	private BrandvariablesValueMapping brandVariablesMapping;

	@ValueMapValue
	private String paymentMethodsLabelText;

	@ValueMapValue
	private String paymentMethodsDescriptionText;

	@ValueMapValue
	private String nominatedFlagText;

	@ValueMapValue
	private String directDebitLabelText;

	@ValueMapValue
	private String directDebitIcon;

	@ValueMapValue
	private String directDebitDescriptionText;

	@ValueMapValue
	private String eftLabelText;

	@ValueMapValue
	private String eftIcon;

	@ValueMapValue
	private String eftDescriptionText;

	@ValueMapValue
	private String bpayLabelText;

	@ValueMapValue
	private String bpayIcon;

	@ValueMapValue
	private String bpayDescriptionText;

	@ValueMapValue
	private String editIcon;

	@JsonIgnore
	private String json;

	@PostConstruct
	protected void init() { 
		Page currentPage = resource.getResourceResolver().adaptTo(PageManager.class).getContainingPage(resource);
		resource = null;
		this.json = new GsonBuilder().create().toJson(this);
		this.json = brandVariablesMapping.mapBrandVariableValues(currentPage, this.json);
	}

	public String getPaymentMethodsLabelText() { return this.paymentMethodsLabelText; }

	public String getPaymentMethodsDescriptionText() { return this.paymentMethodsDescriptionText; }

	public String getNominatedFlagText() { return this.nominatedFlagText; }
	
	public String getDirectDebitLabelText() { return this.directDebitLabelText; }

	public String getDirectDebitIcon() { return this.directDebitIcon; }
	
	public String getDirectDebitDescriptionText() { return this.directDebitDescriptionText; }

	public String getEftLabelText() { return this.eftLabelText; }

	public String getEftIcon() { return this.eftIcon; }

	public String getEftDescriptionText() { return this.eftDescriptionText; }

	public String getBpayLabelText() { return this.bpayLabelText; }

	public String getBpayIcon() { return this.bpayIcon; }

	public String getBpayDescriptionText() { return this.bpayDescriptionText; }

	public String getEditIcon() { return this.editIcon; }

	public String getJson() { return json; }
}
