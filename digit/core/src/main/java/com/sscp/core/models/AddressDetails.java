package com.sscp.core.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.gson.GsonBuilder;
import com.sscp.core.services.CsvToJsonService;
import com.sscp.core.services.GlobalConfigurationService;
import com.sscp.core.services.datasource.StreetType;
import com.sscp.core.services.datasource.Suburb;

import org.apache.commons.lang3.StringUtils;
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

import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

/**
 * Address Details Component
 */
@Model(
        adaptables = {SlingHttpServletRequest.class, Resource.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
        resourceType = "sscp/components/addressdetails"
)
@Exporter(name= "jackson", extensions = "json")
public class AddressDetails {

	@OSGiService
	private CsvToJsonService csvToJsonService;

	@OSGiService
	@Self
	private GlobalConfigurationService globalConfig;

	@Inject
	@SlingObject
	private transient ResourceResolver resourceResolver;

	@ValueMapValue
	private String residentialAddressTitle;

	@ValueMapValue
	private String mailingAddressTitle;

	@ValueMapValue
	private String residentialAddressSubTitle;

	@ValueMapValue
	private String resAddressLine1;

	@ValueMapValue
	private String resAddressLine2;

	@ValueMapValue
	private String resCitySuburb;

	@ValueMapValue
	private String resStateTerritory;

	@ValueMapValue
	private String resPostZipCode;

	@ValueMapValue
	private String resCountry;

	@ValueMapValue
	private String streetTypeFilePath;

	@ValueMapValue
	private String suburbListFilePath;

	private List<StreetType> streetTypes;

	private List<Suburb> suburbList;

	@JsonIgnore
	private String json;

	@PostConstruct
	protected void init() {
		this.streetTypes = StringUtils.isNotEmpty(this.streetTypeFilePath) ? csvToJsonService.getStreetType(this.streetTypeFilePath, resourceResolver) : null;
		this.suburbList = StringUtils.isNotEmpty(this.suburbListFilePath) ? csvToJsonService.getSuburbsList(this.suburbListFilePath, resourceResolver) : null;
		this.streetTypeFilePath = null;
		this.suburbListFilePath = null;
		this.csvToJsonService = null;
		this.json = new GsonBuilder().create().toJson(this);
	}

	public String getResidentialAddressTitle() { return residentialAddressTitle; }

	public String getMailingAddressTitle() { return mailingAddressTitle; }

	public String getResidentialAddressSubTitle() { return residentialAddressSubTitle; }

	public String getResAddressLine1() { return resAddressLine1; }

	public String getResAddressLine2() { return resAddressLine2; }

	public String getResCitySuburb() { return resCitySuburb; }

	public String getResStateTerritory() { return resStateTerritory; }

	public String getResPostZipCode() { return resPostZipCode; }

	public String getResCountry() { return resCountry; }

	public List<StreetType> getStreetTypes() { return this.streetTypes; }

	public List<Suburb> getSuburbList() { return this.suburbList; }

	public String getJson() { return json; }
}
