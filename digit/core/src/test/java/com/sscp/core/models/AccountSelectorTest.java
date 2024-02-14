package com.sscp.core.models;

import static org.junit.jupiter.api.Assertions.*;

import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import com.sscp.core.impl.models.TransactionHistoryImpl;

import io.wcm.testing.mock.aem.builder.ContentBuilder;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
public class AccountSelectorTest {

    @InjectMocks
	private AccountSelector accSelector;

    
    public final AemContext context = new AemContext(ResourceResolverType.JCR_MOCK);

    @BeforeEach
	public void setup() throws Exception {
		context.addModelsForClasses(AccountSelector.class);
		ContentBuilder cntBuilder = context.create();
		context.load().json("/com/sscp/core/impl/models/accountSelector.json",
				"/content/component");
		context.currentResource("/content/component");
	}

    @Test
    public void test() {
        // Instantiate the model
        AccountSelector model = context.request().adaptTo(AccountSelector.class);

        // Perform assertions
        assertEquals("SELECT ACCOUNT", model.getAccountSelectorLabel());
        assertNotEquals(null, model.getJson());
    }
}
