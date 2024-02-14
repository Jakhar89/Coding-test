package com.sscp.core.models;

import static org.junit.jupiter.api.Assertions.*;

import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;


import io.wcm.testing.mock.aem.builder.ContentBuilder;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class CommunicationsConfigTest {

    private final AemContext context = new AemContext();

    private CommunicationsConfig communicationsConfig;

    @BeforeEach
    void setUp() {
        context.load().json("/com/sscp/core/impl/models/communicationsconfig.json", "/content");
        context.currentResource("/content/communicationsConfig");
        communicationsConfig = context.request().adaptTo(CommunicationsConfig.class);
    }

    @Test
    void testProperties() {
        assertEquals("Verify Mobile Title", communicationsConfig.getVerifyMobileTitle());
        assertEquals("Verify Mobile Description", communicationsConfig.getVerifyMobileDescription());
        assertEquals("Verify Mobile OTP Text", communicationsConfig.getVerifyMobileOTPText());
        assertEquals("Verify Mobile Cancel Button", communicationsConfig.getVerifyMobileCancelButton());
        assertEquals("Verify Mobile Continue Button", communicationsConfig.getVerifyMobileContinueButton());
        assertEquals("Verify Mobile Resend Text", communicationsConfig.getVerifyMobileResendText());
        assertEquals("Resend SMS Text", communicationsConfig.getResendSMSText());
        assertEquals("Verify Mobile Disclaimer", communicationsConfig.getVerifyMobileDisclaimer());
        assertEquals("Verify Email Title", communicationsConfig.getVerifyEmailTitle());
        assertEquals("Verify Email Description", communicationsConfig.getVerifyEmailDescription());
        assertEquals("Verify Email OTP Text", communicationsConfig.getVerifyEmailOTPText());
        assertEquals("Verify Email Cancel Button", communicationsConfig.getVerifyEmailCancelButton());
        assertEquals("Verify Email Continue Button", communicationsConfig.getVerifyEmailContinueButton());
        assertEquals("Verify Email Resend Text", communicationsConfig.getVerifyEmailResendText());
        assertEquals("Resend Email Text", communicationsConfig.getResendEmailText());
        assertEquals("Verify Email Disclaimer", communicationsConfig.getVerifyEmailDisclaimer());
        assertEquals(3000, communicationsConfig.getThankYouOverlayTimer());
        assertEquals("Thank You Icon", communicationsConfig.getThankYouIcon());
        assertEquals("Thank You Title", communicationsConfig.getThankYouTitle());
        assertEquals("Thank You Description", communicationsConfig.getThankYouDescription());
        assertEquals("Manage Password Edit Title", communicationsConfig.getManagePasswordEditTitle());
        assertEquals("Manage Password Description", communicationsConfig.getManagePasswordDescription());
    }

}


