package com.sscp.core.models;

import static org.junit.jupiter.api.Assertions.*;

import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import com.google.gson.JsonArray;
import com.google.gson.JsonParser;

import io.wcm.testing.mock.aem.builder.ContentBuilder;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class ContactUsTest {
	
	@InjectMocks
	private ContactUs contactUs;
	
	String enqTypeDataq = "[{\"enquiryItem\":\"General Enquiry\"},{\"enquiryItem\":\"Complaints\"},{\"enquiryItem\":\"Hardship\"},{\"enquiryItem\":\"New finance / Change my finance\"}]";
	@SuppressWarnings("deprecation")
	private JsonArray enquiryTypeList = (JsonArray) new JsonParser().parse(enqTypeDataq);
	private JsonArray compliantsRelatesList;
	private JsonArray genericList;
	private String json;
	
	public final AemContext context = new AemContext(ResourceResolverType.JCR_MOCK);
	
	@BeforeEach
	public void setup() throws Exception {
		context.addModelsForClasses(ContactUs.class);
		ContentBuilder cntBuilder = context.create();
		context.load().json("/com/sscp/core/impl/models/contactUs.json",
				"/content/component");
		context.currentResource("/content/component/contactUs");
	}


	@Test
	void test() {
		ContactUs cu = context.request().adaptTo(ContactUs.class);
		assertEquals(enquiryTypeList, cu.getEnquiryTypeList());
		compliantsRelatesList = cu.getComplaintRelatesToList();
		assertEquals(compliantsRelatesList, cu.getComplaintRelatesToList());
		genericList = cu.getGeneralRelatesToList();
		assertEquals(genericList, cu.getGeneralRelatesToList());
		json = cu.getJson();
		assertEquals(json, cu.getJson());
		
	}

}
