package com.sscp.core.models;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.gson.GsonBuilder;
import com.sscp.core.services.BrandvariablesValueMapping;
import com.sscp.core.services.GlobalConfigurationService;
import com.sscp.core.util.GlobalDataMapUtil;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

/**
 * Forgot Password Component
 */
@Model(
        adaptables = {SlingHttpServletRequest.class, Resource.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
        resourceType = "sscp/components/forgotpassword"
)
@Exporter(name= "jackson", extensions = "json")
public class ForgotPassword {

	private static final String TERMSOFUSE = "termsOfUse";

	@Inject
	@Self
	private CommunicationsConfig communicationsConfig;

	@OSGiService
	@Self
	private GlobalConfigurationService globalConfig;
	
	@Inject
	private Resource resource;

	@OSGiService
	@Self
	private BrandvariablesValueMapping brandVariablesMapping;

	@ValueMapValue
	private String forgotPasswordTitle;

	@ValueMapValue
	private String forgotPasswordDescription;

	@ValueMapValue
	private String forgotPasswordButton;

	@ValueMapValue
	private String forgotPasswordContact;

	@ValueMapValue
	private String setPasswordText;

	@ValueMapValue
	private String termsTitle;

	@ValueMapValue
	private String agreeTermsTitle;

	@ValueMapValue
	private String agreeTerms;

	@ValueMapValue
	private String agreeTermsButton;

	private String termsOfUse;

	@JsonIgnore
	private String json;

	@Inject
	@SlingObject
	private transient ResourceResolver resourceResolver;

	@SlingObject
	private transient SlingHttpServletRequest request;

	@PostConstruct
	protected void init() {
		termsOfUse = GlobalDataMapUtil.getAttributeValue(resourceResolver, request, TERMSOFUSE);
		Page currentPage = resourceResolver.adaptTo(PageManager.class).getContainingPage(resource);
		resource = null;
		this.json = new GsonBuilder().create().toJson(this);
		this.json = brandVariablesMapping.mapBrandVariableValues(currentPage, this.json);
	}

	public String getForgotPasswordTitle() { return forgotPasswordTitle; }

	public String getForgotPasswordDescription() { return forgotPasswordDescription; }

	public String getForgotPasswordButton() { return forgotPasswordButton; }

	public String getForgotPasswordContact() { return forgotPasswordContact; }

	public String getSetPasswordText() { return setPasswordText; }
	
	public String getTermsTitle() { return termsTitle; }

	public String getAgreeTermsTitle() { return agreeTermsTitle; }

	public String getAgreeTerms() { return agreeTerms; }

	public String getAgreeTermsButton() { return agreeTermsButton; }

	public String getTermsOfUse() { return termsOfUse; }

	public String getJson() { return json; }
}
