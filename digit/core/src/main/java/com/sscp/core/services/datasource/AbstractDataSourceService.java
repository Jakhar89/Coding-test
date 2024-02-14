package com.sscp.core.services.datasource;

import com.adobe.granite.ui.components.Config;
import com.adobe.granite.ui.components.ExpressionCustomizer;
import com.adobe.granite.ui.components.ExpressionHelper;
import com.adobe.granite.ui.components.ExpressionResolver;
import com.adobe.granite.ui.components.ds.DataSource;
import com.adobe.granite.ui.components.ds.ValueMapResource;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.wcm.api.NameConstants;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.*;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.api.wrappers.ValueMapDecorator;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.util.HashMap;
import java.util.function.UnaryOperator;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.sscp.core.support.constants.Constants.DIALOG_RESOURCE_PATTERN;
import static com.sscp.core.support.constants.DataSourceConstants.*;

public abstract class AbstractDataSourceService extends SlingSafeMethodsServlet {
    private static final long serialVersionUID = 1180258251365536303L;

    protected transient String componentName;
    protected transient Resource currentPageResource;
    protected transient Config dataSourceConfig;
    protected transient ExpressionCustomizer expressionCustomizer;
    protected transient ExpressionHelper expressionHelper;
    protected transient ResourceResolver resourceResolver;
    protected transient SlingHttpServletRequest slingRequest;

    @Override
    protected void doGet(@NotNull SlingHttpServletRequest request,
                         @NotNull SlingHttpServletResponse response) {
        dataSourceConfig = new Config(request.getResource().getChild(PN_DATA_SOURCE));
        expressionCustomizer = ExpressionCustomizer.from(request);
        resourceResolver = request.getResourceResolver();
        slingRequest = request;
        componentName = getComponentName();
        currentPageResource = getPageResource();

//        String tagsIdentifier = TenantUtil.DEFAULT_TENANT;

//        ContentPolicyManager cpm = resourceResolver.adaptTo(ContentPolicyManager.class);

//        if (currentPageResource != null && cpm != null) {
//            ContentPolicy pagePolicy = cpm.getPolicy(currentPageResource);
//
//            if (pagePolicy != null) {
//                Resource policyResource = resourceResolver.resolve(pagePolicy.getPath());
//                ValueMap properties = policyResource.getValueMap();
//
//                if (properties.containsKey(PN_TAGS_IDENTIFIER)) {
//                    tagsIdentifier = (String) properties.get(PN_TAGS_IDENTIFIER);
//                }
//            }
//        }

//        expressionCustomizer.setVariable(PN_TAGS_IDENTIFIER, tagsIdentifier);

        expressionHelper = new ExpressionHelper(getExpressionResolver(), request);

        request.setAttribute(DataSource.class.getName(), getDataSource());
    }

    /**
     * Returns an expression resolver to be used to resolve expressions in the configuration properties.
     *
     * @return an expression resolver
     */
    @NotNull
    protected abstract ExpressionResolver getExpressionResolver();

    /**
     * Handles the Data Source request.
     *
     * @return {@link DataSource} instance
     */
    @NotNull
    protected abstract DataSource getDataSource();

    /**
     * Get the configured Data Source {@code defaultSelection}.
     *
     * @return {@link String}
     */
    public String getDataSourceDefaultSelection() {
        return dataSourceConfig.get(PN_DATA_SOURCE_DEFAULT_SELECTION, StringUtils.EMPTY);
    }

    /**
     * Get the configured Data Source {@code path}.
     *
     * @return {@link String}
     */
    public String getDataSourcePath() {
        return expressionHelper.getString(dataSourceConfig.get(PN_DATA_SOURCE_PATH, StringUtils.EMPTY));
    }

    /**
     * Get the configured DataSource {@code type}.
     *
     * @return {@link String}
     */
    public String getDataSourceType() {
        return dataSourceConfig.get(PN_DATA_SOURCE_TYPE, StringUtils.EMPTY);
    }

    /**
     * Retrieve the current component name in reference to the {@code cq:dialog} request.
     *
     * @return a {@link String} when found, otherwise {@code null}
     */
    protected final String getComponentName() {
        String dialogPath = slingRequest.getRequestPathInfo().getResourcePath();
        Pattern dialogPattern = Pattern.compile(DIALOG_RESOURCE_PATTERN);
        Matcher matches = dialogPattern.matcher(dialogPath);

        if (matches.find()) {
            return matches.group(1).substring(1);
        }

        return null;
    }

    /**
     * Retrieves the resource that is of type {@code cq:Page}. This check starts with a Sling attribute
     * and then works its way up through the parent tree.
     *
     * @return {@code null} when invalid otherwise an {@link Resource} instance
     */
    @Nullable
    protected final Resource getPageResource() {
        String pagePath = slingRequest.getRequestPathInfo().getSuffix();

        if (pagePath == null) {
            pagePath = (String) slingRequest.getAttribute("granite.ui.form.contentpath");
        }

        return getPageResource(resourceResolver.resolve(pagePath));
    }

    /**
     * Retrieves the resource that is of type {@code cq:Page}. If the given {@link Resource} does not
     * meet this requirement, the parent resource then becomes the new context.
     *
     * @param pageResource {@link Resource} instance
     * @return {@code null} when invalid otherwise an {@link Resource} instance
     */
    @Nullable
    protected final Resource getPageResource(final Resource pageResource) {
        if (pageResource != null && !ResourceUtil.isNonExistingResource(pageResource)) {
            ValueMap properties = pageResource.getValueMap();

            if (properties.get(JcrConstants.JCR_PRIMARYTYPE, StringUtils.EMPTY).equals(NameConstants.NT_PAGE)) {
                return pageResource;
            }

            return getPageResource(pageResource.getParent());
        }

        return null;
    }

    /**
     * Generate a new Data Source {@link ValueMapResource} instance.
     *
     * @param text     label of the entry
     * @param value    value of the entry
     * @param callback optional callback to apply custom properties
     * @return {@link ValueMapResource}
     */
    protected ValueMapResource generateEntry(final String text,
                                             final String value,
                                             UnaryOperator<ValueMap> callback) {
        ValueMap valueMap = new ValueMapDecorator(new HashMap<>());

        valueMap.put(PN_ENTRY_TEXT, text);
        valueMap.put(PN_ENTRY_VALUE, value);

        if (callback != null) {
            valueMap = callback.apply(valueMap);
        }

        return new ValueMapResource(
                resourceResolver,
                new ResourceMetadata(),
                JcrConstants.NT_UNSTRUCTURED,
                valueMap);
    }
}
