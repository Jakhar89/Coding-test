package com.sscp.core.models;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.gson.GsonBuilder;
import com.sscp.core.services.BrandvariablesValueMapping;
import com.sscp.core.services.GlobalConfigurationService;
import com.sscp.core.util.ModelUtil;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.Arrays;
import com.google.gson.JsonArray;

/**
 * Card Component
 */
@Model(
        adaptables = {SlingHttpServletRequest.class, Resource.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
        resourceType = "sscp/components/cardcomponent"
)
@Exporter(name= "jackson", extensions = "json")
public class CardComponent {

	private static final String IMAGEPATH = "imagePath";
	private static final String TITLE = "title";
	private static final String DESC = "description";
	private static final String CTALABEL = "ctaLabel";
	private static final String CTAPATH = "ctaPath";

	private JsonArray cardContainerList;

	@OSGiService
	@Self
	private GlobalConfigurationService globalConfig;
	
	@OSGiService
	@Self
	private BrandvariablesValueMapping brandVariablesMapping;

	@ValueMapValue
	private String card1imagePath;

	@ValueMapValue
	private String card1title;

	@ValueMapValue
	private String card1description;

	@ValueMapValue
	private String card1CtaLabel;

	@ValueMapValue
	private String card1CtaPath;

	@ValueMapValue
	private String card2imagePath;

	@ValueMapValue
	private String card2title;

	@ValueMapValue
	private String card2description;

	@ValueMapValue
	private String card2CtaLabel;

	@ValueMapValue
	private String card2CtaPath;

	@JsonIgnore
	private String json;

	@Inject
	private Resource resource;

	@PostConstruct
	protected void init() {
		cardContainerList = ModelUtil.toJsonArray(getResource().getChild("cardContainerItem"), Arrays.asList(new String[]{IMAGEPATH, TITLE, DESC, CTALABEL, CTAPATH}));
		Page currentPage = resource.getResourceResolver().adaptTo(PageManager.class).getContainingPage(resource);
		resource = null;
		this.json = new GsonBuilder().create().toJson(this);
		this.json = brandVariablesMapping.mapBrandVariableValues(currentPage, this.json);
	}

	public String getCard1ImagePath() { return this.card1imagePath; }

	public String getCard1Title() { return this.card1title; }

	public String getCard1Description() { return this.card1description; }

	public String getCard1CtaLabel() { return this.card1CtaLabel; }

	public String getCard1CtaPath() { return this.card1CtaPath; }

	public String getCard2ImagePath() { return this.card2imagePath; }

	public String getCard2Title() { return this.card2title; }

	public String getCard2Description() { return this.card2description; }

	public String getCard2CtaLabel() { return this.card2CtaLabel; }

	public String getCard2CtaPath() { return this.card2CtaPath; }
	
	public JsonArray getCardContainerList() { return cardContainerList; }

	public String getJson() { return json; }

	public Resource getResource() { return resource; }
}
