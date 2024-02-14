package com.sscp.core.services;

import java.util.List;

import org.apache.sling.api.resource.ResourceResolver;

import com.sscp.core.services.datasource.StreetType;
import com.sscp.core.services.datasource.Suburb;

public interface CsvToJsonService {
    public List<StreetType> getStreetType(String filePath, ResourceResolver resourceResolver);

    public List<Suburb> getSuburbsList(String filePath, ResourceResolver resourceResolver);
}
