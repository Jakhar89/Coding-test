package com.sscp.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class AnnualInterestTest {

    private final AemContext context = new AemContext();

    private AnnualInterest annualInterest;

    @BeforeEach
    void setUp() {
        context.load().json("/com/sscp/core/impl/models/AnnualInterest.json", "/content/annualinterest");
        Resource resource = context.resourceResolver().getResource("/content/annualinterest");
        annualInterest = resource.adaptTo(AnnualInterest.class);
    }

    @Test
    void testGetFinancialYearText() {
        String expectedText = "Financial year";
        String actualText = annualInterest.getFinancialYearText();
        assertEquals(expectedText, actualText);
    }

    @Test
    void testGetAnnualInterestLabelText() {
        String expectedText = "Annual interest charged";
        String actualText = annualInterest.getAnnualInterestLabelText();
        assertEquals(expectedText, actualText);
    }

    @Test
    void testGetSetSuffixYear() {
        boolean expectedValue = false;
        boolean actualValue = annualInterest.getSetSuffixYear();
        assertEquals(expectedValue, actualValue);
    }

    @Test
    void testGetJson() {
        assertNotEquals(null, annualInterest.getJson());
    }
}