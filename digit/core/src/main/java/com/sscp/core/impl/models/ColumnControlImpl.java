package com.sscp.core.impl.models;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import javax.annotation.PostConstruct;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSyntaxException;
import com.sscp.core.models.ColumnControl;
import com.sscp.core.models.Component;
import com.sscp.core.support.components.AbstractComponentImpl;
import com.sscp.core.support.constants.ApplicationConstants;
import com.sscp.core.util.CommonUtils;
import com.sscp.core.util.JsonUtils;


@Model(
		adaptables = {SlingHttpServletRequest.class, Resource.class},
		adapters = {Component.class, ColumnControl.class},
		resourceType = {ColumnControl.RESOURCE_TYPE},
		defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
		)
@Exporter(name= "jackson", extensions = "json")
public class ColumnControlImpl extends AbstractComponentImpl implements ColumnControl {

	private static final Logger LOG = LoggerFactory.getLogger(ColumnControlImpl.class);

	private List<Map<String, String>> layoutConfigList = new ArrayList<>();

	@ValueMapValue
	private String columnsLayout;


	@PostConstruct
	protected void init() {
		processLayoutConfig();
	}

	private void processLayoutConfig() {
		JsonObject columnsLayoutJson = getColumnLayoutJson();

		if (columnsLayoutJson != null && columnsLayoutJson.has("items")) {
			try {
				for (JsonElement item : columnsLayoutJson.getAsJsonArray("items")) {
					JsonObject itemConfig = item.getAsJsonObject();

					if (itemConfig.get("value").getAsString().equals(columnsLayout)) {
						for (JsonElement layoutItem : itemConfig.getAsJsonArray("layout")) {
							Map<String, String> layoutConf = new HashMap<> ();
							layoutConf.put("offset", layoutItem.getAsJsonObject().get("offset").getAsString());
							layoutConf.put("col", layoutItem.getAsJsonObject().get("col").getAsString());
							layoutConfigList.add(layoutConf);
						}
					}
				}
			}catch (Exception e) {
				LOG.error("exception on reading Layout JSON", e);
			}
		}
	}

	@Nullable
	private JsonObject getColumnLayoutJson() {
		try (ResourceResolver resolver = CommonUtils.getInstance().getServiceResourceResolver(
				resourceResolverFactory,
				ApplicationConstants.SERVICE_USER)) {
			return JsonUtils.getInstance().getJsonObjectFromPath(LAYOUTS_JSON_PATH, resolver);
		} catch (LoginException ex) {
			LOG.error("The column layout JSON structure could not be resolved!", ex);
		} catch (JsonSyntaxException jse) {
			LOG.error("The column layout JSON structure could not be resolved!", jse);
		}

		return null;
	}

	public List<Map<String, String>> getLayoutConfigList() {
		return layoutConfigList;
	}

	@Override
	@NotNull
	public String getColumnsLayout() {
		return columnsLayout;
	}


}
