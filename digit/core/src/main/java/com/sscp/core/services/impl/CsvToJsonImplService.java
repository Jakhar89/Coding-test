package com.sscp.core.services.impl;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;

import com.day.cq.dam.api.Asset;
import com.sscp.core.services.CsvToJsonService;
import com.sscp.core.services.datasource.StreetType;
import com.sscp.core.services.datasource.Suburb;

@Component(service = CsvToJsonService.class, immediate = true)
public class CsvToJsonImplService implements CsvToJsonService {

    @Override
    public List<StreetType> getStreetType(String filePath, ResourceResolver resourceResolver) {
        List<StreetType> streetType = new ArrayList<StreetType>();
        BufferedReader reader = csvItemsList(filePath, resourceResolver);
        try {
            String line;
            while((line = reader.readLine()) != null) {
                String[] fieldValue = itemDelimiter(line);
                streetType.add(new StreetType(fieldValue[6], fieldValue[4]));
            }
            return streetType;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<Suburb> getSuburbsList(String filePath, ResourceResolver resourceResolver) {
        List<Suburb> suburb = new ArrayList<Suburb>();
        BufferedReader reader = csvItemsList(filePath, resourceResolver);
        try {
            String line;
            while((line = reader.readLine()) != null) {
                String[] fieldValue = itemDelimiter(line);
                suburb.add(new Suburb(fieldValue[1], fieldValue[2], fieldValue[0]));
            }
            return suburb;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    private BufferedReader csvItemsList(String filePath, ResourceResolver resourceResolver) {
        Resource resource = resourceResolver.getResource(filePath);
        Asset asset = resource.adaptTo(Asset.class);
        Resource original = asset.getOriginal();
        InputStream content = original.adaptTo(InputStream.class);
        return new BufferedReader(new InputStreamReader(content, StandardCharsets.UTF_8));
    }

    private String[] itemDelimiter(String line) {
        return line.split(",");
    }
}
