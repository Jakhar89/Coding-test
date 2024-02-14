package com.sscp.core.services.impl;

import java.util.HashSet;
import java.util.Set;

import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.wcm.api.Page;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.sscp.core.services.BrandvariablesValueMapping;

@Component(service = BrandvariablesValueMapping.class, immediate = true)
public class BrandvariablesValueMappingImpl implements BrandvariablesValueMapping {

	public static Set<String> brandNamesSet = new HashSet<String>();
	private static final Logger LOG = LoggerFactory.getLogger(BrandvariablesValueMappingImpl.class);
	static {
		final String BRAND_NAME = "brandName";
		final String PHONE_NUMBER_ONE = "brandPhNumber1";
		final String PHONE_NUMBER_TWO = "brandPhNumber2";
		final String EMAIL_ONE = "brandEmail1";
		final String EMAIL_TWO = "brandEmail2";
		final String POSTAL_ADD = "brandPostalAddress";
		final String TRANSACTION_HISTORY_FOOTER = "brandTransactionHistoryFooter";

		brandNamesSet.add(BRAND_NAME);
		brandNamesSet.add(PHONE_NUMBER_ONE);
		brandNamesSet.add(PHONE_NUMBER_TWO);
		brandNamesSet.add(EMAIL_ONE);
		brandNamesSet.add(EMAIL_TWO);
		brandNamesSet.add(POSTAL_ADD);
		brandNamesSet.add(TRANSACTION_HISTORY_FOOTER);
	}

	@Override
	public String mapBrandVariableValues(Page currentPage, String json) {
		try {
			JsonObject gson = new Gson().fromJson(json, JsonObject.class);

			gson.remove("brandVariablesMapping");
			json = gson.toString();
			InheritanceValueMap ivm = new HierarchyNodeInheritanceValueMap(currentPage.getContentResource());
			for (String key : BrandvariablesValueMappingImpl.brandNamesSet) {
				if (ivm.getInherited(key, String.class) != null) {
					String brandValue = ivm.getInherited(key, String.class);
					json = brandValue.isEmpty() ? json : json.replace("{" + key + "}", brandValue);
				}
			}
		} catch (Exception e) {
			LOG.error("Exception occured at BrandVariablesMappin {}", e.getMessage());
			LOG.error("Final json string  {}", json);
		}
		return json;
	}

}
