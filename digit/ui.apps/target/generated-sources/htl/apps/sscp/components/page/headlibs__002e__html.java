/*******************************************************************************
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 ******************************************************************************/
package apps.sscp.components.page;

import java.io.PrintWriter;
import java.util.Collection;
import javax.script.Bindings;

import org.apache.sling.scripting.sightly.render.RenderUnit;
import org.apache.sling.scripting.sightly.render.RenderContext;

public final class headlibs__002e__html extends RenderUnit {

    @Override
    protected final void render(PrintWriter out,
                                Bindings bindings,
                                Bindings arguments,
                                RenderContext renderContext) {
// Main Template Body -----------------------------------------------------------------------------

Object _dynamic_headlibs = getProperty("headlibs");
out.write("\r\n");
out.write("\r\n");


// End Of Main Template Body ----------------------------------------------------------------------
    }



    {
//Sub-Templates Initialization --------------------------------------------------------------------

/*******************************************************************************
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 ******************************************************************************/
addSubTemplate("headlibs", new RenderUnit() {

    @Override
    protected final void render(PrintWriter out,
                                Bindings bindings,
                                Bindings arguments,
                                RenderContext renderContext) {
// Main Sub-Template Body -------------------------------------------------------------------------

Object _global_clientlib = null;
Object _dynamic_wcmmode = bindings.get("wcmmode");
Object _dynamic_hascloudconfigsupport = arguments.get("hascloudconfigsupport");
Object _dynamic_clientlibcategoriesjshead = arguments.get("clientlibcategoriesjshead");
Object _dynamic_clientlibcategories = arguments.get("clientlibcategories");
Object _dynamic_staticdesignpath = arguments.get("staticdesignpath");
_global_clientlib = renderContext.call("use", "/apps/granite/sightly/templates/clientlib.html", obj());
out.write("\r\n    ");
{
    boolean var_testvariable0 = (!renderContext.getObjectModel().toBoolean(renderContext.getObjectModel().resolveProperty(_dynamic_wcmmode, "disabled")));
    if (var_testvariable0) {
        {
            Object var_templatevar1 = renderContext.getObjectModel().resolveProperty(_global_clientlib, "all");
            {
                Object var_templateoptions2_field$_categories = (new Object[] {"cq.pagetypes.html5page", "cq.authoring.page", "cq.wcm.foundation-main", "cq.shared"});
                {
                    java.util.Map var_templateoptions2 = obj().with("categories", var_templateoptions2_field$_categories);
                    callUnit(out, renderContext, var_templatevar1, var_templateoptions2);
                }
            }
        }
    }
}
out.write("\r\n    ");
{
    Object var_includedresult3 = renderContext.call("include", "/libs/cq/cloudserviceconfigs/components/servicelibs/servicelibs.jsp", obj());
    out.write(renderContext.getObjectModel().toString(var_includedresult3));
}
out.write("\r\n    ");
{
    Object var_testvariable5 = _dynamic_hascloudconfigsupport;
    if (renderContext.getObjectModel().toBoolean(var_testvariable5)) {
        {
            Object var_resourcecontent6 = renderContext.call("includeResource", "cloudconfig-header", obj().with("resourceType", "cq/cloudconfig/components/scripttags/header"));
            out.write(renderContext.getObjectModel().toString(var_resourcecontent6));
        }
    }
}
out.write("\r\n    ");
{
    Object var_testvariable7 = _dynamic_clientlibcategoriesjshead;
    if (renderContext.getObjectModel().toBoolean(var_testvariable7)) {
        {
            Object var_templatevar8 = renderContext.getObjectModel().resolveProperty(_global_clientlib, "js");
            {
                Object var_templateoptions9_field$_categories = _dynamic_clientlibcategoriesjshead;
                {
                    java.util.Map var_templateoptions9 = obj().with("categories", var_templateoptions9_field$_categories);
                    callUnit(out, renderContext, var_templatevar8, var_templateoptions9);
                }
            }
        }
    }
}
out.write("\r\n    ");
{
    Object var_testvariable10 = _dynamic_clientlibcategories;
    if (renderContext.getObjectModel().toBoolean(var_testvariable10)) {
        {
            Object var_templatevar11 = renderContext.getObjectModel().resolveProperty(_global_clientlib, "css");
            {
                Object var_templateoptions12_field$_categories = _dynamic_clientlibcategories;
                {
                    java.util.Map var_templateoptions12 = obj().with("categories", var_templateoptions12_field$_categories);
                    callUnit(out, renderContext, var_templatevar11, var_templateoptions12);
                }
            }
        }
    }
}
out.write("\r\n    ");
{
    Object var_testvariable13 = _dynamic_staticdesignpath;
    if (renderContext.getObjectModel().toBoolean(var_testvariable13)) {
        out.write("<link");
        {
            Object var_attrvalue14 = _dynamic_staticdesignpath;
            {
                Object var_attrcontent15 = renderContext.call("xss", var_attrvalue14, "uri");
                {
                    boolean var_shoulddisplayattr17 = (((null != var_attrcontent15) && (!"".equals(var_attrcontent15))) && ((!"".equals(var_attrvalue14)) && (!((Object)false).equals(var_attrvalue14))));
                    if (var_shoulddisplayattr17) {
                        out.write(" href");
                        {
                            boolean var_istrueattr16 = (var_attrvalue14.equals(true));
                            if (!var_istrueattr16) {
                                out.write("=\"");
                                out.write(renderContext.getObjectModel().toString(var_attrcontent15));
                                out.write("\"");
                            }
                        }
                    }
                }
            }
        }
        out.write(" rel=\"stylesheet\" type=\"text/css\"/>");
    }
}
out.write("\r\n");


// End Of Main Sub-Template Body ------------------------------------------------------------------
    }



    {
//Sub-Sub-Templates Initialization ----------------------------------------------------------------



//End of Sub-Sub-Templates Initialization ---------------------------------------------------------
    }
    
});


//End of Sub-Templates Initialization -------------------------------------------------------------
    }

}

