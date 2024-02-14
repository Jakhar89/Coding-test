package com.sscp.core.services.datasource;

import com.google.gson.JsonParseException;
import com.sscp.core.support.constants.ApplicationConstants;
import com.sscp.core.util.CommonUtils;
import com.sscp.core.util.JsonUtils;
import com.adobe.granite.ui.components.ExpressionResolver;
import com.adobe.granite.ui.components.ds.DataSource;
import com.adobe.granite.ui.components.ds.SimpleDataSource;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.servlets.annotations.SlingServletName;
import org.apache.sling.servlets.annotations.SlingServletResourceTypes;
import org.jetbrains.annotations.NotNull;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.component.propertytypes.ServiceDescription;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.Servlet;
import java.util.ArrayList;
import java.util.List;

@Component(immediate = true, service = Servlet.class)
@SlingServletResourceTypes(
        extensions = JsonDataSourceService.SERVLET_EXTENSION,
        methods = HttpConstants.METHOD_GET,
        resourceTypes = JsonDataSourceService.RESOURCE_TYPE
)
@SlingServletName(servletName = "JSON Data Source")
@ServiceDescription("JSON data source provider for Touch UI dialogs.")
public class JsonDataSourceService extends AbstractDataSourceService {
    protected static final String RESOURCE_TYPE = "sscp/datasource/json";
    protected static final String SERVLET_EXTENSION = "html";

    private static final Logger log = LoggerFactory.getLogger(JsonDataSourceService.class);

    @Reference
    private transient ExpressionResolver expressionResolver;

    @Reference
    private transient ResourceResolverFactory resourceResolverFactory;

    @Override
    protected @NotNull ExpressionResolver getExpressionResolver() {
        return expressionResolver;
    }

    @Override
    @SuppressWarnings("squid:S1696")
    protected @NotNull DataSource getDataSource() {
        final List<Resource> data = new ArrayList<>();

        try (ResourceResolver resolver = CommonUtils.getInstance().getServiceResourceResolver(
                resourceResolverFactory,
                ApplicationConstants.SERVICE_USER)) {
            final JsonObject json = JsonUtils.getInstance().getJsonObjectFromPath(getDataSourcePath(), resourceResolver);

            if (json != null) {
                JsonArray items = json.get("items").getAsJsonArray();

                for (JsonElement item : items) {
                    JsonObject itemObject = item.getAsJsonObject();

                    data.add(generateEntry(itemObject.get("text").getAsString(),
                            itemObject.get("value").getAsString(),
                            null));
                }
            }
        } catch (ClassCastException | LoginException | IllegalStateException | JsonParseException | NullPointerException ex) {
            log.error("An issue occurred while trying to retrieve the JSON data.", ex);
        }

        return new SimpleDataSource(data.iterator());
    }
}
