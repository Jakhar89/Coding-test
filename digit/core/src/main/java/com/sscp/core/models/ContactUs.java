package com.sscp.core.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.gson.GsonBuilder;
import com.sscp.core.services.GlobalConfigurationService;
import com.sscp.core.util.ModelUtil;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.Arrays;
import com.google.gson.JsonArray;

/**
 * Payment Options Component
 */
@Model(
        adaptables = {SlingHttpServletRequest.class, Resource.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
        resourceType = "sscp/components/contactus"
)
@Exporter(name= "jackson", extensions = "json")
public class ContactUs {
    private static final String EnquiryItem = "enquiryItem";
    private static final String GeneralRelatesItem = "generalRelatesItem";
    private static final String ComplaintRelatesItem = "complaintRelatesItem";

    private JsonArray enquiryTypeList;
    private JsonArray generalRelatesToList;
    private JsonArray complaintRelatesToList;

    @OSGiService
	@Self
	private GlobalConfigurationService globalConfig;

	@ValueMapValue
	private String enquiryTypeLabelText;

    @ValueMapValue
	private String relatesToTextField;

    @ValueMapValue
	private String hardshipRadio1;

    @ValueMapValue
	private String hardshipRadio2;

    @ValueMapValue
	private String refinanceRadio1;

    @ValueMapValue
	private String refinanceRadio2;

    @ValueMapValue
	private String accountsSelectorLabel;

    @ValueMapValue
	private String yourMessageLabel;

    @ValueMapValue
	private String yourMessagePlaceholder;

    @ValueMapValue
	private String yourMessageComplaintDisclaimer;

    @ValueMapValue
	private String yourMessageHardshipDisclaimer;

    @ValueMapValue
	private String yourMessageRefinanceDisclaimer;

    @ValueMapValue
	private String yourMessageInsuranceDisclaimer;

    @ValueMapValue
	private String complaintMessageBoxLabel;

    @ValueMapValue
	private String complaintMessageBoxPlaceholder;

    @ValueMapValue
	private String prefferedResponseLabel;

    @ValueMapValue
	private String prefferedRadio1;

    @ValueMapValue
	private String prefferedRadio2;

    @ValueMapValue
	private String prefferedRadio3;

    @ValueMapValue
	private String prefferedPhone;

    @ValueMapValue
	private String updatePhone;

    @ValueMapValue
	private String updatePhonePath;

    @ValueMapValue
	private String prefferedEmail;

    @ValueMapValue
	private String updateEmail;

    @ValueMapValue
	private String updateEmailPath;

    @ValueMapValue
	private String sendEnquiryButtonText;

    @ValueMapValue
	private String thankYouText;

    @ValueMapValue
	private String successMessageDescription;

    @ValueMapValue
	private String successMessageDescriptionNewHardship;

    @ValueMapValue
	private String redirectionPath;

	@JsonIgnore
	private String json;

    @Inject
	private Resource resource;

	@PostConstruct
	protected void init() {
		enquiryTypeList = ModelUtil.toJsonArray(getResource().getChild("enquiryTypeItem"), Arrays.asList(new String[]{EnquiryItem}));
		generalRelatesToList = ModelUtil.toJsonArray(getResource().getChild("generalRelatesToItem"), Arrays.asList(new String[]{GeneralRelatesItem}));
		complaintRelatesToList = ModelUtil.toJsonArray(getResource().getChild("complaintRelatesToItem"), Arrays.asList(new String[]{ComplaintRelatesItem}));
        resource = null;
        this.json = new GsonBuilder().create().toJson(this);
    }


    public JsonArray getEnquiryTypeList() { return enquiryTypeList; }

    public JsonArray getGeneralRelatesToList() { return generalRelatesToList; }

    public JsonArray getComplaintRelatesToList() { return complaintRelatesToList; }

	public String getJson() { return json; }

    public Resource getResource() { return resource; }
}
