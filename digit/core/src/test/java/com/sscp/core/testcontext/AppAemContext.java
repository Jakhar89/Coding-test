/*
 *  Copyright 2021 Adobe Systems Incorporated
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
package com.sscp.core.testcontext;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextBuilder;
import io.wcm.testing.mock.aem.junit5.AemContextCallback;
import org.apache.sling.models.impl.ResourceTypeBasedResourcePicker;
import org.apache.sling.models.spi.ImplementationPicker;
import org.apache.sling.testing.mock.sling.ResourceResolverType;

import java.util.Map;

import static com.adobe.cq.wcm.core.components.testing.mock.ContextPlugins.CORE_COMPONENTS;

/**
 * Sets up {@link AemContext} for unit tests in this application.
 */
public final class AppAemContext {
    private AppAemContext() {
        // static methods only
    }

    /**
     * @return {@link AemContext}
     */
    public static AemContext newAemContext() {
        return createAemContext().build();
    }

    /**
     * @return {@link AemContext}
     */
    public static AemContext newAemContext(Map<String, Object> resolverFactoryProps) {
        return createAemContext()
                .resourceResolverFactoryActivatorProps(resolverFactoryProps)
                .build();
    }

    /**
     * @return {@link AemContextBuilder}
     */
    private static AemContextBuilder createAemContext() {
        return new AemContextBuilder(ResourceResolverType.JCR_OAK)
                .plugin(CORE_COMPONENTS)
                .afterSetUp(SETUP_CALLBACK);
    }

    /**
     * Custom set up rules required in all unit tests.
     */
    private static final AemContextCallback SETUP_CALLBACK = new AemContextCallback() {
        @Override
        public void execute(AemContext context) {
            context.registerService(ImplementationPicker.class, new ResourceTypeBasedResourcePicker());
        }
    };
}
