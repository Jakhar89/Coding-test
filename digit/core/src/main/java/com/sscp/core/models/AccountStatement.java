package com.sscp.core.models;

import javax.annotation.PostConstruct;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.gson.GsonBuilder;

@Model(
        adaptables = {SlingHttpServletRequest.class, Resource.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
        resourceType = "sscp/components/accountstatement"
)
@Exporter(name= "jackson", extensions = "json")
public class AccountStatement {
	
	@ValueMapValue
	private String accountStatementTitle;
	
	@ValueMapValue
	private String accountToDateLabel;
	
	@ValueMapValue
	private String dateRangeLabel;
	
	@ValueMapValue
	private String dateFromLabel;
	
	@ValueMapValue
	private String dateToLabel;
	
	@ValueMapValue
	private String generateStatementCta;
	
	@ValueMapValue
	private String statementTitle;
	
	@ValueMapValue
	private String statementTableHeader1;
	
	@ValueMapValue
	private String statementTableHeader2;
	
	@ValueMapValue
	private String statementDownloadedLabel;
	
	@ValueMapValue
	private String statementGeneratedLabel;
	
	@ValueMapValue
	private String downloadedDescription;
	
	@ValueMapValue
	private String generatedDescription;
	
	@ValueMapValue
	private String noStatementLabel;
	
	@JsonIgnore
    private String json;
    
    
    @PostConstruct
	protected void init() {
		this.json = new GsonBuilder().create().toJson(this);
	}


	public String getAccountStatementTitle() { return accountStatementTitle; }

	public String getAccountToDateLabel() { return accountToDateLabel; }

	public String getDateRangeLabel() {	return dateRangeLabel; }

	public String getDateFromLabel() { return dateFromLabel; }

	public String getDateToLabel() { return dateToLabel; }

	public String getGenerateStatementCta() { return generateStatementCta; }

	public String getStatementTitle() { return statementTitle; }

	public String getStatementTableHeader1() { return statementTableHeader1; }

	public String getStatementTableHeader2() { return statementTableHeader2; }

	public String getStatementDownloadedLabel() { return statementDownloadedLabel; }

	public String getStatementGeneratedLabel() { return statementGeneratedLabel; }

	public String getDownloadedDescription() { return downloadedDescription; }

	public String getGeneratedDescription() { return generatedDescription; }

	public String getNoStatementLabel() { return noStatementLabel; }
	
	public String getJson() { return json; }
    
}
