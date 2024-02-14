package com.sscp.core.models;

import com.day.cq.commons.inherit.InheritanceValueMap;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

/**
 * Communications Config Component
 */
@Model(
        adaptables = {SlingHttpServletRequest.class, Resource.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
        resourceType = "sscp/components/communicationsconfig"
)
@Exporter(name= "jackson", extensions = "json")
public class CommunicationsConfig {

	@Inject
	private transient InheritanceValueMap pageProperties;

	@ValueMapValue
	private String verifyMobileTitle;

	@ValueMapValue
	private String verifyMobileDescription;

	@ValueMapValue
	private String verifyMobileOTPText;

	@ValueMapValue
	private String verifyMobileCancelButton;

	@ValueMapValue
	private String verifyMobileContinueButton;

	@ValueMapValue
	private String verifyMobileResendText;

	@ValueMapValue
	private String resendSMSText;

	@ValueMapValue
	private String verifyMobileDisclaimer;

	@ValueMapValue
	private String verifyEmailTitle;

	@ValueMapValue
	private String verifyEmailDescription;

	@ValueMapValue
	private String verifyEmailOTPText;

	@ValueMapValue
	private String verifyEmailCancelButton;

	@ValueMapValue
	private String verifyEmailContinueButton;

	@ValueMapValue
	private String verifyEmailResendText;

	@ValueMapValue
	private String resendEmailText;

	@ValueMapValue
	private String verifyEmailDisclaimer;

	@ValueMapValue
	@Default(intValues = 3000)
	private Integer thankYouOverlayTimer;

	@ValueMapValue
	private String thankYouIcon;

	@ValueMapValue
	private String thankYouTitle;

	@ValueMapValue
	private String thankYouDescription;

	@ValueMapValue
	private String managePasswordEditTitle;

	@ValueMapValue
	private String managePasswordDescription;

	@PostConstruct
	protected void inheritVerifyMobileProperties() {
		this.verifyMobileTitle = (null == this.verifyMobileTitle) ? pageProperties.getInherited("verifyMobileTitle", String.class): this.verifyMobileTitle;
		this.verifyMobileDescription = (null == this.verifyMobileDescription) ? pageProperties.getInherited("verifyMobileDescription", String.class): this.verifyMobileDescription;
		this.verifyMobileOTPText = (null == this.verifyMobileOTPText) ? pageProperties.getInherited("verifyMobileOTPText", String.class): this.verifyMobileOTPText;
		this.verifyMobileCancelButton = (null == this.verifyMobileCancelButton) ? pageProperties.getInherited("verifyMobileCancelButton", String.class): this.verifyMobileCancelButton;
		this.verifyMobileContinueButton = (null == this.verifyMobileContinueButton) ? pageProperties.getInherited("verifyMobileContinueButton", String.class): this.verifyMobileContinueButton;
		this.verifyMobileResendText = (null == this.verifyMobileResendText) ? pageProperties.getInherited("verifyMobileResendText", String.class): this.verifyMobileResendText;
		this.resendSMSText = (null == this.resendSMSText) ? pageProperties.getInherited("resendSMSText", String.class): this.resendSMSText;
		this.verifyMobileDisclaimer = (null == this.verifyMobileDisclaimer) ? pageProperties.getInherited("verifyMobileDisclaimer", String.class): this.verifyMobileDisclaimer;
	}

	@PostConstruct
	protected void inheritVerifyEmailProperties() {
		this.verifyEmailTitle = (null == this.verifyEmailTitle) ? pageProperties.getInherited("verifyEmailTitle", String.class): this.verifyEmailTitle;
		this.verifyEmailDescription = (null == this.verifyEmailDescription) ? pageProperties.getInherited("verifyEmailDescription", String.class): this.verifyEmailDescription;
		this.verifyEmailOTPText = (null == this.verifyEmailOTPText) ? pageProperties.getInherited("verifyEmailOTPText", String.class): this.verifyEmailOTPText;
		this.verifyEmailCancelButton = (null == this.verifyEmailCancelButton) ? pageProperties.getInherited("verifyEmailCancelButton", String.class): this.verifyEmailCancelButton;
		this.verifyEmailContinueButton = (null == this.verifyEmailContinueButton) ? pageProperties.getInherited("verifyEmailContinueButton", String.class): this.verifyEmailContinueButton;
		this.verifyEmailResendText = (null == this.verifyEmailResendText) ? pageProperties.getInherited("verifyEmailResendText", String.class): this.verifyEmailResendText;
		this.resendEmailText = (null == this.resendEmailText) ? pageProperties.getInherited("resendEmailText", String.class): this.resendEmailText;
		this.verifyEmailDisclaimer = (null == this.verifyEmailDisclaimer) ? pageProperties.getInherited("verifyEmailDisclaimer", String.class): this.verifyEmailDisclaimer;
	}

	@PostConstruct
	protected void inheritThankyouProperties() {
		this.thankYouOverlayTimer = (null == this.thankYouOverlayTimer) ? pageProperties.getInherited("thankYouOverlayTimer", Integer.class): this.thankYouOverlayTimer;
		this.thankYouIcon = (null == this.thankYouIcon) ? pageProperties.getInherited("thankYouIcon", String.class): this.thankYouIcon;
		this.thankYouTitle = (null == this.thankYouTitle) ? pageProperties.getInherited("thankYouTitle", String.class): this.thankYouTitle;
		this.thankYouDescription = (null == this.thankYouDescription) ? pageProperties.getInherited("thankYouDescription", String.class): this.thankYouDescription;
	}

	@PostConstruct
	protected void inheritManagePasswordProperties() {
		this.managePasswordEditTitle = (null == this.managePasswordEditTitle) ? pageProperties.getInherited("managePasswordEditTitle", String.class): this.managePasswordEditTitle;
		this.managePasswordDescription = (null == this.managePasswordDescription) ? pageProperties.getInherited("managePasswordDescription", String.class): this.managePasswordDescription;
	}

	public String getVerifyMobileTitle() { return this.verifyMobileTitle; }

	public String getVerifyMobileDescription() { return this.verifyMobileDescription; }

	public String getVerifyMobileOTPText() { return this.verifyMobileOTPText; }

	public String getVerifyMobileCancelButton() { return this.verifyMobileCancelButton; }

	public String getVerifyMobileContinueButton() { return this.verifyMobileContinueButton; }

	public String getVerifyMobileResendText() { return this.verifyMobileResendText; }

	public String getResendSMSText() { return this.resendSMSText; }

	public String getVerifyMobileDisclaimer() { return this.verifyMobileDisclaimer; }

	public String getVerifyEmailTitle() { return this.verifyEmailTitle; }

	public String getVerifyEmailDescription() { return this.verifyEmailDescription; }

	public String getVerifyEmailOTPText() { return this.verifyEmailOTPText; }

	public String getVerifyEmailCancelButton() { return this.verifyEmailCancelButton; }

	public String getVerifyEmailContinueButton() { return this.verifyEmailContinueButton; }

	public String getVerifyEmailResendText() { return this.verifyEmailResendText; }

	public String getResendEmailText() { return this.resendEmailText; }

	public String getVerifyEmailDisclaimer() { return this.verifyEmailDisclaimer; }

	public Integer getThankYouOverlayTimer() { return this.thankYouOverlayTimer; }

	public String getThankYouIcon() { return this.thankYouIcon; }

	public String getThankYouTitle() { return this.thankYouTitle; }

	public String getThankYouDescription() { return this.thankYouDescription; }

	public String getManagePasswordEditTitle() { return this.managePasswordEditTitle; }

	public String getManagePasswordDescription() { return this.managePasswordDescription; }
	
}
