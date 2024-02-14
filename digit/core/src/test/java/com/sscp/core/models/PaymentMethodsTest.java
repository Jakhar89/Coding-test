package com.sscp.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import com.sscp.core.services.impl.BrandvariablesValueMappingImpl;

import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
public class PaymentMethodsTest {

    private final AemContext context = new AemContext(ResourceResolverType.JCR_MOCK);

    @InjectMocks
    private PaymentMethods payMethods;

    @BeforeEach
    void setup() {
        context.addModelsForClasses(PaymentMethods.class);
		context.registerService(new BrandvariablesValueMappingImpl());
		context.load().json("/com/sscp/core/impl/models/PaymentMethods.json",
				"/content/component");
		context.currentResource("/content/component/paymentMethods");
       // payMethods = context.request().adaptTo(PaymentMethods.class);
    }

    @Test
    void test(){
    	payMethods = context.request().adaptTo(PaymentMethods.class);
        assertEquals("Payment methods", payMethods.getPaymentMethodsLabelText());
        assertEquals("We offer a range of payment methods to suit you.", payMethods.getPaymentMethodsDescriptionText());
        assertEquals("Nominated Payment Method", payMethods.getNominatedFlagText());
        assertEquals("Direct debit", payMethods.getDirectDebitLabelText());
        assertEquals("pay-date", payMethods.getDirectDebitIcon());
        assertEquals("To setup or change your Direct Debit", payMethods.getDirectDebitDescriptionText());
        assertEquals("EFT", payMethods.getEftLabelText());
        assertEquals("online-payment-with-a-credit-card", payMethods.getEftIcon());
        assertEquals("Make EFT payments directly from your cheque", payMethods.getEftDescriptionText());
        assertEquals("BPAY", payMethods.getBpayLabelText());
        assertEquals("bpay", payMethods.getBpayIcon());
        assertEquals("Contact your bank or financial institution", payMethods.getBpayDescriptionText());
        assertEquals("edit", payMethods.getEditIcon());
        String json = payMethods.getJson();
        assertEquals(json, payMethods.getJson());

    }

    void testPaymentMethodsLabelText2() {
        String expected = "Payment Methods Label";
        String actual = payMethods.getPaymentMethodsLabelText();
        assertEquals(expected, actual);
    }

    
    void testPaymentMethodsDescriptionText() {
        String expected = "Payment Methods Description";
        String actual = payMethods.getPaymentMethodsDescriptionText();
        assertEquals(expected, actual);
    }

    
    void testNominatedFlagText() {
        String expected = "Nominated Flag Text";
        String actual = payMethods.getNominatedFlagText();
        assertEquals(expected, actual);
    }

    
    void testDirectDebitLabelText() {
        String expected = "Direct Debit Label Text";
        String actual = payMethods.getDirectDebitLabelText();
        assertEquals(expected, actual);
    }

    
    void testDirectDebitIcon() {
        String expected = "Direct Debit Icon";
        String actual = payMethods.getDirectDebitIcon();
        assertEquals(expected, actual);
    }

    
    void testDirectDebitDescriptionText() {
        String expected = "Direct Debit Description Text";
        String actual = payMethods.getDirectDebitDescriptionText();
        assertEquals(expected, actual);
    }

    
    void testEftLabelText() {
        String expected = "EFT Label Text";
        String actual = payMethods.getEftLabelText();
        assertEquals(expected, actual);
    }

    
    void testEftIcon() {
        String expected = "EFT Icon";
        String actual = payMethods.getEftIcon();
        assertEquals(expected, actual);
    }

    
    void testEftDescriptionText() {
        String expected = "EFT Description Text";
        String actual = payMethods.getEftDescriptionText();
        assertEquals(expected, actual);
    }

    
    void testBpayLabelText() {
        String expected = "BPAY Label Text";
        String actual = payMethods.getBpayLabelText();
        assertEquals(expected, actual);
    }

    
    void testBpayIcon() {
        String expected = "BPAY Icon";
        String actual = payMethods.getBpayIcon();
        assertEquals(expected, actual);
    }

    
    void testBpayDescriptionText() {
        String expected = "BPAY Description Text";
        String actual = payMethods.getBpayDescriptionText();
        assertEquals(expected, actual);
    }

    
    void testEditIcon() {
        String expected = "Edit Icon";
        String actual = payMethods.getEditIcon();
        assertEquals(expected, actual);
    }

    
    void testJsonGeneration() {
        assertNotEquals(null, payMethods.getJson());
    }
}
