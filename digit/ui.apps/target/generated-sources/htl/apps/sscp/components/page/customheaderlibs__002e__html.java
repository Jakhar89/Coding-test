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

public final class customheaderlibs__002e__html extends RenderUnit {

    @Override
    protected final void render(PrintWriter out,
                                Bindings bindings,
                                Bindings arguments,
                                RenderContext renderContext) {
// Main Template Body -----------------------------------------------------------------------------

Object _dynamic_inheritedpageproperties = bindings.get("inheritedpageproperties");
Object _global_style = null;
Object _global_restrictedpage = null;
Object _global_clientlib = null;
Object _dynamic_wcmmode = bindings.get("wcmmode");
Object _global_caconfigmodel = null;
Object _global_errormodel = null;
Object _dynamic_caconfig = bindings.get("caconfig");
out.write("\r\n");
_global_style = renderContext.call("use", com.sscp.core.models.StyleNameModel.class.getName(), obj().with("brandSlug", renderContext.getObjectModel().resolveProperty(_dynamic_inheritedpageproperties, "brandSlug")));
_global_restrictedpage = renderContext.call("use", com.sscp.core.models.RestrictPageUrlModel.class.getName(), obj());
out.write("\r\n\r\n");
_global_clientlib = renderContext.call("use", "/apps/granite/sightly/templates/clientlib.html", obj());
out.write("\r\n  ");
{
    Object var_templatevar0 = renderContext.getObjectModel().resolveProperty(_global_clientlib, "css");
    {
        Object var_templateoptions1_field$_categories = (new Object[] {renderContext.getObjectModel().resolveProperty(_global_style, "styleNameSite"), renderContext.getObjectModel().resolveProperty(_global_style, "styleNameDependency")});
        {
            java.util.Map var_templateoptions1 = obj().with("categories", var_templateoptions1_field$_categories);
            callUnit(out, renderContext, var_templatevar0, var_templateoptions1);
        }
    }
}
out.write("\r\n  ");
{
    Object var_resourcecontent2 = renderContext.call("includeResource", "contexthub", obj().with("resourceType", "granite/contexthub/components/contexthub"));
    out.write(renderContext.getObjectModel().toString(var_resourcecontent2));
}
out.write("\r\n\r\n\r\n<meta property=\"cq:wcmmode\"");
{
    String var_attrvalue3 = (renderContext.getObjectModel().toBoolean(((renderContext.getObjectModel().toBoolean(renderContext.getObjectModel().resolveProperty(_dynamic_wcmmode, "edit")) ? renderContext.getObjectModel().resolveProperty(_dynamic_wcmmode, "edit") : renderContext.getObjectModel().resolveProperty(_dynamic_wcmmode, "design")))) ? "edit" : "preview");
    {
        Object var_attrcontent4 = renderContext.call("xss", var_attrvalue3, "attribute");
        {
            boolean var_shoulddisplayattr6 = (((null != var_attrcontent4) && (!"".equals(var_attrcontent4))) && ((!"".equals(var_attrvalue3)) && (!((Object)false).equals(var_attrvalue3))));
            if (var_shoulddisplayattr6) {
                out.write(" content");
                {
                    boolean var_istrueattr5 = (var_attrvalue3.equals(true));
                    if (!var_istrueattr5) {
                        out.write("=\"");
                        out.write(renderContext.getObjectModel().toString(var_attrcontent4));
                        out.write("\"");
                    }
                }
            }
        }
    }
}
out.write("/>\r\n\r\n<!-- Dynatrace Script -->\r\n<script type=\"text/javascript\"");
{
    Object var_attrvalue7 = renderContext.getObjectModel().resolveProperty(_global_style, "dynaTraceDomainUrl");
    {
        Object var_attrcontent8 = renderContext.call("xss", var_attrvalue7, "uri");
        {
            boolean var_shoulddisplayattr10 = (((null != var_attrcontent8) && (!"".equals(var_attrcontent8))) && ((!"".equals(var_attrvalue7)) && (!((Object)false).equals(var_attrvalue7))));
            if (var_shoulddisplayattr10) {
                out.write(" src");
                {
                    boolean var_istrueattr9 = (var_attrvalue7.equals(true));
                    if (!var_istrueattr9) {
                        out.write("=\"");
                        out.write(renderContext.getObjectModel().toString(var_attrcontent8));
                        out.write("\"");
                    }
                }
            }
        }
    }
}
out.write(" crossorigin=\"anonymous\"></script>\r\n");
_global_caconfigmodel = renderContext.call("use", com.sscp.core.models.BrandContextConfigModel.class.getName(), obj());
out.write("\r\n");
_global_errormodel = renderContext.call("use", com.sscp.core.models.ErrorSuccessModel.class.getName(), obj());
out.write("\r\n<!--Error MAP-->\r\n<script type=\"text/javascript\">");
{
    String var_11 = (((((("\r\n  globalThis.errorJson = '" + renderContext.getObjectModel().toString(renderContext.call("xss", renderContext.getObjectModel().resolveProperty(_global_errormodel, "json"), "scriptString"))) + "';\r\n  globalThis.globalConfigs = '") + renderContext.getObjectModel().toString(renderContext.call("xss", renderContext.getObjectModel().resolveProperty(_global_caconfigmodel, "json"), "scriptString"))) + "';\r\n  globalThis.restrictedPages = '") + renderContext.getObjectModel().toString(renderContext.call("xss", renderContext.getObjectModel().resolveProperty(_global_restrictedpage, "json"), "scriptString"))) + "'\r\n");
    out.write(renderContext.getObjectModel().toString(var_11));
}
out.write("</script>\r\n\r\n<!-- Analytics Script -->\r\n<script type=\"text/javascript\">");
{
    String var_12 = (((((("\r\n  var digitalData = {\r\n    page: {\r\n      pageName: '" + renderContext.getObjectModel().toString(renderContext.call("xss", renderContext.getObjectModel().resolveProperty(_global_style, "pageName"), "scriptString"))) + "',\r\n      pageURL: '") + renderContext.getObjectModel().toString(renderContext.call("xss", renderContext.getObjectModel().resolveProperty(_global_style, "pageUrl"), "scriptString"))) + "',\r\n      pageBrand: '") + renderContext.getObjectModel().toString(renderContext.call("xss", renderContext.getObjectModel().resolveProperty(_dynamic_inheritedpageproperties, "brandSlug"), "scriptString"))) + "'\r\n    }\r\n  };\r\n");
    out.write(renderContext.getObjectModel().toString(var_12));
}
out.write("</script>\r\n\r\n<!--Fetch Context configs verify -->\r\n<script type=\"text/javascript\">");
{
    String var_13 = (("\r\n  var baseApiUrlCa = '" + renderContext.getObjectModel().toString(renderContext.call("xss", renderContext.getObjectModel().resolveProperty(renderContext.getObjectModel().resolveProperty(_dynamic_caconfig, "com.sscp.core.services.ContextBrandConfigService"), "baseApiUrl"), "scriptString"))) + "'; \r\n");
    out.write(renderContext.getObjectModel().toString(var_13));
}
out.write("</script>\r\n");


// End Of Main Template Body ----------------------------------------------------------------------
    }



    {
//Sub-Templates Initialization --------------------------------------------------------------------



//End of Sub-Templates Initialization -------------------------------------------------------------
    }

}

