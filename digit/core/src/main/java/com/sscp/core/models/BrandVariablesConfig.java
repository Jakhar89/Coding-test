package com.sscp.core.models;

import com.day.cq.commons.inherit.InheritanceValueMap;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import javax.annotation.PostConstruct;
import javax.inject.Inject;

/**
 * Brand Variables Config Component
 */

@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "sscp/components/brandVariablesConfig")
@Exporter(name = "jackson", extensions = "json")
public class BrandVariablesConfig {

	@Inject
	private transient InheritanceValueMap pageProperties;

	@ValueMapValue
	private String brandName;

	@ValueMapValue
	private String brandPhNumber1;

	@ValueMapValue
	private String brandPhNumber2;

	@ValueMapValue
	private String brandEmail1;

	@ValueMapValue
	private String brandEmail2;

	@ValueMapValue
	private String brandPostalAddress;

	@ValueMapValue
	private String brandTransactionHistoryFooter;

	@PostConstruct
	protected void inheritBrandVariablesConfigProperties() {
		this.brandName = (null == this.brandName) ? pageProperties.getInherited("brandName", String.class) : this.brandName;
		this.brandPhNumber1 = (null == this.brandPhNumber1) ? pageProperties.getInherited("brandPhNumber1", String.class)
				: this.brandPhNumber1;
		this.brandPhNumber2 = (null == this.brandPhNumber2) ? pageProperties.getInherited("brandPhNumber2", String.class)
				: this.brandPhNumber2;
		this.brandEmail1 = (null == this.brandEmail1) ? pageProperties.getInherited("brandEmail1", String.class)
				: this.brandEmail1;
		this.brandEmail2 = (null == this.brandEmail2) ? pageProperties.getInherited("brandEmail2", String.class)
				: this.brandEmail2;
		this.brandPostalAddress = (null == this.brandPostalAddress)
				? pageProperties.getInherited("brandPostalAddress", String.class)
				: this.brandPostalAddress;
		this.brandTransactionHistoryFooter = (null == this.brandTransactionHistoryFooter)
				? pageProperties.getInherited("brandTransactionHistoryFooter", String.class)
				: this.brandTransactionHistoryFooter;
	}

	public String getBrandName() {
		return this.brandName;
	}

	public String getBrandPhNumber1() {
		return this.brandPhNumber1;
	}

	public String getBrandPhNumber2() {
		return this.brandPhNumber2;
	}

	public String getBrandEmail1() {
		return this.brandEmail1;
	}

	public String getBrandEmail2() {
		return this.brandEmail2;
	}

	public String getBrandPostalAddress() {
		return this.brandPostalAddress;
	}

	public String getBrandTransactionHistoryFooter() {
		return this.brandTransactionHistoryFooter;
	}

}
