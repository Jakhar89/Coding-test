package com.sscp.core.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.sscp.core.util.GlobalDataMapUtil;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;


import javax.annotation.PostConstruct;
import javax.inject.Inject;

/**
 * Error Map Model
 */
@Model(
        adaptables = {SlingHttpServletRequest.class, Resource.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
@Exporter(name= "jackson", extensions = "json")
public class ErrorSuccessModel {

	private static final String AUTOLOGOUTPAGE = "autoLogoutPagePath";
	private static final String ERRORPAGE = "errorPagePath";
	private static final String LOCKEDPAGE = "lockedPagePath";
	private static final String LOGINPAGE = "loginPagePath";
	private static final String SUCCESSPAGE = "successPagePath";

	private String autoLogoutPagePath;
	
	private String errorPagePath;

	private String lockedPagePath;

	private String loginPagePath;

	private String successPagePath;

	private JsonArray errorMap;

	@Inject
	@SlingObject
	private transient ResourceResolver resourceResolver;

	@SlingObject
	private transient SlingHttpServletRequest request;

	@JsonIgnore
	private String json;

	@PostConstruct
	protected void init() {
		errorMap = GlobalDataMapUtil.getErrorMap(resourceResolver, request);
		autoLogoutPagePath = GlobalDataMapUtil.getAttributeValue(resourceResolver, request, AUTOLOGOUTPAGE);
		errorPagePath = GlobalDataMapUtil.getAttributeValue(resourceResolver, request, ERRORPAGE);
		lockedPagePath = GlobalDataMapUtil.getAttributeValue(resourceResolver, request, LOCKEDPAGE);
		loginPagePath = GlobalDataMapUtil.getAttributeValue(resourceResolver, request, LOGINPAGE);
		successPagePath = GlobalDataMapUtil.getAttributeValue(resourceResolver, request, SUCCESSPAGE);
		this.json = new GsonBuilder().create().toJson(this);
	}

	public String getAutoLogoutPagePath() { return autoLogoutPagePath; }

	public String getErrorPagePath() { return errorPagePath; }

	public String getLockedPagePath() { return lockedPagePath; }

	public String getLoginPagePath() { return loginPagePath; }

	public String getSuccessPagePath() { return successPagePath; }

	public JsonArray getErrorMap() { return errorMap; }
	
	public String getJson() { return json; }
}