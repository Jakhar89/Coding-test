/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ~ Copyright 2021 Adobe
 ~
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~ you may not use this file except in compliance with the License.
 ~ You may obtain a copy of the License at
 ~
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ Unless required by applicable law or agreed to in writing, software
 ~ distributed under the License is distributed on an "AS IS" BASIS,
 ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~ See the License for the specific language governing permissions and
 ~ limitations under the License.
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
package com.sscp.core.impl.models.link;

import com.adobe.cq.wcm.core.components.commons.link.Link;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.google.common.collect.ImmutableMap;
import com.sscp.core.support.jackson.LinkHtmlAttributesSerializer;
import org.apache.commons.lang3.StringUtils;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@JsonInclude(Include.NON_NULL)
public final class LinkImpl<T> implements Link<T> {
    public static final String ATTR_HREF = "href";
    public static final String ATTR_TARGET = "target";
    public static final String ATTR_ARIA_LABEL = "aria-label";
    public static final String ATTR_TITLE = "title";

    @SuppressWarnings({"java:S1171", "java:S3599"})
    private static final Set<String> ALLOWED_ATTRIBUTES = new HashSet<String>() {{
        add(ATTR_TARGET);
        add(ATTR_ARIA_LABEL);
        add(ATTR_TITLE);
    }};

    private final String url;
    private final String mappedUrl;
    private final T reference;
    private final Map<String, String> htmlAttributes;
    private final String externalizedUrl;

    public LinkImpl(@Nullable String url,
                    @Nullable String mappedUrl,
                    @Nullable String externalizedUrl,
                    @Nullable T reference,
                    @Nullable Map<String, String> htmlAttributes) {
        this.url = url;
        this.mappedUrl = mappedUrl;
        this.externalizedUrl = externalizedUrl;
        this.reference = reference;
        this.htmlAttributes = buildHtmlAttributes(url, htmlAttributes);
    }

    @Override
    public boolean isValid() {
        return url != null;
    }

    @Override
    @JsonIgnore
    public @Nullable String getURL() {
        return url;
    }

    @Override
    @JsonProperty("url")
    public @Nullable String getMappedURL() {
        return mappedUrl;
    }

    @Override
    @JsonIgnore
    public @Nullable String getExternalizedURL() {
        return externalizedUrl;
    }

    @Override
    @JsonInclude(Include.NON_EMPTY)
    @JsonSerialize(using = LinkHtmlAttributesSerializer.class)
    @JsonProperty("attributes")
    public @NotNull Map<String, String> getHtmlAttributes() {
        return htmlAttributes;
    }

    @Override
    @JsonIgnore
    public @Nullable T getReference() {
        return reference;
    }

    private static Map<String, String> buildHtmlAttributes(String linkURL, Map<String, String> htmlAttributes) {
        Map<String, String> attributes = new LinkedHashMap<>();
        if (linkURL != null) {
            attributes.put(ATTR_HREF, linkURL);
        }
        if (htmlAttributes != null) {
            Map<String, String> filteredAttributes = htmlAttributes.entrySet().stream()
                    .filter(e -> ALLOWED_ATTRIBUTES.contains(e.getKey()) && StringUtils.isNotEmpty(e.getValue()))
                    .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
            attributes.putAll(filteredAttributes);
        }
        return ImmutableMap.copyOf(attributes);
    }
}
