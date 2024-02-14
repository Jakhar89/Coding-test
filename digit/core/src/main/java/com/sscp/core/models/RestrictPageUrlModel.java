package com.sscp.core.models;

import java.lang.reflect.Array;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;

import com.day.cq.commons.inherit.InheritanceValueMap;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;

@Model(
        adaptables = {SlingHttpServletRequest.class, Resource.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
@Exporter(name= "jackson", extensions = "json")
public class RestrictPageUrlModel {
	
	@Inject
	private transient InheritanceValueMap pageProperties;
	
	private String[] restrictUrlList;
	
	@JsonIgnore
	private String json;
	
	@PostConstruct
	protected void getRestricteUrls() {
		this.restrictUrlList = pageProperties.getInherited("restrictPath", String[].class);
		int i = 0;
		if(restrictUrlList != null) {
			for(String pageUrl : restrictUrlList) {
				restrictUrlList[i] = pageUrl.substring(1).replace("/", ":");
				i++;
			}
		}
		
		this.json = new GsonBuilder().create().toJson(this);
	}
	
	public String[] getRestrictUrlList() { return restrictUrlList; }
	
	public String getJson() { return json; }
	
}
