package com.sscp.core.models;

import static org.junit.jupiter.api.Assertions.*;

import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import com.sscp.core.services.impl.BrandvariablesValueMappingImpl;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class LockedAccountTest {
	
	@InjectMocks
	private LockedAccount lockedAcc;
	
	private final AemContext context = new AemContext(ResourceResolverType.JCR_MOCK);
	
	@BeforeEach
	public void setup() throws Exception {
		context.addModelsForClasses(LockedAccount.class);
		context.registerService(new BrandvariablesValueMappingImpl());
		context.load().json("/com/sscp/core/impl/models/lockedaccount.json",
				"/content/component");
		context.currentResource("/content/component/lockedAccount");
	}


	@Test
	void test() {
		lockedAcc = context.request().adaptTo(LockedAccount.class);
		String json = lockedAcc.getJson();
		assertEquals("accountUnlock", lockedAcc.getEventName());
		assertEquals(json, lockedAcc.getJson());
		assertEquals("Unlock account", lockedAcc.getLockedButtonText());
		assertEquals("contact our customer service team on", lockedAcc.getLockedDescription());
		assertEquals("lock", lockedAcc.getLockedIcon());
		assertEquals("Your account has been locked", lockedAcc.getLockedTitle());
		assertEquals("Login & Continue", lockedAcc.getLoginButtonText());
		assertEquals("Reset password", lockedAcc.getResetButtonText());
		assertEquals("Set Password & log in", lockedAcc.getSetPasswordText());
		assertEquals("Your account has been unlocked.", lockedAcc.getUnlockedDescription());
		assertEquals("unlocked", lockedAcc.getUnlockedIcon());
		assertEquals("Your account has been unlocked", lockedAcc.getUnlockedTitle());
		
	}

}
