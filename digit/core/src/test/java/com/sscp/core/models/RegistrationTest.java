package com.sscp.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mockStatic;

import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.MockedStatic;
import org.mockito.junit.jupiter.MockitoExtension;

import com.sscp.core.services.impl.BrandvariablesValueMappingImpl;
import com.sscp.core.util.GlobalDataMapUtil;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
public class RegistrationTest {

	private final AemContext context = new AemContext(ResourceResolverType.JCR_MOCK);

	@InjectMocks
	private Registration regi;
	
	static MockedStatic<GlobalDataMapUtil> staticMock;
	
	@BeforeAll
	static void setMock() {
		staticMock = mockStatic(GlobalDataMapUtil.class);
		
	}

	@BeforeEach
	void setup() {
		context.addModelsForClasses(Registration.class);
		context.registerService(new BrandvariablesValueMappingImpl());
		
		context.load().json("/com/sscp/core/impl/models/registration.json",
				"/content/component");
		context.currentResource("/content/component/registration");
	}

	@Test
	void test(){
		regi = context.request().adaptTo(Registration.class);
		String rert = regi.getJson();
		assertEquals("I have read and accept all", regi.getAgreeTerms());
		assertEquals("Continue", regi.getAgreeTermsButton());
		assertEquals("Agree to Conditions of use", regi.getAgreeTermsTitle());
		assertEquals(rert, regi.getJson());
		assertEquals("Log in", regi.getLoginButton());
		assertEquals("/content/sscp/blueprint/homepage/login", regi.getLoginButtonUrl());
		assertEquals("car-badge", regi.getLoginIcon());
		assertEquals("Already have an account?", regi.getLoginTitle());
		assertEquals("Continue", regi.getRegisterButton());
		assertEquals("<p>Having trouble registering your account?", regi.getRegisterContact());
		assertEquals("To register please use an email address known to.", regi.getRegisterDescription());
		assertEquals("Register your account", regi.getRegisterTitle());
		assertEquals(null, regi.getTermsOfUse());
		assertEquals("Set password", regi.getResetPasswordText());
		assertEquals("Conditions of use", regi.getTermsTitle());
	}
	
	@AfterAll
	  public static void afterEach() {
		staticMock.close();
	  }

}
