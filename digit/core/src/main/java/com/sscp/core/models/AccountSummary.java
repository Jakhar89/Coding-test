package com.sscp.core.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.gson.GsonBuilder;
import com.sscp.core.util.ModelUtil;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import com.sscp.core.services.GlobalConfigurationService;
import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.Arrays;
import com.google.gson.JsonArray;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;

/**
 * Account Summary Component
 */
@Model(
        adaptables = {SlingHttpServletRequest.class, Resource.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
        resourceType = "sscp/components/accountsummary"
)
@Exporter(name= "jackson", extensions = "json")
public class AccountSummary {
    private static final String actionMenu = "actionMenu";
    private static final String actionMenuLink= "actionMenuLink";
    private JsonArray actionMenuList;
    
    @OSGiService
    @Self
    private GlobalConfigurationService globalConfig;

    @ValueMapValue
    private String accountNumberTitle;

    @ValueMapValue
    private String paidToDateTitle;

    @ValueMapValue
    private String outstandingBalanceTitle;

    @ValueMapValue
    private String nextRepaymentDueTitle;

    @ValueMapValue
    private String loanProgressTitle;

    @ValueMapValue
    private String paidToDateTooltip;

    @ValueMapValue
    private String outstandingBalanceTooltip;

    @ValueMapValue
    private String recentTransactionsTitle;

    @ValueMapValue
    private String recentTransactionsTooltip;

    @ValueMapValue
    private String noTransactionsText;
    
    @ValueMapValue
    private String buttonLabel;
    
    @ValueMapValue
    private String buttonLink;
    
    @ValueMapValue
    private String date;
    
    @ValueMapValue
    private String paymentAmount;

    @ValueMapValue
    private String balance;
    
    @JsonIgnore
    private String json;
    
    @Inject
    private Resource resource;
    
    @PostConstruct
    protected void init() {
        actionMenuList = ModelUtil.toJsonArray(getResource().getChild("actionMenuTypeItem"), Arrays.asList(new String[]{actionMenu, actionMenuLink}));
        resource = null;
        this.json = new GsonBuilder().create().toJson(this);
    }
    
    public JsonArray getActionMenuList() { return actionMenuList; }

    public String getPaidToDateTitle() { return paidToDateTitle; }

    public String getOutstandingBalanceTitle() { return outstandingBalanceTitle; }
        
    public String getLoanProgressTitle() { return this.loanProgressTitle; }

    public String getNextRepaymentDueTitle() { return nextRepaymentDueTitle; }

    public String getPaidToDateTooltip() { return paidToDateTooltip; }

    public String getOutstandingBalanceTooltip() { return outstandingBalanceTooltip; }

    public String getRecentTransactionsTitle() { return recentTransactionsTitle; }

    public String getRecentTransactionsTooltip() { return recentTransactionsTooltip; }

    public String getNoTransactionsText() { return noTransactionsText; }

    public String getButtonLabel() { return buttonLabel; }

    public String getDate() { return date; }

    public String getPaymentAmount() { return paymentAmount; }

    public String getBalance() { return balance; }

    public String getButtonLink() { return buttonLink; }
    
    public String getJson() { return json; }
    
    public Resource getResource() { return resource; }
}
