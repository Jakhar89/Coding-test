package com.sscp.core.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.gson.GsonBuilder;
import com.sscp.core.services.GlobalConfigurationService;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;

/**
 * Account Details Component
 */
@Model(
    adaptables = {SlingHttpServletRequest.class, Resource.class},
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
    resourceType = "sscp/components/accountdetails"
)
@Exporter(name = "jackson", extensions = "json")
public class AccountDetails {

    @OSGiService
    @Self
    private GlobalConfigurationService globalConfig;

    @ValueMapValue
    private String accountDetailsLabelText;

    @ValueMapValue
    private String accountProductTypeLabelText;

    @ValueMapValue
    private String accountNumberLabelText;

    @ValueMapValue
    private String annualBalanceLabelText;

    @ValueMapValue
    private String accountNameLabelText;

    @ValueMapValue
    private String accountTermLabelText;

    @ValueMapValue
    private String accountTermCaptionText;

    @ValueMapValue
    private String accountStatusLabelText;

    @ValueMapValue
    private String accountStatusCaptionText;

    @ValueMapValue
    private String accountFinancedAmountLabelText;

    @ValueMapValue
    private String accountFinancedAmountCaptionText;

    @ValueMapValue
    private String accountCurrentBalanceLabelText;

    @ValueMapValue
    private String accountCurrentBalanceCaptionText;

    @ValueMapValue
    private String accountStartDateLabelText;

    @ValueMapValue
    private String accountEndDateLabelText;

    @ValueMapValue
    private String accountInterestRateLabelText;

    @ValueMapValue
    private String accountMonthsRunLabelText;

    @ValueMapValue
    private String accountMonthsRunCaptionText;

    @ValueMapValue
    private String accountMaturityOptionLabelText;

    @ValueMapValue
    private String accountVehEndOdoLabelText;

    @ValueMapValue
    private String accountVehEndOdoCaptionText;

    @ValueMapValue
    private String accountGuaranteedFutureValLabelText;

    @ValueMapValue
    private String accountGuaranteedFutureValCaptionText;

    @ValueMapValue
    private String balloonPaymentAmountLabelText;

    @ValueMapValue
    private String balloonPaymentAmountCaptionText;

    @ValueMapValue
    private String dealershipNameLabelText;

    @ValueMapValue
    private String dealershipNameCaptionText;

    @ValueMapValue
    private String viewRepaymentsButtonText;

    @JsonIgnore
    private String json;

    @PostConstruct
    protected void init() {
        this.json = new GsonBuilder().create().toJson(this);
    }

    public String getAccountDetailsLabelText() { return this.accountDetailsLabelText; }

    public String getAccountProductTypeLabelText() { return this.accountProductTypeLabelText; }

    public String getAccountNumberLabelText() { return this.accountNumberLabelText; }

    public String getAnnualBalanceLabelText() { return this.annualBalanceLabelText; }

    public String getAccountNameLabelText() { return this.accountNameLabelText; }

    public String getAccountTermLabelText() { return this.accountTermLabelText; }

    public String getAccountTermCaptionText() { return this.accountTermCaptionText; }

    public String getAccountStatusLabelText() { return this.accountStatusLabelText; }

    public String getAccountStatusCaptionText() { return this.accountStatusCaptionText; }

    public String getAccountFinancedAmountLabelText() { return this.accountFinancedAmountLabelText; }

    public String getAccountFinancedAmountCaptionText() { return this.accountFinancedAmountCaptionText; }

    public String getAccountCurrentBalanceLabelText() { return this.accountCurrentBalanceLabelText; }

    public String getAccountCurrentBalanceCaptionText() { return this.accountCurrentBalanceCaptionText; }

    public String getAccountStartDateLabelText() { return this.accountStartDateLabelText; }

    public String getAccountEndDateLabelText() { return this.accountEndDateLabelText; }

    public String getAccountInterestRateLabelText() { return this.accountInterestRateLabelText; }

    public String getAccountMonthsRunLabelText() { return this.accountMonthsRunLabelText; }

    public String getAccountMonthsRunCaptionText() { return this.accountMonthsRunCaptionText; }

    public String getAccountMaturityOptionLabelText() { return this.accountMaturityOptionLabelText; }

    public String getAccountVehEndOdoLabelText() { return this.accountVehEndOdoLabelText; }

    public String getAccountVehEndOdoCaptionText() { return this.accountVehEndOdoCaptionText; }

    public String getAccountGuaranteedFutureValLabelText() { return this.accountGuaranteedFutureValLabelText; }

    public String getAccountGuaranteedFutureValCaptionText() { return this.accountGuaranteedFutureValCaptionText; }

    public String getBalloonPaymentAmountLabelText() { return this.balloonPaymentAmountLabelText; }

    public String getBalloonPaymentAmountCaptionText() { return this.balloonPaymentAmountCaptionText; }

    public String getDealershipNameLabelText() { return this.dealershipNameLabelText; }

    public String getDealershipNameCaptionText() { return this.dealershipNameCaptionText; }

    public String getViewRepaymentsButtonText() { return this.viewRepaymentsButtonText; }

    public String getJson() { return json; }
}