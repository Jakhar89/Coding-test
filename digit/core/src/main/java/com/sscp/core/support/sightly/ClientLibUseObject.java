package com.sscp.core.support.sightly;

import com.adobe.granite.ui.clientlibs.ClientLibrary;
import com.adobe.granite.ui.clientlibs.LibraryType;
import org.apache.commons.lang3.StringUtils;
import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

/**
 * Sightly ClientLibs that can accept expression options for 'defer', 'async', 'onload' and
 * 'crossorigin'.
 * This class is mostly code from /libs/granite/sightly/templates/ClientLibUseObject.java.
 * See: https://github.com/nateyolles/aem-clientlib-async
 *
 * @author Nate Yolles (yolles@adobe.com)
 * @version 2.0.0
 * @since 2015-03-19
 */
@SuppressWarnings("java:S2176")
public class ClientLibUseObject extends dev.aemvite.aem.utilities.ClientLibUseObject {
    /**
     * Sightly parameter that becomes the script element void attribute such as 'defer' and
     * 'async'. Valid values are listed in {@link #VALID_JS_ATTRIBUTES}.
     */
    private static final String BINDINGS_LOADING = "loading";

    /**
     * Sightly parameter that becomes the javascript function value in the script element's
     * 'onload' attribute.
     */
    private static final String BINDINGS_ONLOAD = "onload";

    /**
     * Sightly parameter that becomes the value in the script and link elements' 'crossorigin'
     * attribute.
     */
    private static final String BINDINGS_CROSS_ORIGIN = "crossorigin";

    /**
     * Sightly parameter that instructs the output to be a 'link' prefetch tag.
     */
    private static final String BINDINGS_PREFETCH = "prefetch";

    /**
     * HTML markup for prefetching ClientLibs.
     */
    private static final String CLIENTLIB_TAG_PREFETCH =
            "<link rel=\"prefetch\" href=\"%s\" as=\"%s\" crossorigin=\"anonymous\">\n";

    /**
     * HTML markup for onload attribute of script element.
     */
    private static final String ONLOAD_ATTRIBUTE = " onload=\"%s\"";

    /**
     * HTML markup for crossorigin attribute of script and link elements.
     */
    private static final String CROSS_ORIGIN_ATTRIBUTE = " crossorigin=\"%s\"";

    /**
     * Valid void attributes for HTML markup of script element.
     */
    private static final List<String> VALID_JS_ATTRIBUTES = new ArrayList<>();

    /**
     * Valid values for crossorigin attribute for HTML markup of script and link elements.
     */
    private static final List<String> VALID_CROSS_ORIGIN_VALUES = new ArrayList<>();

    private String loadingAttribute;
    private String onloadAttribute;
    private String crossoriginAttribute;
    private Boolean prefetch;

    @Override
    public void activate() {
        super.activate();

        VALID_JS_ATTRIBUTES.add("async");
        VALID_JS_ATTRIBUTES.add("defer");
        VALID_JS_ATTRIBUTES.add("type");

        VALID_CROSS_ORIGIN_VALUES.add("anonymous");
        VALID_CROSS_ORIGIN_VALUES.add("use-credentials");

        loadingAttribute = get(BINDINGS_LOADING, String.class);
        onloadAttribute = get(BINDINGS_ONLOAD, String.class);
        crossoriginAttribute = get(BINDINGS_CROSS_ORIGIN, String.class);

        if (categories != null && categories.length > 0) {
            prefetch = get(BINDINGS_PREFETCH, Boolean.class);
        }
    }

    @Override
    public StringBuilder getLibraryTypeAttributes(final ClientLibrary lib,
                                                  final LibraryType libraryType) {
        StringBuilder attributes = super.getLibraryTypeAttributes(lib, libraryType);

        if (libraryType.equals(LibraryType.JS)) {
            if (StringUtils.isNotBlank(loadingAttribute)
                    && VALID_JS_ATTRIBUTES.contains(loadingAttribute.toLowerCase())) {
                attributes.append(" ".concat(loadingAttribute.toLowerCase()));
            }

            if (StringUtils.isNotBlank(onloadAttribute)) {
                String safeOnload = Jsoup.clean(onloadAttribute, Safelist.none());

                if (StringUtils.isNotBlank(safeOnload)) {
                    attributes.append(String.format(ONLOAD_ATTRIBUTE, safeOnload));
                }
            }
        }

        if (StringUtils.isNotBlank(crossoriginAttribute)
                && VALID_CROSS_ORIGIN_VALUES.contains(crossoriginAttribute.toLowerCase())) {
            attributes.append(String.format(CROSS_ORIGIN_ATTRIBUTE, crossoriginAttribute.toLowerCase()));
        }

        return attributes;
    }

    @Override
    protected void generateOutputForClientLib(
            ClientLibrary lib,
            String path,
            LibraryType libraryType,
            PrintWriter out
    ) {
        if (Boolean.TRUE.equals(prefetch)) {
            // Skip any ClientLibs for prefetch that have a 'noPrefetch' property (regardless of 'true' of 'false')
            if (!clientlibHasProperty(lib, "noPrefetch")) {
                out.format(CLIENTLIB_TAG_PREFETCH, path, libraryType.equals(LibraryType.JS) ? "script" : "style");
            }
        } else {
            super.generateOutputForClientLib(lib, path, libraryType, out);
        }
    }
}